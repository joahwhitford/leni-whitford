"use client";

import { motion } from "framer-motion";
import { artEngage } from "@/lib/data";

export default function ArtEngagePage() {
  return (
    <div className="min-h-screen bg-ivoire pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone mb-4">
            Engagement
          </p>
          <h1 className="font-serif text-6xl md:text-7xl font-light italic text-noir mb-6">
            Art engagé
          </h1>
          <p className="text-charcoal/70 text-sm leading-relaxed max-w-xl">
            Des œuvres qui prennent position, qui témoignent, qui font parler.
            Art engagé au service de causes humaines et sociales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artEngage.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="border border-noir/10 p-8"
            >
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-ivoire-dark flex items-center justify-center mb-6 border border-noir/5">
                <p className="font-serif italic text-stone text-sm">Image à venir</p>
              </div>
              <h2 className="font-serif text-2xl italic font-light text-noir mb-3">
                {item.title}
              </h2>
              {item.description && (
                <p className="text-charcoal/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
