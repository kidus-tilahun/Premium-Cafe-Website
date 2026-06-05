import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Private Events", href: "/events" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        animate={{
          backgroundColor: scrolled ? "rgba(13,13,13,0.94)" : "rgba(0,0,0,0.05)",
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/[0.05]"
      >
        <div className="px-8 md:px-16 h-16 flex items-center justify-between max-w-7xl mx-auto">
          <Link
            href="/"
            className="font-serif font-light text-white text-xl tracking-tight hover:text-white/80 transition-colors"
            data-testid="nav-logo"
          >
            Driftwood.
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const active = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[11px] tracking-[0.22em] uppercase font-sans group transition-colors duration-300 ${
                    active ? "text-white" : "text-white/45 hover:text-white"
                  }`}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-[#C05A46] transition-all duration-400 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Link href="/menu">
              <motion.span
                whileHover={{ letterSpacing: "0.14em" }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center bg-[#C05A46] text-white px-7 py-2.5 text-[10px] tracking-[0.22em] uppercase font-sans cursor-pointer"
                style={{ borderRadius: 0 }}
                data-testid="nav-btn-order"
              >
                Order Online
              </motion.span>
            </Link>
          </div>

          <button
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            data-testid="btn-mobile-menu"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0D0D0D]/97 backdrop-blur-md border-b border-white/[0.06] px-8 py-8 flex flex-col gap-7"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-[0.25em] uppercase font-sans text-white/55 hover:text-white transition-colors"
                data-testid={`nav-mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/menu">
              <span
                className="inline-flex items-center justify-center bg-[#C05A46] text-white px-7 py-3.5 text-[10px] tracking-[0.22em] uppercase font-sans w-full"
                style={{ borderRadius: 0 }}
              >
                Order Online
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
