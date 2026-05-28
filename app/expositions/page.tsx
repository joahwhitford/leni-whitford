"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { exhibitions } from "@/lib/data";
import type { Exhibition } from "@/lib/data";
import { ExpoViewer } from "@/components/ExpoViewer";

// ── Data model ───────────────────────────────────────────────────────────────

type SingleEntry = { type: "single"; expo: Exhibition };
type PairedEntry = { type: "paired"; expos: [Exhibition, Exhibition] };
type MergedSingleEntry = {
  type: "merged-single";
  combined: Exhibition; // opened in the viewer
  venues: { location: string; year: string }[];
};
type Entry = SingleEntry | PairedEntry | MergedSingleEntry;
type YearGroup = { label: string; entries: Entry[] };

const byId = Object.fromEntries(exhibitions.map((e) => [e.id, e]));

const groups: YearGroup[] = [
  {
    label: "2026",
    entries: [{ type: "single", expo: byId["sceaux-2026"] }],
  },
  {
    label: "2025",
    entries: [{ type: "single", expo: byId["veilleuses-2025"] }],
  },
  {
    label: "2024",
    entries: [{ type: "single", expo: byId["sportsarts-2024"] }],
  },
  {
    label: "2023",
    entries: [
      { type: "single", expo: byId["rugbyart-2023"] },
      {
        type: "paired",
        expos: [byId["stepping-nice-2023"], byId["stepping-seyne-2023"]],
      },
    ],
  },
  {
    label: "2021 — 2022",
    entries: [
      {
        type: "merged-single",
        combined: {
          id: "unesco-merged",
          title: "Résilience Créative",
          location: "UNESCO, Paris · Exposition Universelle, Dubaï",
          year: "2021 — 2022",
          description: byId["unesco-paris-2021"].description,
          cover: byId["unesco-paris-2021"].cover,
          images: [...new Set([
            ...(byId["unesco-paris-2021"].images ?? []),
            ...(byId["unesco-dubai-2022"].images ?? []),
          ])],
        },
        venues: [
          { location: "UNESCO, Paris", year: "Novembre 2021" },
          { location: "Exposition Universelle, Dubaï", year: "Février 2022" },
        ],
      } satisfies MergedSingleEntry,
      { type: "single", expo: byId["marianne-casino-2021"] },
      { type: "single", expo: byId["hopitaux-2021"] },
    ],
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ExpositionsPage() {
  const [selected, setSelected] = useState<Exhibition | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("expo");
    if (id) {
      const found = exhibitions.find((e) => e.id === id);
      if (found && (found.images?.length ?? 0) > 0) setSelected(found);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-ivoire pt-28 pb-32">
      {/* Header */}
      <div className="px-6 md:px-16 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone mb-4">
            Parcours
          </p>
          <h1 className="font-serif text-6xl md:text-7xl font-light italic text-noir">
            Expositions
          </h1>
        </motion.div>
      </div>

      {/* Year groups */}
      <div className="px-6 md:px-16 max-w-7xl mx-auto space-y-24">
        {groups.map((group) => (
          <motion.section
            key={group.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Year label */}
            <div className="flex items-center gap-6 mb-10">
              <span className="font-serif text-5xl md:text-6xl font-light italic text-noir/10 leading-none select-none">
                {group.label}
              </span>
              <div className="flex-1 h-px bg-noir/12" />
            </div>

            {/* Entries */}
            <div className="space-y-12">
              {group.entries.map((entry, ei) =>
                entry.type === "single" ? (
                  <SingleRow key={entry.expo.id} expo={entry.expo} onSelect={setSelected} />
                ) : entry.type === "paired" ? (
                  <PairedRow key={entry.expos[0].id + entry.expos[1].id} entry={entry} onSelect={setSelected} />
                ) : (
                  <MergedSingleRow key={entry.combined.id} entry={entry} onSelect={setSelected} />
                )
              )}
            </div>
          </motion.section>
        ))}

        <div className="h-px bg-noir/12" />
      </div>

      <ExpoViewer expo={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

// ── Shared image thumbnail ────────────────────────────────────────────────────

function ExpoThumb({
  expo,
  sizes,
  hasImages,
}: {
  expo: Exhibition;
  sizes: string;
  hasImages: boolean;
}) {
  return (
    <div className="group/img relative aspect-square overflow-hidden bg-[#ede8df]">
      {expo.cover ? (
        <>
          <Image
            src={expo.cover}
            alt={expo.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
            sizes={sizes}
            quality={70}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
          {hasImages && (
            <div className="absolute inset-0 bg-noir/0 group-hover/img:bg-noir/25 transition-colors duration-500" />
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-serif italic text-stone/60 text-sm">Images à venir</p>
        </div>
      )}
    </div>
  );
}

// ── Shared text block ─────────────────────────────────────────────────────────

function ExpoText({ expo, hasImages }: { expo: Exhibition; hasImages: boolean }) {
  return (
    <div className="flex flex-col justify-center flex-1 min-w-0 py-2">
      <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-stone mb-4">
        {expo.year}
      </p>
      <h2 className="font-serif text-3xl md:text-4xl italic font-light text-noir leading-tight mb-2">
        {expo.title}
      </h2>
      <p className="font-sans text-[9px] uppercase tracking-[0.18em] text-stone mb-5 leading-relaxed">
        {expo.location}
      </p>
      {expo.description && (
        <p className="text-charcoal/60 text-sm leading-relaxed max-w-lg mb-6">
          {expo.description}
        </p>
      )}
      {hasImages && (
        <div className="flex items-center gap-3 mt-auto">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone/60 group-hover:text-noir transition-colors duration-300">
            Voir les photos
          </span>
          <div className="h-px w-6 bg-noir/20 group-hover:w-12 group-hover:bg-noir/60 transition-all duration-500" />
        </div>
      )}
    </div>
  );
}

// ── Single row ────────────────────────────────────────────────────────────────

function SingleRow({
  expo,
  onSelect,
}: {
  expo: Exhibition;
  onSelect: (e: Exhibition) => void;
}) {
  const hasImages = (expo.images?.length ?? 0) > 0;

  return (
    <div
      onClick={() => hasImages && onSelect(expo)}
      className={`group flex flex-col md:flex-row gap-8 md:gap-14 ${
        hasImages ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="shrink-0 w-full md:w-[300px] lg:w-[340px]">
        <ExpoThumb expo={expo} sizes="(max-width: 768px) 100vw, 340px" hasImages={hasImages} />
      </div>
      <ExpoText expo={expo} hasImages={hasImages} />
    </div>
  );
}

// ── Paired row: [Image A][Text A]  [Image B][Text B] on one line ─────────────

function PairedRow({
  entry,
  onSelect,
}: {
  entry: PairedEntry;
  onSelect: (e: Exhibition) => void;
}) {
  const [a, b] = entry.expos;
  const hasImagesA = (a.images?.length ?? 0) > 0;
  const hasImagesB = (b.images?.length ?? 0) > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
      {/* Card A */}
      <div
        onClick={() => hasImagesA && onSelect(a)}
        className={`group flex flex-row gap-6 ${hasImagesA ? "cursor-pointer" : "cursor-default"}`}
      >
        <div className="shrink-0 w-[160px] lg:w-[190px]">
          <ExpoThumb expo={a} sizes="190px" hasImages={hasImagesA} />
        </div>
        <ExpoText expo={a} hasImages={hasImagesA} />
      </div>

      {/* Card B */}
      <div
        onClick={() => hasImagesB && onSelect(b)}
        className={`group flex flex-row gap-6 ${hasImagesB ? "cursor-pointer" : "cursor-default"}`}
      >
        <div className="shrink-0 w-[160px] lg:w-[190px]">
          <ExpoThumb expo={b} sizes="190px" hasImages={hasImagesB} />
        </div>
        <ExpoText expo={b} hasImages={hasImagesB} />
      </div>
    </div>
  );
}

// ── Merged single row (one entry, multiple venues listed) ─────────────────────

function MergedSingleRow({
  entry,
  onSelect,
}: {
  entry: MergedSingleEntry;
  onSelect: (e: Exhibition) => void;
}) {
  const { combined, venues } = entry;
  const hasImages = (combined.images?.length ?? 0) > 0;

  return (
    <div
      onClick={() => hasImages && onSelect(combined)}
      className={`group flex flex-col md:flex-row gap-8 md:gap-14 ${
        hasImages ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="shrink-0 w-full md:w-[300px] lg:w-[340px]">
        <ExpoThumb expo={combined} sizes="(max-width: 768px) 100vw, 340px" hasImages={hasImages} />
      </div>

      <div className="flex flex-col justify-center flex-1 min-w-0 py-2">
        {/* Year range */}
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-stone mb-4">
          2021 — 2022
        </p>

        {/* Title */}
        <h2 className="font-serif text-3xl md:text-4xl italic font-light text-noir leading-tight mb-5">
          {combined.title}
        </h2>

        {/* Venue list */}
        <div className="space-y-2.5 mb-5">
          {venues.map((v) => (
            <div key={v.year} className="flex items-baseline gap-4">
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-stone/40 shrink-0 w-28">
                {v.year}
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-stone leading-relaxed">
                {v.location}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        {combined.description && (
          <p className="text-charcoal/60 text-sm leading-relaxed max-w-lg mb-6">
            {combined.description}
          </p>
        )}

        {hasImages && (
          <div className="flex items-center gap-3 mt-auto">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone/60 group-hover:text-noir transition-colors duration-300">
              Voir les photos
            </span>
            <div className="h-px w-6 bg-noir/20 group-hover:w-12 group-hover:bg-noir/60 transition-all duration-500" />
          </div>
        )}
      </div>
    </div>
  );
}
