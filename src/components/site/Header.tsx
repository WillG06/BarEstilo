import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { to: "/", label: "Index", n: "01" },
  { to: "/menu", label: "The Menu", n: "02" },
  { to: "/about", label: "Studio", n: "03" },
  { to: "/visit", label: "Visit & Book", n: "04" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const dark = scrolled || open;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${dark ? "text-cream" : "text-cream"}`}>
        {/* subtle top gradient so the white logo always reads on photos */}
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b transition-opacity duration-500 ${dark ? "opacity-0" : "from-ink/55 to-transparent opacity-100"}`} />
        <div className={`absolute inset-x-0 top-0 transition-all duration-500 ${dark ? "bg-ink/85 backdrop-blur-md" : "bg-transparent"}`} style={{ height: dark ? "100%" : "0" }} />

        <div className="relative mx-auto flex max-w-[1800px] items-center justify-between px-6 py-6 md:px-10">
          <Link to="/" className="font-display text-[26px] leading-none tracking-tight" onClick={() => setOpen(false)}>
            Bar<span className="italic text-gold"> Estilo</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/visit"
              className="hidden text-[11px] uppercase tracking-[0.3em] opacity-80 hover:opacity-100 md:inline"
              onClick={() => setOpen(false)}
            >
              Reserve
            </Link>

            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="cursor-hover group inline-flex items-center gap-4"
            >
              <span className="hidden text-[11px] uppercase tracking-[0.4em] sm:inline">
                {open ? "Close" : "Menu"}
              </span>
              <span className={`relative inline-block h-10 w-10 rounded-full border border-current transition-all duration-500 group-hover:rotate-180 ${open ? "hb-open" : ""}`}>
                <span className="hb-line" />
                <span className="hb-line" />
                <span className="hb-line" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-ink text-cream"
          >
            <div className="relative mx-auto flex h-full max-w-[1800px] flex-col justify-between px-6 pb-12 pt-32 md:px-10">
              <nav>
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.16, 0.84, 0.24, 1] }}
                    className="overflow-hidden border-b border-cream/15"
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between py-5 transition-colors hover:text-gold"
                      activeProps={{ className: "text-gold" }}
                      activeOptions={{ exact: l.to === "/" }}
                    >
                      <span className="flex items-baseline gap-6">
                        <span className="text-[10px] tracking-[0.4em] text-cream/40">{l.n}</span>
                        <span className="font-display text-5xl tracking-tight md:text-7xl">{l.label}</span>
                      </span>
                      <span className="hidden text-xs uppercase tracking-[0.3em] text-cream/40 transition-transform group-hover:translate-x-2 md:inline">→</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="grid gap-6 text-xs uppercase tracking-[0.2em] text-cream/55 md:grid-cols-3"
              >
                <p>42 Cobalt Lane<br />Shoreditch, London E1</p>
                <p>Tue – Sun · 12:00 – late<br />Mon · closed</p>
                <p>
                  <a href="tel:+442079460188" className="hover:text-cream">020 7946 0188</a><br />
                  <a href="mailto:hola@barestilo.london" className="hover:text-cream">hola@barestilo.london</a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
