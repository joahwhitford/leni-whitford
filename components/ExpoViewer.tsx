"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Exhibition } from "@/lib/data";

interface Props {
  expo: Exhibition | null;
  onClose: () => void;
}

export function ExpoViewer({ expo, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const images = expo?.images?.filter(Boolean) ?? [];
  const hasImages = images.length > 0;

  useEffect(() => {
    setIndex(0);
    setDirection(0);
  }, [expo]);

  const prev = useCallback(() => {
    if (!hasImages) return;
    setDirection(-1);
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [hasImages, images.length]);

  const next = useCallback(() => {
    if (!hasImages) return;
    setDirection(1);
    setIndex((i) => (i + 1) % images.length);
  }, [hasImages, images.length]);

  useEffect(() => {
    if (!expo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expo, onClose, next, prev]);

  // Lock scroll when open
  useEffect(() => {
    if (expo) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [expo]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 24 : -24, scale: 0.98 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -24 : 24, scale: 0.98 }),
  };

  return (
    <AnimatePresence>
      {expo && (
        <motion.div
          key="expo-viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-noir/96 backdrop-blur-sm flex items-center justify-center p-6 md:p-10"
          onClick={onClose}
        >
          {/* Inner panel — stop propagation so clicks inside don't close */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-[82rem] max-h-[92vh] flex flex-col md:flex-row gap-0 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Image area ── */}
            <div className="relative flex-1 min-h-[50vh] md:min-h-0 bg-noir overflow-hidden">
              {hasImages ? (
                <>
                  <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                      key={index}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={images[index]}
                        alt={expo.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 65vw"
                        quality={75}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Arrow prev */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-ivoire/10 hover:bg-ivoire/20 border border-ivoire/20 text-ivoire transition-colors duration-200"
                        aria-label="Précédent"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-ivoire/10 hover:bg-ivoire/20 border border-ivoire/20 text-ivoire transition-colors duration-200"
                        aria-label="Suivant"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Dot indicators */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === index ? "bg-ivoire w-4" : "bg-ivoire/30"}`}
                          aria-label={`Image ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-serif italic text-stone text-sm">Images à venir</p>
                </div>
              )}
            </div>

            {/* ── Info panel ── */}
            <div className="md:w-64 lg:w-72 bg-ivoire flex flex-col justify-between p-7 shrink-0">
              <div>
                <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-stone mb-3">
                  {expo.year}
                </p>
                <h2 className="font-serif text-2xl lg:text-3xl italic font-light text-noir mb-2 leading-tight">
                  {expo.title}
                </h2>
                <p className="font-sans text-[9px] uppercase tracking-[0.15em] text-stone mb-6">
                  {expo.location}
                </p>
                {expo.description && (
                  <p className="text-charcoal/75 text-sm leading-relaxed">
                    {expo.description}
                  </p>
                )}
              </div>

              {hasImages && (
                <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-stone/50 mt-6">
                  {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </p>
              )}
            </div>
          </motion.div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-ivoire/50 hover:text-ivoire transition-colors duration-200"
            aria-label="Fermer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
