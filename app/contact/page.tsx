"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextMorph } from "@/components/core/text-morph";

const socials = [
  { label: "Instagram", handle: "@leniwhitford",     href: "https://instagram.com/leniwhitford" },
  { label: "TikTok",    handle: "@leniwhitford.art", href: "https://tiktok.com/@leniwhitford.art" },
  { label: "Facebook",  handle: "leni.whitford",     href: "https://facebook.com/leni.whitford" },
];

export default function ContactPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [prenom,   setPrenom]   = useState("");
  const [nom,      setNom]      = useState("");
  const [email,    setEmail]    = useState("");
  const [sujet,    setSujet]    = useState("");
  const [message,  setMessage]  = useState("");
  const [sending,  setSending]  = useState(false);
  const [sent,     setSent]     = useState(false);
  const [error,    setError]    = useState("");

  const displayName = [prenom, nom].filter(Boolean).join(" ") || "vous";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ prenom, nom, email, sujet, message }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setFormOpen(false);
        setPrenom(""); setNom(""); setEmail(""); setSujet(""); setMessage("");
      }, 3000);
    } catch {
      setError("Une erreur s'est produite. Réessayez ou écrivez directement à leni.whitford@orange.fr");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivoire pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone mb-4">
            Échangeons
          </p>
          <h1 className="font-serif text-6xl md:text-7xl font-light italic text-noir mb-6">
            Contact
          </h1>
          <p className="text-charcoal/70 text-sm leading-relaxed max-w-md">
            Pour toute demande — commande, exposition, collaboration ou simple
            échange — n&apos;hésitez pas à me contacter.
          </p>
        </motion.div>

        {/* Contact rows */}
        <div className="space-y-1 mb-20">

          {/* Email row — click to open form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <button
              onClick={() => setFormOpen(!formOpen)}
              className="group w-full flex items-center justify-between border-b border-noir/10 py-6 hover:border-noir/40 transition-all duration-300 text-left"
            >
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone mb-1">
                  Email
                </p>
                <p className="font-serif text-2xl italic text-noir group-hover:text-stone transition-colors duration-300">
                  leni.whitford@orange.fr
                </p>
              </div>
              <motion.span
                animate={{ rotate: formOpen ? 90 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-stone/50 group-hover:text-noir transition-colors duration-300 text-lg"
              >
                →
              </motion.span>
            </button>

            {/* Contact form — expands on click */}
            <AnimatePresence>
              {formOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <form onSubmit={handleSubmit} className="bg-noir/[0.03] border-x border-b border-noir/10 px-8 py-10">

                    {/* Live greeting with TextMorph */}
                    <div className="mb-10 pb-8 border-b border-noir/8">
                      <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-stone mb-3">
                        Votre message
                      </p>
                      <div className="font-serif text-3xl md:text-4xl font-light italic text-noir leading-snug">
                        Bonjour,&nbsp;
                        <TextMorph className="text-stone">
                          {displayName}
                        </TextMorph>
                      </div>
                    </div>

                    {/* Name fields */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone block mb-2">
                          Prénom
                        </label>
                        <input
                          type="text"
                          value={prenom}
                          onChange={e => setPrenom(e.target.value)}
                          placeholder="Votre prénom"
                          className="w-full bg-transparent border-b border-noir/20 py-2 text-sm text-noir placeholder-stone/40 focus:outline-none focus:border-noir/60 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone block mb-2">
                          Nom
                        </label>
                        <input
                          type="text"
                          value={nom}
                          onChange={e => setNom(e.target.value)}
                          placeholder="Votre nom"
                          className="w-full bg-transparent border-b border-noir/20 py-2 text-sm text-noir placeholder-stone/40 focus:outline-none focus:border-noir/60 transition-colors duration-200"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone block mb-2">
                        Votre email <span className="text-stone/50">(pour recevoir une réponse)</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        className="w-full bg-transparent border-b border-noir/20 py-2 text-sm text-noir placeholder-stone/40 focus:outline-none focus:border-noir/60 transition-colors duration-200"
                      />
                    </div>

                    {/* Subject */}
                    <div className="mb-6">
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone block mb-2">
                        Sujet
                      </label>
                      <input
                        type="text"
                        value={sujet}
                        onChange={e => setSujet(e.target.value)}
                        placeholder="Commande, exposition, collaboration…"
                        className="w-full bg-transparent border-b border-noir/20 py-2 text-sm text-noir placeholder-stone/40 focus:outline-none focus:border-noir/60 transition-colors duration-200"
                      />
                    </div>

                    {/* Message */}
                    <div className="mb-10">
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone block mb-2">
                        Message
                      </label>
                      <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Décrivez votre projet ou votre demande…"
                        rows={5}
                        className="w-full bg-transparent border-b border-noir/20 py-2 text-sm text-noir placeholder-stone/40 focus:outline-none focus:border-noir/60 transition-colors duration-200 resize-none"
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="text-xs text-red-500 mb-4">{error}</p>
                    )}

                    {/* Submit */}
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setFormOpen(false)}
                        className="text-xs uppercase tracking-[0.15em] text-stone hover:text-noir transition-colors"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        disabled={sending || sent}
                        className="group inline-flex items-center gap-3 bg-noir text-ivoire px-7 py-3 text-xs uppercase tracking-[0.2em] hover:bg-charcoal transition-colors duration-300 disabled:opacity-60"
                      >
                        {sent ? "Message envoyé ✓" : sending ? "Envoi…" : "Envoyer"}
                        {!sent && !sending && (
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Phone row */}
          <motion.a
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            href="tel:+33681449042"
            className="group flex items-center justify-between border-b border-noir/10 py-6 hover:border-noir/40 transition-all duration-300"
          >
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone mb-1">
                Téléphone
              </p>
              <p className="font-serif text-2xl italic text-noir group-hover:text-stone transition-colors duration-300">
                06 81 44 90 42
              </p>
            </div>
            <span className="text-stone/50 group-hover:text-noir group-hover:translate-x-1 transition-all duration-300">
              →
            </span>
          </motion.a>
        </div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone mb-8">
            Réseaux sociaux
          </p>
          <div className="flex flex-wrap gap-3">
            {socials.map(({ label, handle, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-noir/15 px-5 py-3 hover:bg-noir hover:border-noir transition-all duration-400"
              >
                <span className="block font-sans text-[10px] uppercase tracking-[0.15em] text-stone group-hover:text-ivoire/60 transition-colors mb-0.5">
                  {label}
                </span>
                <span className="font-serif italic text-noir group-hover:text-ivoire transition-colors">
                  {handle}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
