// HyperFrames (https://github.com/heygen-com/hyperframes, Apache-2.0) turns
// an HTML page with timed elements into a video. It runs through npx, pinned
// so a render today matches one next month.

export const HYPERFRAMES = 'hyperframes@0.8.137'

export const HYPERFRAMES_ENV = {
	HYPERFRAMES_NO_TELEMETRY: '1',
	// With several workers on macOS, HyperFrames otherwise writes every captured
	// frame to disk before encoding (about 4 GB for a 2-minute video).
	HF_CAPTURE_PARALLEL_STREAM: 'true',
}
