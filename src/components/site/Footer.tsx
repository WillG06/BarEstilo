import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-4xl">
            Bar <span className="italic text-gold">Estilo</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-cream/60">
            A neighbourhood Spanish kitchen — fire, salt, and slow afternoons.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-cream/50">Visit</h4>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            42 Cobalt Lane<br />Shoreditch, London E1<br />020 7946 0188
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-cream/50">Hours</h4>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            Tue – Thu · 17:00 – 23:00<br />
            Fri – Sat · 12:00 – late<br />
            Sun · 12:00 – 21:00
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-cream/40 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Bar Estilo. All rights reserved.</span>
          <div className="flex gap-5">
            <Link to="/visit">Reserve</Link>
            <a href="mailto:hola@barestilo.london">hola@barestilo.london</a>
          </div>
        </div>
      </div>
    </footer>
  );
}