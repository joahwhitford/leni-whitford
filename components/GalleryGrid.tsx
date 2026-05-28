"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArtworkViewer } from "@/components/ArtworkViewer";
import { artworks, collections } from "@/lib/data";
import type { Artwork } from "@/lib/data";

function ArtCard({ artwork, onClick }: { artwork: Artwork; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative cursor-pointer overflow-hidden break-inside-avoid mb-4"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        {artwork.image ? (
          <Image
            src={artwork.image}
            alt={artwork.title}
            width={600}
            height={
              artwork.aspect === "tall"
                ? 1200
                : artwork.aspect === "portrait"
                ? 800
                : artwork.aspect === "landscape"
                ? 450
                : 600
            }
            className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            quality={60}
            onContextMenu={(e) => e.preventDefault()}
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full bg-ivoire-dark flex items-center justify-center ${
              artwork.aspect === "tall" ? "aspect-[1/2]" : artwork.aspect === "portrait" ? "aspect-[3/4]" : artwork.aspect === "landscape" ? "aspect-[4/3]" : "aspect-square"
            }`}
          >
            <p className="font-serif italic text-stone text-sm">À venir</p>
          </div>
        )}
        {/* Hover info */}
        <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/50 transition-all duration-500 flex items-end p-4">
          <div className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
            <p className="text-ivoire font-serif text-base italic">{artwork.title}</p>
            {(artwork.medium || artwork.year) && (
              <p className="text-stone-light text-xs uppercase tracking-[0.1em] mt-0.5">
                {[artwork.medium, artwork.year].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function GalleryGrid() {
  const [activeCollection, setActiveCollection] = useState("all");
  const [selected, setSelected] = useState<Artwork | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("artwork");
    if (id) {
      const found = artworks.find((a) => a.id === id);
      if (found) setSelected(found);
    }
  }, [searchParams]);

  const filtered =
    activeCollection === "all"
      ? artworks
      : artworks.filter((a) => a.collection === activeCollection);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {collections.map((col) => (
          <button
            key={col.id}
            onClick={() => setActiveCollection(col.id)}
            className={`relative px-5 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
              activeCollection === col.id
                ? "text-ivoire bg-noir"
                : "text-stone hover:text-noir border border-stone/30 hover:border-noir/40"
            }`}
          >
            {col.label}
          </button>
        ))}
      </div>

      {/* Collection description */}
      <AnimatePresence mode="wait">
        {activeCollection !== "all" && (
          <motion.p
            key={activeCollection}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-stone text-sm leading-relaxed mb-10 max-w-2xl"
          >
            {collections.find((c) => c.id === activeCollection)?.description}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Masonry grid via CSS columns */}
      <div
        className="columns-1 sm:columns-2 lg:columns-3 gap-4"
        style={{ columnGap: "1rem" }}
      >
        <AnimatePresence>
          {filtered.map((artwork) => (
            <ArtCard
              key={artwork.id}
              artwork={artwork}
              onClick={() => setSelected(artwork)}
            />
          ))}
        </AnimatePresence>
      </div>

      <ArtworkViewer
        artwork={selected}
        artworks={filtered}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </>
  );
}
