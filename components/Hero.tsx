"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroImage } from "@/lib/data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background painting with parallax */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 origin-center"
      >
        <Image
          src={heroImage}
          alt="On Top of the Food Chain — Léni Whitford"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/50 to-noir/80" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-end pb-24 text-ivoire px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-sans text-[10px] uppercase tracking-[0.35em] text-stone-light mb-8"
        >
          Artiste Peintre &nbsp;·&nbsp; Illustratrice Autodidacte
        </motion.p>

        {/* Name */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-light italic leading-none"
            style={{ fontSize: "clamp(4.5rem, 13vw, 11rem)" }}
          >
            Léni Whitford
          </motion.h1>
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-16 h-px bg-stone-light/50 mb-8 origin-center"
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href="/galerie"
            className="group inline-flex items-center gap-3 border border-ivoire/30 px-7 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ivoire hover:text-noir transition-all duration-500"
          >
            Découvrir la galerie
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", repeatDelay: 0.3 }}
          className="w-px h-10 bg-gradient-to-b from-transparent via-stone-light to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
}
