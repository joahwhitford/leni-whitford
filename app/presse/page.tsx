"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { pressImage } from "@/lib/data";

export default function PressePage() {
  return (
    <div className="min-h-screen bg-ivoire pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone mb-4">
            Médias
          </p>
          <h1 className="font-serif text-6xl md:text-7xl font-light italic text-noir">
            Presse
          </h1>
        </motion.div>

        {/* Press clipping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="border border-noir/10 overflow-hidden mb-8"
        >
          <Image
            src={pressImage}
            alt="Revue de presse — Léni Whitford"
            width={1200}
            height={900}
            className="w-full h-auto"
            quality={85}
          />
        </motion.div>

        {/* Placeholder for more press */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="border border-dashed border-noir/15 p-12 text-center"
        >
          <p className="font-serif italic text-stone text-lg">
            Articles et interviews à venir
          </p>
        </motion.div>
      </div>
    </div>
  );
}
