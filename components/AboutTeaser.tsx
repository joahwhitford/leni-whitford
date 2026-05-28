"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ease } from "@/lib/animations";
import { artistPortrait } from "@/lib/data";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease },
  }),
};

export function AboutTeaser() {
  return (
    <section className="bg-noir py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={artistPortrait}
              alt="Léni Whitford — Artiste plasticienne"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={85}
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-noir/30 to-transparent" />
          </div>
          {/* Decorative offset border */}
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-stone/20 -z-10" />
        </motion.div>

        {/* Text */}
        <div className="text-ivoire">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone mb-6"
          >
            L'artiste
          </motion.p>

          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="font-serif text-5xl md:text-6xl font-light italic leading-tight mb-8"
          >
            Peindre, c'est
            <br />
            <em className="text-stone-light">donner à voir</em>
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-stone-light text-sm leading-relaxed mb-4 max-w-md"
          >
            Enfant, Léni crée des bandes dessinées, caricature ses proches, puis
            œuvre pour servir les autres par l'art. Autodidacte passionnée,
            ancienne infirmière reconvertie en artiste à plein temps, elle
            développe un style figuratif et engagé.
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-stone text-sm leading-relaxed mb-12 max-w-md"
          >
            Ses œuvres ont été présentées à l&apos;UNESCO, aux Jeux Olympiques de
            Paris 2024, et dans de nombreuses expositions en France.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <Link
              href="/biographie"
              className="group inline-flex items-center gap-3 border border-ivoire/20 px-7 py-3 text-xs uppercase tracking-[0.2em] text-ivoire hover:bg-ivoire hover:text-noir transition-all duration-500"
            >
              En savoir plus
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
