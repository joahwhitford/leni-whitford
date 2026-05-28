"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// WATERCOLOR TRANSITION — v4
//
// Architecture (per the reference brief):
//
//   SVG <circle> elements with radialGradient fill
//   + feTurbulence (fractalNoise, animated via SMIL)
//   + feDisplacementMap (organic edge distortion)
//   + feGaussianBlur (watercolor soft edges)
//   + Framer Motion on SVG r + opacity attributes
//   + Paper grain via feBlend soft-light
//
// Why SVG circles with radialGradient (not CSS divs):
//   - radialGradient tied to the circle's own coordinate system
//   - feTurbulence displacement is proportional to element size
//   - No solid-background dependency for contrast trick
//   - Translucent paint layers stack correctly via SVG compositing
//
// Layer stack (back → front):
//   L4  capillary feather    lowest opacity, widest, heaviest blur
//   L3  watery diffusion     medium opacity, medium blur
//   L2  translucent bloom    medium-high opacity, light blur
//   L1  dense pigment core   highest opacity, tightest, sharpest
//   grain  paper texture     soft-light blend, barely visible
// ─────────────────────────────────────────────────────────────────────────────

// ── Helpers ───────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

// ── Layer definitions ─────────────────────────────────────────────────────────

interface Layer {
  id:           string;
  rMult:        number;    // radius = maxR × rMult (1.0 = just covers screen)
  opacity:      number;
  duration:     number;    // expand duration (s)
  delay:        number;    // stagger delay (s)
  freqBase:     string;    // feTurbulence baseFrequency at rest
  freqDrift:    string;    // feTurbulence baseFrequency at peak drift
  driftDur:     string;    // SMIL drift cycle duration
  octaves:      number;
  seed:         number;
  displacement: number;    // feDisplacementMap scale (CSS px, no viewBox)
  blur:         number;    // feGaussianBlur stdDeviation
  // Radial gradient stops: [offset 0-1, stopOpacity 0-1]
  stops:        Array<[number, number]>;
}

const LAYERS: Layer[] = [
  // ── L4: Capillary feather ───────────────────────────────────────────────
  {
    id: "wc-l4", rMult: 1.30, opacity: 0.13, duration: 1.90, delay: 0.18,
    freqBase: "0.024 0.030", freqDrift: "0.031 0.040", driftDur: "3.2s",
    octaves: 6, seed: 7, displacement: 115, blur: 38,
    stops: [[0, 0.55], [0.22, 0.28], [0.50, 0.08], [0.80, 0.02], [1, 0]],
  },
  // ── L3: Watery outer diffusion ─────────────────────────────────────────
  {
    id: "wc-l3", rMult: 1.18, opacity: 0.28, duration: 1.72, delay: 0.13,
    freqBase: "0.016 0.020", freqDrift: "0.022 0.028", driftDur: "3.7s",
    octaves: 5, seed: 14, displacement: 88, blur: 20,
    stops: [[0, 0.70], [0.28, 0.45], [0.58, 0.15], [0.85, 0.03], [1, 0]],
  },
  // ── L2: Translucent bloom ──────────────────────────────────────────────
  {
    id: "wc-l2", rMult: 1.08, opacity: 0.56, duration: 1.50, delay: 0.07,
    freqBase: "0.011 0.014", freqDrift: "0.015 0.019", driftDur: "4.1s",
    octaves: 5, seed: 9, displacement: 65, blur: 10,
    stops: [[0, 0.85], [0.32, 0.60], [0.62, 0.22], [0.88, 0.05], [1, 0]],
  },
  // ── L1: Dense pigment core ────────────────────────────────────────────
  {
    id: "wc-l1", rMult: 1.02, opacity: 0.92, duration: 1.28, delay: 0,
    freqBase: "0.007 0.009", freqDrift: "0.010 0.013", driftDur: "4.5s",
    octaves: 4, seed: 3, displacement: 44, blur: 3.5,
    stops: [[0, 0.94], [0.38, 0.76], [0.70, 0.34], [0.92, 0.08], [1, 0]],
  },
];

// ── Props ─────────────────────────────────────────────────────────────────────

export interface WatercolorTransitionProps {
  active:       boolean;
  color:        string;   // 6-digit hex, e.g. "#7a1020"
  onMidpoint?:  () => void;
  onComplete?:  () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function WatercolorTransition({
  active,
  color,
  onMidpoint,
  onComplete,
}: WatercolorTransitionProps) {

  // Track viewport size for pixel-accurate origin + radius
  const [dims, setDims] = useState({ w: 1920, h: 1080 });

  useEffect(() => {
    const update = () =>
      setDims({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const midFired  = useRef(false);
  const doneFired = useRef(false);

  useEffect(() => {
    if (!active) {
      midFired.current  = false;
      doneFired.current = false;
      return;
    }
    // Midpoint: L1 core has covered ~90% of screen
    const t1 = setTimeout(() => {
      if (!midFired.current) { midFired.current = true; onMidpoint?.(); }
    }, 920);
    // Complete: all layers have faded out
    const t2 = setTimeout(() => {
      if (!doneFired.current) { doneFired.current = true; onComplete?.(); }
    }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active, onMidpoint, onComplete]);

  // Palette origin — bottom-right corner (88% × 92% of viewport)
  const ox = dims.w * 0.88;
  const oy = dims.h * 0.92;

  // Distance from origin to farthest corner (top-left)
  // This is the minimum radius needed to cover the entire viewport
  const maxR = Math.sqrt(ox * ox + oy * oy);

  const [r, g, b] = hexToRgb(color);
  const rgb = `${r},${g},${b}`;

  return (
    <AnimatePresence>
      {active && (
        // Full-viewport SVG overlay — no viewBox so 1 unit = 1 CSS pixel
        <motion.svg
          key="wc-svg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 40,
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
        >
          <defs>
            {/* ── Watercolor filters ── */}
            {LAYERS.map((l) => (
              <filter
                key={`f-${l.id}`}
                id={`f-${l.id}`}
                // Filter region: extra space for displacement + blur spread
                x="-15%"
                y="-15%"
                width="130%"
                height="130%"
                colorInterpolationFilters="sRGB"
              >
                {/*
                  fractalNoise creates soft, organic, rounded distortion
                  (vs "turbulence" which is angular and harsh)
                  Lower baseFrequency = larger, smoother distortion features
                  — watercolor bleeding vs paint splatter
                */}
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency={l.freqBase}
                  numOctaves={l.octaves}
                  seed={l.seed}
                  result="noise"
                >
                  {/* Continuous slow drift — edges breathe, never feel frozen */}
                  <animate
                    attributeName="baseFrequency"
                    values={`${l.freqBase};${l.freqDrift};${l.freqBase}`}
                    dur={l.driftDur}
                    repeatCount="indefinite"
                  />
                </feTurbulence>

                {/* Warp pixels using noise — creates organic edge irregularity */}
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale={l.displacement}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displaced"
                />

                {/*
                  Blur AFTER displacement — this is the key to watercolor edges.
                  The displacement breaks up the edge, blur softens the breaks
                  into paper-absorption-like gradients.
                */}
                <feGaussianBlur
                  in="displaced"
                  stdDeviation={l.blur}
                />
              </filter>
            ))}

            {/* ── Radial gradients — watercolor translucency ── */}
            {LAYERS.map((l) => (
              <radialGradient
                key={`g-${l.id}`}
                id={`g-${l.id}`}
                // Gradient center = circle center (50%/50% of bounding box)
                cx="50%"
                cy="50%"
                r="50%"
              >
                {l.stops.map(([offset, stopOpacity], i) => (
                  <stop
                    key={i}
                    offset={`${(offset * 100).toFixed(0)}%`}
                    stopColor={`rgb(${rgb})`}
                    stopOpacity={stopOpacity}
                  />
                ))}
              </radialGradient>
            ))}

            {/* ── Paper grain filter ── */}
            <filter id="wc-grain" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.72"
                numOctaves="4"
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix
                type="saturate"
                values="0"
                in="noise"
                result="gray"
              />
              <feBlend
                in="SourceGraphic"
                in2="gray"
                mode="soft-light"
              />
            </filter>
          </defs>

          {/* ── Paper grain rect ── */}
          <motion.rect
            x={0} y={0}
            width="100%" height="100%"
            filter="url(#wc-grain)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.065 }}
            transition={{ duration: 0.9, delay: 0.25 }}
          />

          {/* ── Watercolor layers ──────────────────────────────────────────
              Rendered L4 → L1 (back to front).
              Each is a circle at the palette origin, expanding outward.
              radialGradient fill gives translucent watercolor body.
              SVG filter distorts edges into organic watercolor shapes.
          ── */}
          {LAYERS.map((l) => (
            <motion.circle
              key={l.id}
              cx={ox}
              cy={oy}
              fill={`url(#g-${l.id})`}
              filter={`url(#f-${l.id})`}
              initial={{ r: 0, opacity: 0 }}
              animate={{
                r:       maxR * l.rMult,
                opacity: l.opacity,
              }}
              transition={{
                r: {
                  duration: l.duration,
                  delay:    l.delay,
                  ease:     [0.22, 1, 0.36, 1],
                },
                opacity: {
                  duration: 0.18,
                  delay:    l.delay,
                },
              }}
            />
          ))}
        </motion.svg>
      )}
    </AnimatePresence>
  );
}
