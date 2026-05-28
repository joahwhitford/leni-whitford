"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { collections, getArtworksByCollection, getVisibleArtworks, artworks as allArtworks } from "@/lib/data";
import { CollectionCarousel } from "@/components/CollectionCarousel";
import { ArtworkViewer } from "@/components/ArtworkViewer";
import type { Artwork } from "@/lib/data";

const navItems = [
  { id: "infranatural", label: "Infranatural" },
  { id: "objets", label: "Objets de pouvoir" },
  { id: "jo", label: "JO 2024" },
  { id: "marianne", label: "Marianne" },
  { id: "covid", label: "Il était une fois Covid" },
];

const variants = {
  enter: { opacity: 0, y: 18 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] },
  },
};

export default function GaleriePage() {
  return (
    <Suspense>
      <GalerieContent />
    </Suspense>
  );
}

function GalerieContent() {
  const [active, setActive] = useState("infranatural");
  const [selected, setSelected] = useState<Artwork | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("artwork");
    if (!id) return;
    const found = allArtworks.find((a) => a.id === id);
    if (!found) return;
    // Switch to the correct collection tab first, then open viewer
    setActive(found.collection === "soignants" || found.collection === "hydroxychloroquine" ? "covid" : found.collection);
    setSelected(found);
  }, [searchParams]);

  const standaloneCollections = collections.filter((c) => !c.parent);
  const covidSubs = collections.filter((c) => c.parent === "covid");

  return (
    <div className="min-h-screen bg-ivoire">

      {/* Page header */}
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone mb-4">
          Portfolio
        </p>
        <h1 className="font-serif text-6xl md:text-7xl font-light italic text-noir">
          Galerie
        </h1>
      </div>

      <div>

      {/* Tab nav */}
      <div className="sticky top-16 z-40 bg-ivoire border-b border-noir/8 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`relative shrink-0 px-4 py-4 text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 whitespace-nowrap ${
                  active === id ? "text-noir" : "text-stone hover:text-noir/70"
                }`}
              >
                {label}
                {active === id && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-noir"
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content — scrolls with the page, no fixed height */}
      <div className="bg-ivoire pb-24">
        <AnimatePresence mode="wait">
          {active === "covid" ? (
            <motion.div
              key="covid"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="py-20"
            >
              <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone">05</span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone/60">2020</span>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl font-light italic text-noir mb-3">
                    Il était une fois Covid
                  </h2>
                  <p className="text-stone text-sm max-w-lg">
                    Deux séries créées pendant la crise sanitaire de 2020 — l'une en hommage aux soignants, l'autre en réponse satirique à la politique du moment.
                  </p>
                </div>

                {covidSubs.map((sub, si) => {
                  const works = getArtworksByCollection(sub.id);
                  return (
                    <div key={sub.id} className={si > 0 ? "mt-20 pt-16 border-t border-noir/8" : ""}>
                      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-3">
                        <div>
                          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone mb-1">
                            {si === 0 ? "A." : "B."} Sous-série
                          </p>
                          <h3 className="font-serif text-3xl italic font-light text-noir">
                            {sub.label}
                          </h3>
                        </div>
                        <p className="text-stone text-sm max-w-sm md:text-right">
                          {sub.description}
                        </p>
                      </div>
                      <CollectionCarousel artworks={works} onSelect={setSelected} />
                      <p className="mt-4 text-stone text-[10px] uppercase tracking-[0.2em]">
                        {works.length} œuvre{works.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            (() => {
              const col = standaloneCollections.find((c) => c.id === active);
              if (!col) return null;
              const artworks = getArtworksByCollection(col.id);
              const visible = getVisibleArtworks(col.id);
              const index = navItems.findIndex((n) => n.id === active) + 1;
              return (
                <motion.div
                  key={active}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="py-20"
                >
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div>
                        <div className="flex items-baseline gap-4 mb-2">
                          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone">
                            {String(index).padStart(2, "0")}
                          </span>
                          {col.year && (
                            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone/60">
                              {col.year}
                            </span>
                          )}
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl font-light italic text-noir">
                          {col.label}
                        </h2>
                      </div>
                      <p className="text-stone text-sm leading-relaxed max-w-md md:text-right">
                        {col.description}
                      </p>
                    </div>

                    <CollectionCarousel artworks={artworks} onSelect={setSelected} />

                    <p className="mt-6 text-stone text-[10px] uppercase tracking-[0.2em]">
                      {artworks.length} œuvre{artworks.length > 1 ? "s" : ""}
                      {visible.length < artworks.length && (
                        <span className="ml-2 opacity-60">
                          · {artworks.length - visible.length} à venir
                        </span>
                      )}
                    </p>
                  </div>
                </motion.div>
              );
            })()
          )}
        </AnimatePresence>
      </div>
      </div>{/* end sticky block */}

      {/* Fullscreen viewer */}
      <ArtworkViewer
        artwork={selected}
        artworks={selected ? getArtworksByCollection(selected.collection) : []}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </div>
  );
}

