"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/galerie", label: "Galerie" },
  { href: "/expositions", label: "Expositions" },
  { href: "/art-engage", label: "Art engagé" },
  { href: "/biographie", label: "Biographie" },
  { href: "/presse", label: "Presse" },
  { href: "/commandes", label: "Commandes" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY && y > 120);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const isDarkPage = pathname === "/commandes";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled || menuOpen
              ? "bg-ivoire/90 backdrop-blur-md border-b border-stone/10 shadow-sm"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="transition-opacity hover:opacity-60 flex items-center">
              <Image
                src="/logo-leni.svg"
                alt="Léni Whitford"
                width={48}
                height={62}
                className={`h-10 w-auto transition-all duration-500 ${
                  (isHome || isDarkPage) && !scrolled ? "brightness-0 invert" : "brightness-0"
                }`}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-xs uppercase tracking-[0.15em] transition-opacity hover:opacity-50 ${
                    pathname === href ? "opacity-100" : "opacity-70"
                  }`}
                  style={{
                    color:
                      (isHome || isDarkPage) && !scrolled ? "#f5f0e8" : "var(--noir)",
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              <motion.span
                className="block w-6 h-px bg-current"
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                style={{ color: (isHome || isDarkPage) && !scrolled ? "#f5f0e8" : "var(--noir)" }}
              />
              <motion.span
                className="block w-6 h-px bg-current"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                style={{ color: (isHome || isDarkPage) && !scrolled ? "#f5f0e8" : "var(--noir)" }}
              />
              <motion.span
                className="block w-6 h-px bg-current"
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                style={{ color: (isHome || isDarkPage) && !scrolled ? "#f5f0e8" : "var(--noir)" }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-ivoire/95 backdrop-blur-md flex flex-col items-center justify-center gap-8"
          >
            {links.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
              >
                <Link
                  href={href}
                  className="font-serif text-4xl italic text-noir hover:text-stone transition-colors"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
