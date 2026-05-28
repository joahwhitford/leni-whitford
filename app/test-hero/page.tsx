"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ── Theme definitions ─────────────────────────────────────────────────────────

const themes = {
  default: {
    label: "Blanc",
    dot: "#f5f0e8",
    textColor: "#e8d5a3",
    paint: "#c8b88a",
    image: "/artworks/leni-whitford-header.webp",
    tint: "rgba(0,0,0,0)",
    overlayColor: "rgba(10,8,5,0.50)",
  },
  red: {
    label: "Rouge",
    dot: "#d94040",
    textColor: "#f08090",
    paint: "#7a1020",
    image: "/artworks/je-suis-paris.webp",
    tint: "rgba(180,20,30,0.52)",
    overlayColor: "rgba(15,5,5,0.55)",
  },
  blue: {
    label: "Bleu",
    dot: "#2060c8",
    textColor: "#60c8f0",
    paint: "#0a1a40",
    image: "/artworks/etudiante.webp",
    tint: "rgba(10,60,200,0.52)",
    overlayColor: "rgba(5,10,25,0.55)",
  },
  green: {
    label: "Vert",
    dot: "#28a040",
    textColor: "#70e0a0",
    paint: "#082010",
    image: "/artworks/evolution.webp",
    tint: "rgba(20,140,50,0.52)",
    overlayColor: "rgba(5,15,8,0.55)",
  },
} as const;

type ThemeKey = keyof typeof themes;

// ── Main page ─────────────────────────────────────────────────────────────────

export default function TestHero() {
  const [theme, setTheme] = useState<ThemeKey>("default");
  const [transitioning, setTransitioning] = useState(false);
  const [pendingTheme, setPendingTheme] = useState<ThemeKey>("default");

  const current = themes[theme];

  const selectTheme = (key: ThemeKey) => {
    if (key === theme || transitioning) return;
    setPendingTheme(key);
    setTransitioning(true);
    setTimeout(() => setTheme(key), 700);          // swap when circle covers screen
    setTimeout(() => setTransitioning(false), 750); // then fade out
  };

  return (
    <section className="relative h-screen overflow-hidden bg-[#0a0805]">

      {/* ── Background image — swaps instantly under the circle ── */}
      <AnimatePresence>
        <motion.div
          key={theme}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          className="absolute inset-0"
        >
          <Image
            src={current.image}
            alt=""
            fill
            className="object-cover object-center"
            priority
            quality={85}
          />
          {/* Color tint overlay */}
          <motion.div
            animate={{ backgroundColor: current.tint }}
            transition={{ duration: 1.0 }}
            className="absolute inset-0"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Overlay ── */}
      <motion.div
        animate={{ backgroundColor: current.overlayColor }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* ── Radial reveal — circle grows from palette button ── */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key={pendingTheme}
            className="pointer-events-none z-40 rounded-full"
            style={{
              position: "absolute",
              // Center on the palette button (bottom-10 right-8, button is w-16 h-16)
              bottom: "calc(2.5rem + 2rem)",
              right:  "calc(2rem + 2rem)",
              width:  64,
              height: 64,
              marginBottom: -32,
              marginRight:  -32,
              backgroundColor: themes[pendingTheme].dot,
              transformOrigin: "center center",
            }}
            initial={{ scale: 0,  opacity: 1 }}
            animate={{ scale: 70, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
            transition={{ duration: 1.0, ease: [0.08, 0, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-12 md:px-20">
        {/* Name */}
        <div className="mb-2">
          <motion.h1
            animate={{ color: current.textColor }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="font-serif font-light leading-none"
            style={{ fontSize: "clamp(4.5rem, 10vw, 9.5rem)" }}
          >
            Léni
          </motion.h1>
          <motion.h1
            animate={{ color: current.textColor }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="font-serif font-light leading-none"
            style={{ fontSize: "clamp(4.5rem, 10vw, 9.5rem)" }}
          >
            Whitford
          </motion.h1>
        </div>

        {/* Subtitle */}
        <p className="font-serif italic text-white/70 mb-10" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}>
          Artiste Peintre
        </p>

        {/* Social links */}
        <div className="flex flex-wrap gap-3">
          {["Instagram", "Facebook", "LinkedIn", "Tik Tok"].map((s) => (
            <span
              key={s}
              className="border border-white/20 text-white/50 text-[10px] uppercase tracking-[0.18em] px-5 py-2 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── Quote right ── */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 max-w-xs z-10 hidden lg:block">
        <p className="text-white/50 text-sm leading-relaxed italic font-serif">
          "Enfant, je créais des bandes dessinées, je caricaturais mes proches, puis j'œuvre pour servir les autres."
        </p>
      </div>

      {/* ── Palette widget ── */}
      <PaletteWidget
        currentTheme={theme}
        onSelect={selectTheme}
      />
    </section>
  );
}

// ── Palette widget ────────────────────────────────────────────────────────────

const colorKeys: ThemeKey[] = ["default", "red", "blue", "green"];
const fanAngles = [270, 240, 210, 180]; // arc from straight-up to straight-left
const fanRadius = 80;

function PaletteWidget({
  currentTheme,
  onSelect,
}: {
  currentTheme: ThemeKey;
  onSelect: (k: ThemeKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    // Wrapper is large enough to contain all fanned dots + has padding buffer
    <div
      className="absolute bottom-10 right-8 z-30 flex items-end justify-end"
      style={{ width: 210, height: 210 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Color dots — fan out on hover, anchored to bottom-right */}
      {colorKeys.map((key, i) => {
        const angle = fanAngles[i] * (Math.PI / 180);
        const x = open ? Math.cos(angle) * fanRadius : 0;
        const y = open ? Math.sin(angle) * fanRadius : 0;

        return (
          <motion.button
            key={key}
            animate={{ x, y, scale: open ? 1 : 0.4, opacity: open ? 1 : 0 }}
            whileHover={{ scale: open ? 1.3 : 0.4, boxShadow: `0 0 14px 4px ${themes[key].dot}99` }}
            transition={{
              duration: 0.38,
              delay: open ? i * 0.06 : 0,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            onClick={() => onSelect(key)}
            title={themes[key].label}
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full shadow-xl cursor-pointer"
            style={{
              backgroundColor: themes[key].dot,
              border: currentTheme === key ? "2.5px solid white" : "2px solid rgba(255,255,255,0.25)",
            }}
          />
        );
      })}

      {/* Main palette button */}
      <motion.div
        animate={{ scale: open ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-16 h-16 bg-[#111]/70 backdrop-blur-sm border border-white/15 rounded-full flex items-center justify-center shadow-2xl cursor-pointer shrink-0"
      >
        <PaletteIcon color={themes[currentTheme].textColor} />
      </motion.div>
    </div>
  );
}

function PaletteIcon({ color }: { color: string }) {
  // Proper artist palette shape: kidney bean with thumb hole + 4 paint dots
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      {/* Palette body */}
      <path
        d="M16 3C9.5 3 4 7.8 4 13.5c0 3.5 1.8 6.5 4.5 8.5C9.8 23 10 24 10 25c0 2.2 1.8 4 4 4s4-1.8 4-4c0-.4.3-.7.7-.7h1.5C24.8 24.3 28 20.8 28 16.5 28 9.1 22.6 3 16 3z"
        fill={color}
        opacity="0.92"
      />
      {/* Thumb hole */}
      <circle cx="14" cy="25" r="2.2" fill="#111" opacity="0.85" />
      {/* Paint dots on palette */}
      <circle cx="9"  cy="13" r="2" fill="#e84040" opacity="0.9" />
      <circle cx="14" cy="8"  r="2" fill="#f0d840" opacity="0.9" />
      <circle cx="20" cy="9"  r="2" fill="#40a0f0" opacity="0.9" />
      <circle cx="22" cy="16" r="2" fill="#50d870" opacity="0.9" />
    </svg>
  );
}
