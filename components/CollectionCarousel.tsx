"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Artwork } from "@/lib/data";

interface Props {
  artworks: Artwork[];
  onSelect: (artwork: Artwork) => void;
}

const SCROLL_STEP = 480;

export function CollectionCarousel({ artworks, onSelect }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const measure = useCallback(() => {
    if (viewportRef.current) {
      const max = viewportRef.current.scrollWidth - viewportRef.current.clientWidth;
      setMaxScroll(max > 0 ? max : 0);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [artworks, measure]);

  useEffect(() => {
    setScrollX((x) => Math.min(x, maxScroll));
  }, [maxScroll]);

  const scrollTo = (next: number) => {
    const clamped = Math.max(0, Math.min(next, maxScroll));
    setScrollX(clamped);
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ left: clamped, behavior: "smooth" });
    }
  };

  const canPrev = scrollX > 4;
  const canNext = scrollX < maxScroll - 4;

  if (artworks.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border border-dashed border-stone/30">
        <p className="font-serif italic text-stone text-lg">Images à venir</p>
      </div>
    );
  }

  return (
    <div className="relative group/carousel">
      <div
        ref={viewportRef}
        className="overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onScroll={(e) => setScrollX((e.target as HTMLDivElement).scrollLeft)}
      >
        <div className="flex gap-5 items-start pb-2" style={{ width: "max-content" }}>
          {artworks.map((artwork, i) => (
            <CarouselCard
              key={artwork.id}
              artwork={artwork}
              index={i}
              onClick={() => onSelect(artwork)}
            />
          ))}
          <div className="shrink-0 w-4" />
        </div>
      </div>

      <AnimatePresence>
        {canPrev && (
          <motion.button
            key="prev"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            onClick={() => scrollTo(scrollX - SCROLL_STEP)}
            className="absolute left-0 top-1/2 -translate-y-6 z-10 w-11 h-11 flex items-center justify-center bg-ivoire border border-noir/10 shadow-md hover:bg-noir hover:text-ivoire transition-colors duration-300"
            aria-label="Précédent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {canNext && (
          <motion.button
            key="next"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            onClick={() => scrollTo(scrollX + SCROLL_STEP)}
            className="absolute right-0 top-1/2 -translate-y-6 z-10 w-11 h-11 flex items-center justify-center bg-ivoire border border-noir/10 shadow-md hover:bg-noir hover:text-ivoire transition-colors duration-300"
            aria-label="Suivant"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {canPrev && (
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-ivoire to-transparent" />
      )}
      {canNext && (
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-ivoire to-transparent" />
      )}
    </div>
  );
}

function CarouselCard({
  artwork,
  index,
  onClick,
}: {
  artwork: Artwork;
  index: number;
  onClick: () => void;
}) {
  const cardWidth =
    artwork.aspect === "landscape"
      ? "w-[400px] md:w-[460px]"
      : artwork.aspect === "square"
      ? "w-[300px] md:w-[340px]"
      : artwork.aspect === "tall"
      ? "w-[150px] md:w-[170px]"
      : "w-[220px] md:w-[260px]";

  const aspectClass =
    artwork.aspect === "landscape"
      ? "aspect-[4/3]"
      : artwork.aspect === "square"
      ? "aspect-square"
      : artwork.aspect === "tall"
      ? "aspect-[1/2]"
      : "aspect-[3/4]";

  // "tall" uses object-contain (extreme ratio) with ivoire bg; others fill with object-cover
  const imgFit = artwork.aspect === "tall" ? "object-contain" : "object-cover";
  const imgBg = artwork.aspect === "tall" ? "bg-ivoire" : "bg-[#ede8df]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={`shrink-0 ${cardWidth} group cursor-pointer`}
      onClick={onClick}
    >
      <motion.div
        whileHover={{ scale: 1.04, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
        className={`relative ${aspectClass} ${imgBg} overflow-hidden`}
      >
        {artwork.image ? (
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            className={imgFit}
            sizes={
              artwork.aspect === "tall"
                ? "(max-width: 768px) 150px, 170px"
                : artwork.aspect === "landscape"
                ? "(max-width: 768px) 400px, 460px"
                : "(max-width: 768px) 220px, 340px"
            }
            quality={60}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-serif italic text-stone text-sm">À venir</p>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-noir/60 to-transparent">
          <p className="text-ivoire font-serif text-base italic leading-snug">{artwork.title}</p>
          {artwork.medium && (
            <p className="text-stone-light text-[10px] uppercase tracking-[0.12em] mt-0.5">
              {[artwork.medium, artwork.year].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </motion.div>

      <div className="pt-3">
        <p className="font-serif italic text-noir text-sm leading-snug">{artwork.title}</p>
        <p className="text-stone text-[10px] uppercase tracking-[0.1em] mt-0.5">
          {[artwork.medium, artwork.dimensions, artwork.year].filter(Boolean).join(" · ")}
        </p>
      </div>
    </motion.div>
  );
}
