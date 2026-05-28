"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Artwork } from "@/lib/data";

interface Props {
  artwork: Artwork | null;
  artworks: Artwork[];
  onClose: () => void;
  onNavigate: (artwork: Artwork) => void;
}

export function ArtworkViewer({ artwork, artworks, onClose, onNavigate }: Props) {
  const currentIndex = artwork ? artworks.findIndex((a) => a.id === artwork.id) : -1;
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < artworks.length - 1;
  const [direction, setDirection] = useState(0);

  const handlePrev = useCallback(() => {
    if (canPrev) { setDirection(-1); onNavigate(artworks[currentIndex - 1]); }
  }, [canPrev, currentIndex, artworks, onNavigate]);

  const handleNext = useCallback(() => {
    if (canNext) { setDirection(1); onNavigate(artworks[currentIndex + 1]); }
  }, [canNext, currentIndex, artworks, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, handlePrev, handleNext]);

  useEffect(() => {
    document.body.style.overflow = artwork ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [artwork]);

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : d < 0 ? -40 : 0, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : d < 0 ? 40 : 0, scale: 0.97 }),
  };

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(12px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-noir/90"
          />

          {/* Close */}
          <motion.button
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="absolute top-6 right-6 z-10 text-ivoire/50 hover:text-ivoire transition-colors p-2"
            onClick={onClose}
            aria-label="Fermer"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Nav arrows */}
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: canPrev ? 1 : 0.15, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="absolute left-4 z-10 p-3 text-ivoire/60 hover:text-ivoire transition-all disabled:pointer-events-none"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            disabled={!canPrev}
            aria-label="Précédent"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: canNext ? 1 : 0.15, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="absolute right-4 z-10 p-3 text-ivoire/60 hover:text-ivoire transition-all disabled:pointer-events-none"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            disabled={!canNext}
            aria-label="Suivant"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>

          {/* Content — slides directionally when navigating */}
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={artwork.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="relative z-10 flex flex-col items-center gap-6 px-16 py-8 max-w-4xl w-full max-h-screen"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <motion.div
                className="relative w-full max-h-[70vh] flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {artwork.image ? (
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    width={900}
                    height={700}
                    className="object-contain max-h-[70vh] w-auto shadow-2xl"
                    quality={60}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                ) : (
                  <div className="w-full aspect-[4/3] max-h-[70vh] border border-ivoire/10 flex items-center justify-center">
                    <p className="font-serif italic text-stone text-lg">Image à venir</p>
                  </div>
                )}
              </motion.div>

              {/* Info */}
              <motion.div
                className="text-center text-ivoire"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h2 className="font-serif text-2xl italic mb-1">{artwork.title}</h2>
                <p className="text-stone text-xs uppercase tracking-[0.15em]">
                  {[artwork.medium, artwork.dimensions, artwork.year].filter(Boolean).join(" · ")}
                </p>
                {artwork.description && (
                  <p className="text-stone-light text-sm mt-2 max-w-md mx-auto">{artwork.description}</p>
                )}
              </motion.div>

              {/* Counter */}
              <motion.p
                className="text-stone/50 text-xs tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {currentIndex + 1} / {artworks.length}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
