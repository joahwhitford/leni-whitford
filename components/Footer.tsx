import Link from "next/link";

const socials = [
  { label: "Instagram", href: "https://instagram.com/leniwhitford" },
  { label: "TikTok", href: "https://tiktok.com/@leniwhitford.art" },
  { label: "Facebook", href: "https://facebook.com/leni.whitford" },
  { label: "LinkedIn", href: "https://linkedin.com/in/leniwhitford" },
];

const nav = [
  { label: "Galerie", href: "/galerie" },
  { label: "Expositions", href: "/expositions" },
  { label: "Art engagé", href: "/art-engage" },
  { label: "Biographie", href: "/biographie" },
  { label: "Presse", href: "/presse" },
  { label: "Commandes", href: "/commandes" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-noir text-ivoire">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-16 border-b border-ivoire/10">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="font-serif text-3xl italic mb-4">Léni Whitford</p>
            <p className="text-stone-light text-sm leading-relaxed">
              Artiste Peintre & Illustratrice Autodidacte. Art contemporain,
              portraits et illustrations engagées.
            </p>
          </div>

          {/* Nav + Socials */}
          <div className="flex gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-stone mb-5">
                Navigation
              </p>
              <ul className="space-y-3">
                {nav.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-stone-light hover:text-ivoire transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-stone mb-5">
                Réseaux
              </p>
              <ul className="space-y-3">
                {socials.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-light hover:text-ivoire transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-stone text-xs">
          <p>© {new Date().getFullYear()} Léni Whitford — Tous droits réservés</p>
          <div className="flex gap-6">
            <Link
              href="/mentions-legales"
              className="hover:text-ivoire transition-colors"
            >
              Mentions légales
            </Link>
            <span className="opacity-40">·</span>
            <span>
              Site réalisé par{" "}
              <span className="hover:text-ivoire transition-colors cursor-default">
                Nova Agency
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
