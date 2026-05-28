"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { exhibitions } from "@/lib/data";

export function ExhibitionsTeaser() {
  const featured = exhibitions.slice(0, 3);

  return (
    <section className="py-24 px-6 bg-ivoire-dark">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone mb-3">
              Parcours
            </p>
            <h2 className="font-serif text-5xl md:text-6xl font-light italic text-noir">
              Expositions
            </h2>
          </div>
          <Link
            href="/expositions"
            className="text-xs uppercase tracking-[0.15em] text-stone hover:text-noir transition-colors border-b border-stone/30 hover:border-noir/50 pb-0.5"
          >
            Toutes les expositions →
          </Link>
        </motion.div>

        {/* Exhibition list */}
        <div className="divide-y divide-noir/10">
          {featured.map((expo, i) => (
            <motion.div
              key={expo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-7 cursor-default"
            >
              <span className="text-stone font-sans text-xs tracking-wider w-12 text-right">
                {expo.year}
              </span>
              <div>
                <h3 className="font-serif text-xl italic text-noir group-hover:text-stone transition-colors duration-300">
                  {expo.title}
                </h3>
                {expo.description && (
                  <p className="text-stone text-xs mt-1 leading-relaxed max-w-lg line-clamp-1">
                    {expo.description}
                  </p>
                )}
              </div>
              <span className="text-stone text-xs uppercase tracking-[0.12em] text-right">
                {expo.location}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
