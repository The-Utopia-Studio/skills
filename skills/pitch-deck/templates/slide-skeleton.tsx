// Copy-paste slide skeleton. One section, one Reveal, one motion image.
// Replace SectionName, eyebrow, headline, body, CTA, and image.
//
// Tokens (text-brand, font-display, etc.) come from tailwind.config.js, which
// is generated from brand.json at scaffold time. Do not hard-code hex values
// inside slides — read them from Tailwind classes only.

import { motion } from "motion/react";
import Reveal from "../Reveal";
import { assets } from "../../assets";
import { ArrowRight } from "../icons";

export default function SectionName() {
  return (
    <section
      id="section-name"
      className="mx-auto max-w-[1440px] px-6 py-16 md:px-[120px] md:py-24"
    >
      <Reveal>
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-[102px]">
          {/* Copy */}
          <motion.div
            className="flex w-full max-w-[610px] flex-col gap-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="font-mono text-[14px] uppercase tracking-[1.2px] text-brand">
              Eyebrow label
            </p>
            <h2 className="font-display text-[44px] font-light leading-[1.2] text-ink md:text-[64px]">
              Headline that names the move in one breath.
            </h2>
            <p className="font-sans text-[18px] leading-[1.6] text-ink-soft">
              One paragraph. Plain. Numerate where possible. Stops at the next
              decision the reader needs to make.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#next-section"
                className="inline-flex items-center gap-3 bg-brand px-6 py-3 font-mono text-[16px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Primary action
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="relative aspect-square w-full max-w-[488px] shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.img
              src={assets.placeholder.local}
              alt="Section visual"
              className="h-full w-full object-contain"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
