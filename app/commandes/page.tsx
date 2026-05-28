"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { commandes } from "@/lib/data";

export default function CommandesPage() {
  return (
    <div className="min-h-screen bg-noir pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone mb-4">
            Sur mesure
          </p>
          <h1 className="font-serif text-6xl md:text-7xl font-light italic text-ivoire mb-6">
            Commandes
          </h1>
          <p className="text-stone-light text-sm leading-relaxed max-w-md">
            Portraits, illustrations, œuvres sur mesure — chaque commande est unique,
            conçue en collaboration étroite avec vous. Léni Whitford accepte des commandes
            privées et professionnelles.
          </p>
        </motion.div>

        {/* Service types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {[
            { title: "Portrait", desc: "Portrait d'après photo ou en direct. Huile, aquarelle ou acrylique." },
            { title: "Illustration", desc: "Illustration sur mesure pour particuliers, entreprises ou événements." },
            { title: "Œuvre unique", desc: "Projet artistique sur mesure, en dialogue avec l'artiste." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.7 }}
              className="border border-ivoire/10 p-6"
            >
              <h3 className="font-serif text-xl italic text-ivoire mb-2">{item.title}</h3>
              <p className="text-stone text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Portfolio grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-20"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone mb-8">
            Réalisations
          </p>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {commandes.map((cmd, i) => (
              <motion.div
                key={cmd.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i + 0.6, duration: 0.6 }}
                className="break-inside-avoid group relative overflow-hidden"
              >
                <Image
                  src={cmd.image}
                  alt={cmd.title}
                  width={600}
                  height={cmd.aspect === "portrait" ? 800 : cmd.aspect === "landscape" ? 450 : 600}
                  className="w-full h-auto object-contain"
                  quality={60}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/50 transition-all duration-500 flex items-end p-3">
                  <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                    <p className="text-ivoire font-serif text-sm italic">{cmd.title}</p>
                    {cmd.medium && (
                      <p className="text-stone-light text-[10px] uppercase tracking-[0.1em] mt-0.5">
                        {cmd.medium}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="border-t border-ivoire/10 pt-12"
        >
          <p className="text-stone-light text-sm mb-8 max-w-md">
            Pour toute demande, décrivez votre projet et prenez contact directement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:leni.whitford@orange.fr"
              className="group inline-flex items-center gap-3 border border-ivoire/20 px-7 py-3 text-xs uppercase tracking-[0.2em] text-ivoire hover:bg-ivoire hover:text-noir transition-all duration-500"
            >
              leni.whitford@orange.fr
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="tel:+33681449042"
              className="group inline-flex items-center gap-3 border border-ivoire/10 px-7 py-3 text-xs uppercase tracking-[0.2em] text-stone hover:text-ivoire transition-all duration-500"
            >
              06 81 44 90 42
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
