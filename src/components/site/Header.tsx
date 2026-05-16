import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Leaves } from "./Leaves";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/visit", label: "Visit & Book" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-[oklch(0.10_0.02_30/0.85)] backdrop-blur-md text-cream"
          : "bg-transparent text-cream"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:py-6">
        <Link to="/" className="font-display text-2xl tracking-tight" onClick={() => setOpen(false)}>
          Bar <span className="italic text-gold">Estilo</span>
        </Link>
        <div className="flex items-center gap-5">
          <Link
            to="/visit"
            className="hidden rounded-full border border-current px-5 py-2 text-xs uppercase tracking-[0.2em] transition-all hover:bg-cream hover:text-ink md:inline-block"
            onClick={() => setOpen(false)}
          >
            Reserve
          </Link>
        <button
          onClick={() => setOpen((s) => !s)}
          className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em]"
          aria-label="Toggle menu"
        >
          <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
          <span className="relative grid h-9 w-9 place-items-center rounded-full border border-current">
            {open ? <X size={16} /> : <Menu size={16} />}
          </span>
        </button>
        </div>
      </div>
    </header>

    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-[oklch(0.10_0.02_30)] text-cream"
        >
          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 pb-12 pt-32">
            <Leaves
              variant="branch"
              className="pointer-events-none absolute right-6 top-24 h-64 w-64 text-sage/40 md:h-96 md:w-96"
            />
            <Leaves
              variant="fern"
              className="pointer-events-none absolute -left-6 bottom-12 h-72 w-72 text-sage/30"
            />
            <nav className="flex flex-col gap-3 md:gap-5">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.6, ease: [0.16, 0.84, 0.24, 1] }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-6 border-b border-cream/10 py-4 font-display text-5xl tracking-tight transition-colors hover:text-gold md:text-8xl"
                    activeProps={{ className: "text-gold" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    <span className="text-xs tracking-[0.3em] text-cream/40 md:text-sm">
                      0{i + 1}
                    </span>
                    <span className="italic">{l.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="grid gap-6 text-sm text-cream/60 md:grid-cols-3">
              <p>42 Cobalt Lane<br />Shoreditch, London E1</p>
              <p>Tue – Sun · 12:00 – late<br />Mon · closed</p>
              <p>
                <a href="tel:+442079460188" className="underline">020 7946 0188</a><br />
                <a href="mailto:hola@barestilo.london" className="underline">hola@barestilo.london</a>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}