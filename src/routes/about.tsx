import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import barShelf from "@/assets/be/bar-shelf.jpg";
import privateDining from "@/assets/be/private-dining.jpg";
import textureTiles from "@/assets/be/texture-tiles.jpg";
import heroInterior from "@/assets/be/hero-interior.jpg";
import interiorWide from "@/assets/be/interior-wide.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Studio — Bar Estilo" },
      { name: "description", content: "How Bar Estilo came to be — a small Spanish kitchen in Shoreditch." },
      { property: "og:title", content: "Studio — Bar Estilo" },
      { property: "og:image", content: barShelf },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Hero />
      <Intro />
      <Story />
      <TileQuote />
      <PrivateRoom />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  return (
    <section ref={ref} className="relative h-[92svh] overflow-hidden bg-ink text-cream">
      <motion.img style={{ y }} src={heroInterior} alt="" className="absolute inset-0 h-full w-full animate-slowzoom object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink" />
      <div className="relative mx-auto flex h-full max-w-[1800px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">— Studio</p>
        <h1 className="mt-6 max-w-6xl font-display text-[clamp(3rem,10vw,11rem)] leading-[0.88] tracking-tight">
          A small kitchen that <span className="italic text-gold">moves slowly,</span> by design.
        </h1>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-cream py-28 md:py-40">
      <div className="mx-auto grid max-w-[1800px] gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="text-[10px] uppercase tracking-[0.4em] text-terracotta">— Practice</p>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] md:text-6xl">
            We opened in 2018 with eight tables and a borrowed grill.
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 space-y-6 text-lg leading-relaxed text-ink/75">
          <p>Bar Estilo started as a one-menu Sunday pop-up between a borrowed garden and a friend's kitchen. Paella, four tapas, and a magnum of something good.</p>
          <p>Seven years on the room is bigger, the team is six, and the menu is still short. The pace is on purpose: nothing leaves the pass that wasn't made by hand the same day.</p>
          <p>It's a Spanish kitchen, but really it's a way of working — slowly, by hand, and with the door left open.</p>
        </div>
      </div>
    </section>
  );
}

function Story() {
  const rows = [
    { y: "2017", t: "Sundays in a borrowed kitchen.", b: "A one-menu pop-up. Paella, four tapas, a magnum of red." },
    { y: "2018", t: "Cobalt Lane.", b: "We took the lease on a former tile-shop with eight tables and a chimney we built into a wood-fire." },
    { y: "2020", t: "Closed, then re-opened.", b: "Like everyone, we shut. We came back smaller, slower, and with a chalkboard for the first time." },
    { y: "2024", t: "A second fire.", b: "We added the back room, the long bar, and another set of hands on the grill. The menu, mostly, stayed put." },
  ];
  return (
    <section className="bg-bone">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 md:grid-cols-2">
        <div className="relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            <img src={barShelf} alt="Bottles on the back-bar shelf" className="h-full w-full object-cover" />
            <div className="grain absolute inset-0" />
          </div>
        </div>
        <div className="px-6 py-28 md:px-16 md:py-44">
          <p className="text-[10px] uppercase tracking-[0.4em] text-terracotta">— Chapters</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">A short timeline.</h2>
          <div className="mt-16 space-y-14">
            {rows.map((row, i) => (
              <motion.div
                key={row.y}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.04 }}
                className="border-t border-ink/15 pt-8"
              >
                <div className="flex items-baseline gap-6">
                  <p className="font-display text-xl italic text-terracotta">{row.y}</p>
                  <h3 className="font-display text-3xl md:text-4xl">{row.t}</h3>
                </div>
                <p className="mt-4 max-w-md text-ink/70">{row.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TileQuote() {
  return (
    <section className="relative overflow-hidden">
      <img src={textureTiles} alt="" className="h-[70vh] w-full object-cover" />
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center bg-ink/55 px-6 text-center text-cream">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-5xl font-display text-3xl italic leading-tight md:text-6xl"
        >
          "Estilo" — <span className="text-gold">n.</span> doing the small things slowly, on purpose.
        </motion.h2>
      </div>
    </section>
  );
}

function PrivateRoom() {
  return (
    <section className="bg-cream py-28 md:py-36">
      <div className="mx-auto grid max-w-[1800px] gap-16 px-6 md:grid-cols-2 md:items-center md:px-10">
        <div className="grain relative aspect-[4/5] overflow-hidden">
          <img src={privateDining} alt="The corner room" className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-terracotta">— Private dining</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">The corner room.</h2>
          <p className="mt-6 max-w-md text-lg text-ink/75">
            A semi-private nook for up to 14, with its own bar service and a dedicated chef. Set menus from £55 a head, full buy-outs available Mondays.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a href="mailto:hola@barestilo.london" className="border-b border-ink pb-1 text-[11px] uppercase tracking-[0.3em] hover:text-terracotta hover:border-terracotta">
              Enquire by email →
            </a>
            <Link to="/visit" className="text-[11px] uppercase tracking-[0.3em] text-ink/60 hover:text-ink">
              Or book a regular table
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
