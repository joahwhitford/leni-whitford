"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  index: number;
  label: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  images?: (string | null)[];
  dark?: boolean;
}

export function SectionPreview({
  index,
  label,
  title,
  description,
  href,
  cta,
  images = [],
  dark = false,
}: Props) {
  const visibleImages = images.filter(Boolean).slice(0, 4) as string[];

  return (
    <section className={`py-24 px-6 ${dark ? "bg-noir" : "bg-ivoire"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-baseline gap-4 mb-4">
              <span className={`font-sans text-[10px] uppercase tracking-[0.3em] ${dark ? "text-stone" : "text-stone"}`}>
                {String(index).padStart(2, "0")}
              </span>
              <span className={`font-sans text-[10px] uppercase tracking-[0.3em] ${dark ? "text-stone" : "text-stone"}`}>
                {label}
              </span>
            </div>

            <h2 className={`font-serif text-5xl md:text-6xl font-light italic leading-tight mb-6 ${dark ? "text-ivoire" : "text-noir"}`}>
              {title}
            </h2>

            <p className={`text-sm leading-relaxed mb-10 max-w-sm ${dark ? "text-stone-light" : "text-charcoal/70"}`}>
              {description}
            </p>

            <Link
              href={href}
              className={`group inline-flex items-center gap-3 border px-7 py-3 text-xs uppercase tracking-[0.2em] transition-all duration-500 ${
                dark
                  ? "border-ivoire/20 text-ivoire hover:bg-ivoire hover:text-noir"
                  : "border-noir/20 text-noir hover:bg-noir hover:text-ivoire"
              }`}
            >
              {cta}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          {/* Image grid */}
          {visibleImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className={`grid gap-3 ${
                visibleImages.length === 1
                  ? "grid-cols-1"
                  : visibleImages.length === 2
                  ? "grid-cols-2"
                  : visibleImages.length === 3
                  ? "grid-cols-2"
                  : "grid-cols-2"
              }`}
            >
              {visibleImages.map((src, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden ${
                    visibleImages.length === 3 && i === 0 ? "col-span-2" : ""
                  } ${i === 0 ? "aspect-[4/3]" : "aspect-square"}`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    quality={70}
                  />
                </div>
              ))}
            </motion.div>
          )}

          {/* Placeholder when no images */}
          {visibleImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`h-64 border border-dashed flex items-center justify-center ${
                dark ? "border-ivoire/10" : "border-noir/10"
              }`}
            >
              <p className={`font-serif italic text-lg ${dark ? "text-stone" : "text-stone"}`}>
                Images à venir
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
