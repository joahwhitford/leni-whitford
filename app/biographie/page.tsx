"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { artistPortrait, pressImage } from "@/lib/data";


export default function BiographiePage() {
  return (
    <div className="min-h-screen bg-ivoire">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={artistPortrait}
          alt="Léni Whitford — Artiste plasticienne"
          fill
          className="object-cover object-top"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/60 to-noir/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6 text-ivoire text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone-light mb-4"
          >
            Artiste Peintre · Illustratrice Autodidacte
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-serif text-6xl md:text-7xl font-light italic"
          >
            Léni Whitford
          </motion.h1>
        </div>
      </section>

      {/* Bio text */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl italic font-light text-noir leading-relaxed mb-10"
          >
            &ldquo;Enfant, je crée des bandes dessinées, je caricature mes
            proches, puis j&apos;œuvre pour servir.&rdquo;
          </motion.p>

          <div className="space-y-6 text-charcoal/80 text-sm leading-relaxed">
            <motion.p
              variants={fadeUp(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Léni Whitford est une artiste plasticienne autodidacte, basée dans
              le Sud de la France. Sa pratique s&apos;inscrit dans une peinture
              figurative réaliste, principalement des portraits, enrichie par des
              installations. Elle interroge les mécanismes de domination qui
              traversent les êtres, les imaginaires et les écosystèmes.
            </motion.p>
            <motion.p
              variants={fadeUp(0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Dans sa série d&apos;aquarelles <em>Objets de pouvoir domestique</em>,
              des figures féminines sont confrontées aux objets du quotidien. En
              détournant les codes de la culture populaire, elle révèle une
              violence diffuse inscrite dans les gestes ordinaires.
            </motion.p>
            <motion.p
              variants={fadeUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Sa réflexion s&apos;étend aujourd&apos;hui à l&apos;écologie dans la série{" "}
              <em>Infranatural</em> — grandes huiles sur toile qui questionnent
              l&apos;humanité à la fois bourreau et victime de la nature. Son
              installation <em>Veilleuses d&apos;Océans</em> (kimono peint,
              200 × 140 cm) a été présentée au festival Femmes ! 2025.
            </motion.p>
            <motion.p
              variants={fadeUp(0.25)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              En 2020, quatre de ses <em>Portraits de Soignants</em> sont
              sélectionnés pour l&apos;exposition internationale de l&apos;UNESCO{" "}
              <em>Résilience Créative</em> (Paris, Dubaï). En 2024, elle peint
              en direct lors des Jeux Olympiques de Paris.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Techniques */}
      <section className="bg-noir py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-serif text-4xl italic font-light text-ivoire mb-12"
          >
            Techniques & médiums
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Huile sur toile", "Aquarelle", "Acrylique", "Installation"].map(
              (t, i) => (
                <motion.div
                  key={t}
                  variants={fadeUp(i * 0.08)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="border border-ivoire/10 p-6"
                >
                  <p className="text-ivoire font-serif text-lg italic">{t}</p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="py-20 px-6 bg-ivoire-dark">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-serif text-4xl italic font-light text-noir mb-12"
          >
            Ils parlent de moi
          </motion.h2>
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="overflow-hidden border border-noir/10"
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
        </div>
      </section>
    </div>
  );
}
