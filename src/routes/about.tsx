import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import barShelf from "@/assets/be/bar-shelf.jpg";
import privateDining from "@/assets/be/private-dining.jpg";
import textureTiles from "@/assets/be/texture-tiles.jpg";
import heroInterior from "@/assets/be/hero-interior.jpg";
import { Leaves } from "@/components/site/Leaves";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Bar Estilo" },
      { name: "description", content: "How Bar Estilo came to be — a small Spanish kitchen in Shoreditch." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <TileQuote />
      <Timeline />
      <PrivateDining />
    </>
  );
}

function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="grain relative h-[90vh] overflow-hidden bg-ink text-cream">
      <motion.img style={{ y }} src={heroInterior} alt="" className="absolute inset-0 h-full w-full animate-slowzoom object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink" />
      <Leaves variant="fern" className="pointer-events-none absolute -right-8 top-40 hidden h-96 w-96 text-sage/30 md:block" />
      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-24">
        <p className="text-[11px] uppercase tracking-[0.5em] text-gold">Our story</p>
        <h1 className="mt-6 max-w-5xl font-display text-[clamp(3rem,9vw,9rem)] leading-[0.9] tracking-tight">
          We opened in <span className="italic text-gold">2018</span> with eight tables and a borrowed grill.
        </h1>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 md:grid-cols-2">
        <div className="relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            <img src={barShelf} alt="Bottles on the back-bar shelf" className="h-full w-full object-cover" />
            <div className="grain absolute inset-0" />
          </div>
        </div>
        <div className="space-y-20 px-6 py-28 md:px-16 md:py-40">
          {[
            { y: "2017", t: "Sundays in a borrowed kitchen.", b: "Bar Estilo started as a one-menu pop-up: paella, four tapas, a magnum of red." },
            { y: "2018", t: "Cobalt Lane.", b: "We took the lease on a former tile-shop with eight tables and a chimney we built into a wood-fire." },
            { y: "2020", t: "Closed, then re-opened.", b: "Like everyone, we shut. We came back smaller, slower, and with a chalkboard for the first time." },
            { y: "2024", t: "A second fire.", b: "We added the back room, the long bar, and another set of hands on the grill. The menu, mostly, stayed put." },
          ].map((row, i) => (
            <motion.div
              key={row.y}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
            >
              <p className="font-display text-2xl italic text-gold">{row.y}</p>
              <h3 className="mt-3 font-display text-4xl md:text-5xl">{row.t}</h3>
              <p className="mt-4 max-w-md text-lg text-ink/70">{row.b}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TileQuote() {
  return (
    <section className="relative overflow-hidden">
      <img src={textureTiles} alt="Andalusian tiles" className="h-[70vh] w-full object-cover" />
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center bg-ink/50 px-6 text-center text-cream">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-4xl font-display text-4xl italic leading-tight md:text-7xl"
        >
          "Estilo" — <span className="text-gold">n.</span> doing the small things slowly, on purpose.
        </motion.h2>
      </div>
    </section>
  );
}

function Timeline() {
  const rows = [
    { l: "Bread", r: "Baked next door, twice a day." },
    { l: "Pork", r: "Finca Salinas, Andalucía — acorn-fed, slow-cured." },
    { l: "Fish", r: "Newlyn day-boats, on the train by morning." },
    { l: "Wine", r: "Forty bottles, all Iberian, rotated monthly." },
    { l: "Salt", r: "Sea-flake from the Algarve. Mainly for the peppers." },
  ];
  return (
    <section className="bg-ink py-28 text-cream">
      <div className="mx-auto max-w-[1100px] px-6">
        <p className="text-[11px] uppercase tracking-[0.5em] text-gold">Where it all comes from</p>
        <h2 className="mt-4 font-display text-5xl md:text-7xl">Suppliers.</h2>
        <ul className="mt-14 divide-y divide-cream/15 border-y border-cream/15">
          {rows.map((r, i) => (
            <motion.li
              key={r.l}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[160px_1fr] md:items-baseline md:gap-12"
            >
              <span className="font-display text-2xl italic text-gold">{r.l}</span>
              <span className="text-lg text-cream/80">{r.r}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PrivateDining() {
  return (
    <section className="bg-cream py-28">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.5em] text-terracotta">Private dining</p>
          <h2 className="mt-4 font-display text-5xl md:text-7xl">The corner room.</h2>
          <p className="mt-6 max-w-md text-lg text-ink/75">
            A semi-private nook for up to 14, with its own bar service and a dedicated chef. Set menus from £55 a head, full buy-outs available Mondays.
          </p>
          <a
            href="mailto:hola@barestilo.london"
            className="mt-10 inline-block rounded-full border border-ink px-6 py-3 text-[11px] uppercase tracking-[0.3em] hover:bg-ink hover:text-cream"
          >
            Enquire by email
          </a>
          <div className="mt-12">
            <Link to="/visit" className="text-[11px] uppercase tracking-[0.3em] underline">Or book a regular table →</Link>
          </div>
        </div>
        <div className="grain relative aspect-[4/5] overflow-hidden">
          <img src={privateDining} alt="The private dining corner" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}