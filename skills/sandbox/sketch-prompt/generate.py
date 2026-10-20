#!/usr/bin/env python3
"""
Sketch Prompt → ComfyUI Flux.1 Schnell → Image

Usage:
    python3 generate.py "your image prompt here"
    python3 generate.py "your image prompt here" --output /path/to/output.png
    python3 generate.py "your image prompt here" --width 1024 --height 768
"""

import json
import sys
import os
import time
import random
import argparse
import urllib.request
import urllib.error
import struct

COMFYUI_URL = "http://127.0.0.1:8188"
WORKFLOW_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "workflows", "flux_schnell_sketch.json")
DEFAULT_OUTPUT_DIR = os.path.expanduser("~/Documents/ComfyUI/output")


def check_comfyui():
    """Check if ComfyUI is running."""
    try:
        req = urllib.request.Request(f"{COMFYUI_URL}/system_stats")
        urllib.request.urlopen(req, timeout=5)
        return True
    except Exception:
        return False


def queue_prompt(prompt_workflow):
    """Send a workflow to ComfyUI for processing."""
    data = json.dumps({"prompt": prompt_workflow}).encode("utf-8")
    req = urllib.request.Request(
        f"{COMFYUI_URL}/prompt",
        data=data,
        headers={"Content-Type": "application/json"},
    )
    resp = urllib.request.urlopen(req)
    return json.loads(resp.read())


def get_history(prompt_id):
    """Get the execution history for a prompt."""
    req = urllib.request.Request(f"{COMFYUI_URL}/history/{prompt_id}")
    resp = urllib.request.urlopen(req)
    return json.loads(resp.read())


def get_image(filename, subfolder="", folder_type="output"):
    """Download a generated image from ComfyUI."""
    params = urllib.parse.urlencode({"filename": filename, "subfolder": subfolder, "type": folder_type})
    req = urllib.request.Request(f"{COMFYUI_URL}/view?{params}")
    resp = urllib.request.urlopen(req)
    return resp.read()


def build_workflow(prompt_text, width=1024, height=1024, seed=None):
    """Load the workflow template and inject the prompt."""
    with open(WORKFLOW_PATH, "r") as f:
        workflow_data = json.load(f)

    if seed is None:
        seed = random.randint(0, 2**32 - 1)

    # Convert graph format to API format (node_id -> node_data)
    api_workflow = {}

    for node in workflow_data["nodes"]:
        node_id = str(node["id"])
        node_type = node["type"]

        api_node = {
            "class_type": node_type,
            "inputs": {},
        }

        # Map widget values based on node type
        wv = node.get("widgets_values", [])

        if node_type == "EmptyLatentImage":
            api_node["inputs"] = {
                "width": width,
                "height": height,
                "batch_size": 1,
            }

        elif node_type == "CLIPTextEncode":
            api_node["inputs"] = {
                "text": prompt_text,
            }

        elif node_type == "KSampler":
            api_node["inputs"] = {
                "seed": seed,
                "control_after_generate": "randomize",
                "steps": 4,
                "cfg": 1.0,
                "sampler_name": "euler",
                "scheduler": "simple",
                "denoise": 1.0,
            }

        elif node_type == "SaveImage":
            api_node["inputs"] = {
                "filename_prefix": "sketch_output",
            }

        elif node_type == "DualCLIPLoader":
            api_node["inputs"] = {
                "clip_name1": "t5xxl_fp8_e4m3fn.safetensors",
                "clip_name2": "clip_l.safetensors",
                "type": "flux",
            }

        elif node_type == "UNETLoader":
            api_node["inputs"] = {
                "unet_name": "flux1-schnell.safetensors",
                "weight_dtype": "fp8_e4m3fn",
            }

        elif node_type == "VAELoader":
            api_node["inputs"] = {
                "vae_name": "ae.safetensors",
            }

        elif node_type == "VAEDecode":
            api_node["inputs"] = {}

        # Wire up links from the graph
        if "inputs" in node:
            for inp in node.get("inputs", []):
                link_id = inp.get("link")
                if link_id is not None:
                    # Find the source node and output slot for this link
                    for link in workflow_data["links"]:
                        if link[0] == link_id:
                            source_node_id = str(link[1])
                            source_slot = link[2]
                            api_node["inputs"][inp["name"]] = [source_node_id, source_slot]
                            break

        api_workflow[node_id] = api_node

    return api_workflow


def wait_for_result(prompt_id, timeout=300):
    """Poll ComfyUI history until the image is ready."""
    start = time.time()
    while time.time() - start < timeout:
        try:
            history = get_history(prompt_id)
            if prompt_id in history:
                outputs = history[prompt_id].get("outputs", {})
                for node_id, node_output in outputs.items():
                    if "images" in node_output:
                        return node_output["images"]
                # Check if there was an error
                status = history[prompt_id].get("status", {})
                if status.get("status_str") == "error":
                    msgs = status.get("messages", [])
                    print(f"ERROR: ComfyUI execution failed: {msgs}", file=sys.stderr)
                    return None
        except Exception:
            pass
        time.sleep(1)
        elapsed = int(time.time() - start)
        if elapsed % 10 == 0 and elapsed > 0:
            print(f"  Generating... ({elapsed}s)", file=sys.stderr)

    print("ERROR: Timed out waiting for image generation", file=sys.stderr)
    return None


def main():
    parser = argparse.ArgumentParser(description="Generate sketch images via ComfyUI + Flux.1 Schnell")
    parser.add_argument("prompt", help="The image generation prompt")
    parser.add_argument("--output", "-o", help="Output file path (default: auto in ComfyUI output dir)")
    parser.add_argument("--width", "-W", type=int, default=1024, help="Image width (default: 1024)")
    parser.add_argument("--height", "-H", type=int, default=1024, help="Image height (default: 1024)")
    parser.add_argument("--seed", "-s", type=int, default=None, help="Random seed")
    parser.add_argument("--timeout", "-t", type=int, default=300, help="Timeout in seconds (default: 300)")
    args = parser.parse_args()

    # Check ComfyUI is running
    if not check_comfyui():
        print("ERROR: ComfyUI is not running on localhost:8188", file=sys.stderr)
        print("Please open the ComfyUI app first.", file=sys.stderr)
        sys.exit(1)

    print(f"Building workflow...", file=sys.stderr)
    workflow = build_workflow(args.prompt, args.width, args.height, args.seed)

    print(f"Queuing generation...", file=sys.stderr)
    result = queue_prompt(workflow)
    prompt_id = result.get("prompt_id")

    if not prompt_id:
        print(f"ERROR: Failed to queue prompt: {result}", file=sys.stderr)
        sys.exit(1)

    print(f"Prompt ID: {prompt_id}", file=sys.stderr)
    print(f"Waiting for image (up to {args.timeout}s)...", file=sys.stderr)

    images = wait_for_result(prompt_id, args.timeout)

    if not images:
        print("ERROR: No images were generated", file=sys.stderr)
        sys.exit(1)

    # Get the first image
    img_info = images[0]
    filename = img_info["filename"]
    subfolder = img_info.get("subfolder", "")
    img_type = img_info.get("type", "output")

    if args.output:
        # Download and save to specified path
        img_data = get_image(filename, subfolder, img_type)
        output_path = os.path.abspath(args.output)
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, "wb") as f:
            f.write(img_data)
        print(output_path)
    else:
        # Return the path in ComfyUI's output dir
        if subfolder:
            output_path = os.path.join(DEFAULT_OUTPUT_DIR, subfolder, filename)
        else:
            output_path = os.path.join(DEFAULT_OUTPUT_DIR, filename)
        print(output_path)

    print(f"Done!", file=sys.stderr)


if __name__ == "__main__":
    import urllib.parse
    main()
