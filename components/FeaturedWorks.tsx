"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArtworkViewer } from "@/components/ArtworkViewer";
import { featuredArtworks } from "@/lib/data";
import type { Artwork } from "@/lib/data";

function ArtworkCard({
  artwork,
  index,
  onClick,
}: {
  artwork: Artwork;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative group cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div
        className={`relative overflow-hidden ${
          index % 3 === 0 ? "aspect-[3/4]" : index % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
        }`}
      >
        {artwork.image ? (
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 85vw, 40vw"
            quality={60}
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <div className="absolute inset-0 bg-ivoire-dark flex items-center justify-center">
            <p className="font-serif italic text-stone text-sm">À venir</p>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/40 transition-all duration-500" />
        <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <div>
            <p className="text-ivoire font-serif text-lg italic">{artwork.title}</p>
            {artwork.year && (
              <p className="text-stone-light text-xs uppercase tracking-[0.12em] mt-1">
                {artwork.year}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedWorks() {
  const [selected, setSelected] = useState<Artwork | null>(null);

  return (
    <section className="py-24 px-6">
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
              Œuvres sélectionnées
            </p>
            <h2 className="font-serif text-5xl md:text-6xl font-light italic text-noir">
              Collection
            </h2>
          </div>
          <a
            href="/galerie"
            className="text-xs uppercase tracking-[0.15em] text-stone hover:text-noir transition-colors border-b border-stone/30 hover:border-noir/50 pb-0.5"
          >
            Voir toute la galerie →
          </a>
        </motion.div>

        {/* Grid — masonry-style with varied sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featuredArtworks.map((artwork, i) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              index={i}
              onClick={() => setSelected(artwork)}
            />
          ))}
        </div>
      </div>

      <ArtworkViewer
        artwork={selected}
        artworks={featuredArtworks}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </section>
  );
}
