import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1800px] px-6 pt-24 pb-10 md:px-10">
        <div className="grid gap-12 border-b border-cream/15 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-display text-[clamp(3rem,6vw,6rem)] leading-[0.95]">
              Bar<span className="italic text-gold"> Estilo</span>
            </div>
            <p className="mt-6 max-w-sm text-sm text-cream/60">
              A neighbourhood Spanish kitchen — fire, salt, and slow afternoons. Cobalt Lane, Shoreditch.
            </p>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-cream/40">Visit</h4>
            <p className="mt-5 text-sm leading-relaxed text-cream/80">
              42 Cobalt Lane<br />Shoreditch, London E1
            </p>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-cream/40">Hours</h4>
            <p className="mt-5 text-sm leading-relaxed text-cream/80">
              Tue–Thu · 17–23<br />Fri–Sat · 12–late<br />Sun · 12–21
            </p>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-cream/40">Get in touch</h4>
            <p className="mt-5 text-sm leading-relaxed text-cream/80">
              <a href="tel:+442079460188" className="hover:text-gold">020 7946 0188</a><br />
              <a href="mailto:hola@barestilo.london" className="hover:text-gold">hola@barestilo.london</a>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-8 text-[11px] uppercase tracking-[0.25em] text-cream/40 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Bar Estilo</span>
          <div className="flex gap-6">
            <Link to="/visit" className="hover:text-cream">Reserve</Link>
            <Link to="/menu" className="hover:text-cream">Menu</Link>
            <Link to="/about" className="hover:text-cream">Studio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
