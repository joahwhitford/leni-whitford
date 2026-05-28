"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Hero } from "@/components/Hero";
import { ArtworkViewer } from "@/components/ArtworkViewer";
import { artworks as allArtworks } from "@/lib/data";
import type { Artwork } from "@/lib/data";

export default function Home() {
  const [selected, setSelected] = useState<Artwork | null>(null);

  const openArtwork = (id: string) => {
    const found = allArtworks.find((a) => a.id === id);
    if (found) setSelected(found);
  };

  return (
    <>
      <Hero />
      <GalerieSection onOpen={openArtwork} />
      <ExpositionsSection />
      <ArtEngageSection />
      <BiographieSection />
      <PresseSection />
      <CommandesSection />
      <ArtworkViewer
        artwork={selected}
        artworks={selected ? allArtworks.filter((a) => a.collection === selected.collection) : []}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </>
  );
}

// ── I. GALERIE ────────────────────────────────────────────────────────────────
// Three staggered images at different heights, title sweeps full width below

function GalerieSection({ onOpen }: { onOpen: (id: string) => void }) {
  const goTo = onOpen;

  return (
    <section className="bg-ivoire py-16 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Title on top */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone">01</span>
            <div className="h-px w-12 bg-stone/30" />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone">Collections</span>
          </div>
          <h2 className="font-serif text-6xl md:text-7xl font-light italic text-noir leading-none">
            Galerie
          </h2>
        </motion.div>

        {/* Fixed-height row — each image at its natural aspect ratio */}
        <div className="flex gap-3 mb-10 overflow-hidden" style={{ height: "380px" }}>
          {[
            { src: "/artworks/spirit-in-motion.webp", alt: "Spirit in Motion", id: "jo-venus", ratio: "0.49 / 1", sizes: "200px" },
            { src: "/artworks/je-suis-nice.webp", alt: "Je suis Nice", id: "mar-nice", ratio: "0.67 / 1", sizes: "260px" },
            { src: "/artworks/on-top-of-the-food-chain.webp", alt: "On Top of the Food Chain", id: "inf-foodchain", ratio: "1.5 / 1", sizes: "570px" },
          ].map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => goTo(img.id)}
              className="group relative shrink-0 h-full cursor-pointer overflow-hidden"
              style={{ aspectRatio: img.ratio }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes={img.sizes}
                quality={70}
                draggable={false}
                onContextMenu={e => e.preventDefault()}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/40 transition-colors duration-500 flex items-end p-4">
                <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  <p className="font-serif italic text-ivoire text-sm leading-snug">{img.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Description + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-noir/10 pt-6"
        >
          <p className="text-charcoal/60 text-sm leading-relaxed max-w-sm">
            Cinq séries de peintures et aquarelles — de la réflexion écologique aux portraits engagés.
          </p>
          <Link href="/galerie" className="group inline-flex items-center gap-3 border border-noir/20 px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-noir hover:text-ivoire transition-all duration-500 shrink-0">
            Voir les collections
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

// ── II. EXPOSITIONS ───────────────────────────────────────────────────────────

function ExpositionsSection() {
  const router = useRouter();

  const featured = { src: "/artworks/expo-rugbyart-2023.webp", id: "rugbyart-2023", label: "Rugby'Art — 2023" };
  const thumbnails = [
    { src: "/artworks/expo-sablettes-2023.webp", id: "stepping-seyne-2023" },
    { src: "/artworks/expo-nice-2023.webp", id: "stepping-nice-2023" },
    { src: "/artworks/expo-casino-2.webp", id: "marianne-casino-2021" },
  ];

  return (
    <section className="bg-noir py-16 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Main split */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-12 mb-8 items-center">

          {/* Large feature image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => router.push(`/expositions?expo=${featured.id}`)}
            className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
          >
            <Image src={featured.src} alt={featured.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="55vw" quality={75} draggable={false} onContextMenu={e => e.preventDefault()} />
            <div className="absolute inset-0 bg-noir/10 group-hover:bg-noir/40 transition-colors duration-500" />
            <div className="absolute bottom-4 left-4">
              <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-ivoire/60 group-hover:text-ivoire/90 transition-colors duration-300">{featured.label}</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone">02</span>
              <div className="h-px w-12 bg-stone/30" />
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone">Parcours</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl font-light italic text-ivoire leading-tight mb-6">
              Expositions
            </h2>
            <p className="text-stone text-sm leading-relaxed mb-8 max-w-sm">
              De l'UNESCO à Paris, de Dubaï à La Seyne-sur-Mer — dix expositions qui jalonnent un parcours artistique engagé et international.
            </p>
            <Link href="/expositions" className="group inline-flex items-center gap-3 border border-ivoire/20 px-6 py-3 text-xs uppercase tracking-[0.2em] text-ivoire hover:bg-ivoire hover:text-noir transition-all duration-500">
              Voir les expositions
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Thumbnail strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-3 gap-2"
        >
          {thumbnails.map((t) => (
            <div
              key={t.id}
              onClick={() => router.push(`/expositions?expo=${t.id}`)}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
            >
              <Image src={t.src} alt="" fill className="object-cover opacity-55 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" sizes="33vw" quality={60} draggable={false} onContextMenu={e => e.preventDefault()} />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

// ── III. ART ENGAGÉ ───────────────────────────────────────────────────────────
// Giant full-width title as visual anchor. Image + text below.

function ArtEngageSection() {
  return (
    <section className="bg-ivoire">

      {/* Title */}
      <div className="px-6 pt-20 pb-0 border-t border-noir/8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-7xl mx-auto"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone">03 — Engagement</span>
          <h2 className="font-serif font-light italic text-noir leading-none mt-3 mb-0 border-b border-noir/8 pb-8" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            Art engagé
          </h2>
        </motion.div>
      </div>

      {/* Content below title */}
      <div className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image src="/artworks/hall-of-fame.webp" alt="Hall of Fame" fill className="object-cover" sizes="25vw" quality={70} draggable={false} onContextMenu={e => e.preventDefault()} />
            </div>
            <div className="relative aspect-square overflow-hidden mt-8">
              <Image src="/artworks/octobre-rose.webp" alt="Octobre Rose" fill className="object-cover" sizes="25vw" quality={70} draggable={false} onContextMenu={e => e.preventDefault()} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-charcoal/70 text-sm leading-relaxed mb-10 max-w-md">
              Hall of Fame RCT, Octobre Rose, Maltraitance — des œuvres qui prennent position, qui témoignent, qui font parler.
            </p>
            <Link href="/art-engage" className="group inline-flex items-center gap-3 border border-noir/20 px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-noir hover:text-ivoire transition-all duration-500">
              Voir les œuvres
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ── IV. BIOGRAPHIE ────────────────────────────────────────────────────────────
// Centered editorial: pull quote + artwork + button

function BiographieSection() {
  return (
    <section className="bg-[#111009] py-14 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
        >
          <div className="relative shrink-0 w-32 aspect-[3/4] overflow-hidden">
            <Image src="/artworks/reanimation.webp" alt="Réanimation" fill className="object-cover object-top" sizes="130px" quality={70} draggable={false} onContextMenu={e => e.preventDefault()} />
          </div>

          <div className="flex-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone mb-3 block">04 — À propos</span>
            <h2 className="font-serif text-5xl md:text-6xl font-light italic text-ivoire leading-none mb-5">Biographie</h2>
            <blockquote className="font-serif font-light italic text-ivoire/60 leading-snug mb-4" style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)" }}>
              "Artiste autodidacte, ancienne infirmière."
            </blockquote>
            <p className="text-stone/70 text-sm leading-relaxed mb-6 max-w-md">
              Une démarche figurative et réaliste qui interroge les mécanismes de domination, de résistance et d'engagement.
            </p>
            <Link href="/biographie" className="group inline-flex items-center gap-3 border border-ivoire/20 px-6 py-3 text-xs uppercase tracking-[0.2em] text-ivoire hover:bg-ivoire hover:text-noir transition-all duration-500">
              En savoir plus
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── V. PRESSE ─────────────────────────────────────────────────────────────────
// Two column: left = number + text + CTA, right = large image with border frame

function PresseSection() {
  return (
    <section className="bg-ivoire py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Text left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone">05</span>
              <div className="h-px w-12 bg-stone/30" />
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone">Médias</span>
            </div>

            <h2 className="font-serif text-6xl md:text-7xl font-light italic text-noir leading-none mb-8">
              Presse
            </h2>

            <p className="text-charcoal/70 text-sm leading-relaxed mb-10 max-w-sm">
              Var-Matin, Nice-Matin, France 3, La Seyne-sur-Mer — les médias parlent de Léni Whitford et de ses expositions.
            </p>

            <Link href="/presse" className="group inline-flex items-center gap-3 border border-noir/20 px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-noir hover:text-ivoire transition-all duration-500">
              Voir la revue de presse
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          {/* Image right with double-border frame effect */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 border border-noir/8 translate-x-4 translate-y-4" />
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/artworks/expo-sablettes-2023.webp" alt="Presse" fill className="object-cover" sizes="50vw" quality={70} draggable={false} onContextMenu={e => e.preventDefault()} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ── VI. COMMANDES ─────────────────────────────────────────────────────────────
// Dark. Dramatic full-width type, two floating images, centered CTA

function CommandesSection() {
  return (
    <section className="bg-noir py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Giant type */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone">06</span>
            <div className="h-px w-12 bg-stone/30" />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone">Sur mesure</span>
          </div>
          <h2 className="font-serif font-light italic text-ivoire leading-none" style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}>
            Commandes
          </h2>
        </motion.div>

        <div className="h-px bg-ivoire/8 mb-12" />

        {/* Mosaic grid */}
        <div className="grid gap-3 mb-10" style={{
          gridTemplateColumns: "1.2fr 1.6fr 1fr",
          gridTemplateRows: "320px 220px",
        }}>
          {/* A — tall left, spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="relative overflow-hidden" style={{ gridRow: "1 / 3" }}
          >
            <Image src="/artworks/commande-fufu.webp" alt="" fill className="object-cover" sizes="25vw" quality={70} draggable={false} onContextMenu={e => e.preventDefault()} />
          </motion.div>

          {/* B — top middle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="relative overflow-hidden"
          >
            <Image src="/artworks/commande-brennus.webp" alt="" fill className="object-cover" sizes="33vw" quality={70} draggable={false} onContextMenu={e => e.preventDefault()} />
          </motion.div>

          {/* C — top right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="relative overflow-hidden"
          >
            <Image src="/artworks/commande-petit-rugbyman.webp" alt="" fill className="object-cover" sizes="20vw" quality={70} draggable={false} onContextMenu={e => e.preventDefault()} />
          </motion.div>

          {/* D — bottom middle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="relative overflow-hidden"
          >
            <Image src="/artworks/commande-eau.webp" alt="" fill className="object-cover" sizes="33vw" quality={70} draggable={false} onContextMenu={e => e.preventDefault()} />
          </motion.div>

          {/* E — bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.27 }}
            className="relative overflow-hidden"
          >
            <Image src="/artworks/commande-portrait-enfant.webp" alt="" fill className="object-cover" sizes="20vw" quality={70} draggable={false} onContextMenu={e => e.preventDefault()} />
          </motion.div>
        </div>

        {/* Text + CTA below mosaic */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-ivoire/8 pt-8"
        >
          <p className="text-stone text-sm leading-relaxed max-w-md">
            Portraits, illustrations, œuvres sur mesure — chaque commande est unique, conçue en collaboration étroite avec vous. Léni Whitford accepte les demandes privées et professionnelles.
          </p>
          <Link href="/commandes" className="group inline-flex items-center gap-3 border border-ivoire/20 px-6 py-3 text-xs uppercase tracking-[0.2em] text-ivoire hover:bg-ivoire hover:text-noir transition-all duration-500 shrink-0">
            Faire une demande
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
