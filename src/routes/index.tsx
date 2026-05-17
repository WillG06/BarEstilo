import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import heroInterior from "@/assets/be/hero-interior.jpg";
import heroTapas from "@/assets/be/hero-tapas.jpg";
import dishPaella from "@/assets/be/dish-paella.jpg";
import dishJamon from "@/assets/be/dish-jamon.jpg";
import dishOctopus from "@/assets/be/dish-octopus.jpg";
import dishPadron from "@/assets/be/dish-padron.jpg";
import dishSangria from "@/assets/be/dish-sangria.jpg";
import interiorWide from "@/assets/be/interior-wide.jpg";
import barShelf from "@/assets/be/bar-shelf.jpg";
import privateDining from "@/assets/be/private-dining.jpg";
import textureTiles from "@/assets/be/texture-tiles.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bar Estilo — Spanish kitchen, Shoreditch" },
      { name: "description", content: "Wood-fired tapas, natural wine and late tables in Shoreditch." },
      { property: "og:title", content: "Bar Estilo — Spanish kitchen, Shoreditch" },
      { property: "og:image", content: heroInterior },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Disciplines />
      <Manifesto />
      <FloatingFrames />
      <SixChefs />
      <Signatures />
      <HorizontalRoll />
      <Press />
      <Perspectives />
      <GalleryFAQ />
      <ReserveCTA />
    </>
  );
}

/* ───────────────────── HERO ─ rotating scenery */
const HERO_SCENES = [
  { img: heroInterior, t: "01 / The Room", s: "Forty seats, candlelight, the low hum of conversation." },
  { img: heroTapas, t: "02 / The Kitchen", s: "Wood-fired, hand-cured, plated without ceremony." },
  { img: interiorWide, t: "03 / The Bar", s: "Sherries, vermuts, forty bottles — all Iberian." },
  { img: barShelf, t: "04 / The Shelf", s: "Twenty years of bottles, dust included." },
];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % HERO_SCENES.length), 5200);
    return () => clearInterval(id);
  }, []);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.95], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden bg-ink text-cream">
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={i}
            src={HERO_SCENES[i].img}
            alt=""
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.14 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.6, ease: [0.4, 0, 0.2, 1] }, scale: { duration: 6, ease: "linear" } }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/15 to-ink/60" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex h-full max-w-[1800px] flex-col justify-between px-6 pt-32 pb-12 md:px-10 md:pb-16">
        {/* small caption top-left */}
        <div className="flex justify-end pt-4 md:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="max-w-[240px] border-l border-cream/40 pl-4 text-right text-cream/85"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">{HERO_SCENES[i].t}</p>
              <p className="mt-2 font-display text-sm italic">{HERO_SCENES[i].s}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* big title bottom-left */}
        <div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, ease: [0.16, 0.84, 0.24, 1], delay: 0.1 }}
              className="font-display text-[clamp(4.5rem,14vw,15rem)] leading-[0.85] tracking-[-0.03em]"
            >
              Bar <span className="italic text-gold">Estilo</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
          >
            <p className="max-w-md text-sm leading-relaxed text-cream/75 md:text-base">
              A candlelit Spanish kitchen — fire, salt and slow afternoons off Cobalt Lane, Shoreditch.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex gap-1.5">
                {HERO_SCENES.map((_, k) => (
                  <button
                    key={k}
                    aria-label={`Scene ${k + 1}`}
                    onClick={() => setI(k)}
                    className={`h-px w-10 transition-all ${k === i ? "bg-gold" : "bg-cream/30"}`}
                  />
                ))}
              </div>
              <Link
                to="/visit"
                className="group inline-flex items-center gap-3 border-b border-cream pb-1 text-[11px] uppercase tracking-[0.3em] hover:text-gold hover:border-gold"
              >
                Reserve a table
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────────────── MARQUEE */
function Marquee() {
  const items = ["Wood-fired", "·", "Natural wine", "·", "Late tables", "·", "Whole turbot", "·", "Jamón ibérico", "·", "Open kitchen", "·"];
  const row = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-ink/15 bg-bone py-6">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-3xl italic text-ink/80 md:text-5xl">
        {row.map((t, i) => (<span key={i}>{t}</span>))}
      </div>
    </div>
  );
}

/* ───────────────────── DISCIPLINES (HBA-style word list) */
const DISCIPLINES = [
  { k: "fire", title: "Fire", body: "Everything starts at the grill — wood, embers, and an open door to the dining room.", img: dishOctopus },
  { k: "rice", title: "Rice", body: "Bomba from Valencia, slow-toasted, fed with stock for twenty patient minutes.", img: dishPaella },
  { k: "cured", title: "Cured", body: "Jamón 5J, anchovies brined upstairs, butter aged with sherry.", img: dishJamon },
  { k: "vegetable", title: "Vegetable", body: "Padróns blistered hot, aubergine glazed with rosemary honey, almonds toasted on the pass.", img: dishPadron },
  { k: "bar", title: "Bar", body: "Vermut on tap, casa sangria, and a short list of forty Iberian bottles.", img: dishSangria },
];

function Disciplines() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-cream py-28 md:py-40">
      <div className="mx-auto grid max-w-[1800px] gap-16 px-6 md:grid-cols-[1.05fr_1fr] md:px-10">
        <div>
          <p className="mb-10 text-[10px] uppercase tracking-[0.4em] text-ink/45">— What we do</p>
          <ul>
            {DISCIPLINES.map((d, i) => (
              <li key={d.k}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group block w-full text-left"
                >
                  <span
                    className={`block font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight transition-colors duration-500 ${
                      active === i ? "text-ink" : "text-ink/25"
                    }`}
                  >
                    {d.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="sticky top-32">
            <div className="grain relative aspect-[4/5] overflow-hidden bg-ink/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={DISCIPLINES[active].k}
                  src={DISCIPLINES[active].img}
                  alt={DISCIPLINES[active].title}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 0.84, 0.24, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={DISCIPLINES[active].k + "-text"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mt-8 max-w-md"
              >
                <p className="text-[10px] uppercase tracking-[0.4em] text-terracotta">
                  0{active + 1} · {DISCIPLINES[active].title}
                </p>
                <p className="mt-4 text-lg leading-relaxed text-ink/75">{DISCIPLINES[active].body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── MANIFESTO ─ color shift */
function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.3 });
  const lines = [
    "We started Bar Estilo with a single thought —",
    "that food should taste of where it comes from,",
    "and of the hands that touched it last.",
    "Our kitchen runs on fire, citrus, and patience.",
    "Everything else is just decoration.",
  ];
  return (
    <section ref={ref} className="relative bg-ink text-cream" style={{ height: `${lines.length * 90}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="mb-12 text-[10px] uppercase tracking-[0.4em] text-gold">— Manifesto</p>
          <div className="space-y-6">
            {lines.map((t, i) => (
              <Line key={i} text={t} progress={smooth} start={i / lines.length} end={(i + 1) / lines.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Line({ text, progress, start, end }: { text: string; progress: ReturnType<typeof useSpring>; start: number; end: number }) {
  const mid = (start + end) / 2;
  const color = useTransform(
    progress,
    [Math.max(0, start - 0.05), mid, Math.min(1, end + 0.05)],
    ["oklch(0.94 0.012 80 / 0.16)", "oklch(0.68 0.10 70)", "oklch(0.94 0.012 80)"],
  );
  return (
    <motion.p style={{ color }} className="font-display text-3xl leading-tight md:text-5xl">
      {text}
    </motion.p>
  );
}

/* ───────────────────── FLOATING FRAMES (bg image + 2 floating over) */
function FloatingFrames() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["18%", "-12%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["28%", "-22%"]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream pt-32 pb-40">
      <div className="mx-auto max-w-[1800px] px-6 md:px-10">
        <div className="mb-16 flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-terracotta">— A room, three views</p>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02]">
              The space is half of the meal.
            </h2>
          </div>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.img
            style={{ y: yBg }}
            src={interiorWide}
            alt="Bar Estilo dining room"
            className="absolute inset-[-10%] h-[120%] w-[110%] object-cover"
          />
          <div className="grain absolute inset-0" />

          <motion.div
            style={{ y: yA }}
            className="absolute left-[6%] top-[14%] hidden aspect-[3/4] w-[22%] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] md:block"
          >
            <img src={dishPaella} alt="" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
            style={{ y: yB }}
            className="absolute right-[8%] bottom-[10%] hidden aspect-[4/5] w-[24%] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] md:block"
          >
            <img src={dishOctopus} alt="" className="h-full w-full object-cover" />
          </motion.div>
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-ink/40">— The room</p>
            <p className="mt-3 text-ink/80">Forty seats, one long bar, lime-washed walls and a chimney we built into a wood-fire.</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-ink/40">— The pass</p>
            <p className="mt-3 text-ink/80">No service hatch. Plates leave the grill and go straight to the table by hand.</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-ink/40">— The night</p>
            <p className="mt-3 text-ink/80">Candles down low. Records on the deck. A kitchen that doesn't close until the last plate.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── SIX CHEFS, NO SHORTCUTS — redesigned */
function SixChefs() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <img src={textureTiles} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      <div className="relative mx-auto grid max-w-[1800px] gap-16 px-6 py-32 md:grid-cols-12 md:gap-20 md:px-10 md:py-44">
        <div className="md:col-span-7">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">— A small kitchen</p>
          <h2 className="mt-6 font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98]">
            Six chefs, one fire,
            <br />
            <span className="italic text-gold">no shortcuts.</span>
          </h2>
        </div>
        <div className="md:col-span-5">
          <div className="space-y-6 text-base leading-relaxed text-cream/80 md:text-lg">
            <p>Every plate that leaves our pass has touched the grill, the brine, or a pair of patient hands. Often all three.</p>
            <p>We bake the bread, cure the anchovies, and butcher the whole fish ourselves. The wine list is short on purpose.</p>
            <p>This is the bit of Spain we miss most — the slow, salt-air kind. We try to keep it on the menu.</p>
          </div>
          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-3 border-b border-cream/40 pb-1 text-[11px] uppercase tracking-[0.3em] hover:text-gold hover:border-gold"
          >
            Read our story →
          </Link>
        </div>

        <div className="md:col-span-12 mt-6 grid grid-cols-3 gap-4 border-t border-cream/15 pt-10">
          {[
            { n: "06", l: "Chefs at the pass" },
            { n: "40", l: "Iberian bottles" },
            { n: "01", l: "Wood fire" },
          ].map((s) => (
            <div key={s.n}>
              <div className="font-display text-5xl italic text-gold md:text-7xl">{s.n}</div>
              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-cream/55">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── SIGNATURE DISHES — minimal pro carousel */
function Signatures() {
  const dishes = [
    { img: dishPaella, name: "Paella Valenciana", note: "Bomba, saffron, rabbit, snails." },
    { img: dishJamon, name: "Jamón Ibérico 5J", note: "Sliced to order, on pan de cristal." },
    { img: dishOctopus, name: "Pulpo a la Brasa", note: "Charred Galician, paprika oil." },
    { img: dishPadron, name: "Padrón Peppers", note: "Blistered, sea salt, lemon." },
    { img: dishSangria, name: "Casa Sangria", note: "Garnacha, brandy, citrus, soda." },
  ];
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % dishes.length);
  const prev = () => setI((v) => (v - 1 + dishes.length) % dishes.length);

  return (
    <section className="bg-bone py-32">
      <div className="mx-auto max-w-[1800px] px-6 md:px-10">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-terracotta">— From the kitchen</p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02]">
              A handful of things we'd be <span className="italic">sad to take off.</span>
            </h2>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button onClick={prev} aria-label="Previous" className="cursor-hover h-12 w-12 rounded-full border border-ink/30 text-ink/70 hover:border-ink hover:text-ink">←</button>
            <button onClick={next} aria-label="Next" className="cursor-hover h-12 w-12 rounded-full border border-ink/30 text-ink/70 hover:border-ink hover:text-ink">→</button>
          </div>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-[1.1fr_1fr]">
          <div className="grain relative aspect-[4/5] overflow-hidden bg-ink/5 md:aspect-[5/6]">
            <AnimatePresence mode="wait">
              <motion.img
                key={i}
                src={dishes[i].img}
                alt={dishes[i].name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 0.84, 0.24, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>

          <div className="md:pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={i + "-info"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-[10px] uppercase tracking-[0.4em] text-ink/45">
                  {String(i + 1).padStart(2, "0")} / {String(dishes.length).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-5xl leading-tight md:text-6xl">{dishes[i].name}</h3>
                <p className="mt-4 max-w-md text-lg text-ink/70">{dishes[i].note}</p>
              </motion.div>
            </AnimatePresence>

            <ul className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
              {dishes.map((d, k) => (
                <li key={d.name}>
                  <button
                    onClick={() => setI(k)}
                    className={`flex w-full items-center justify-between py-4 text-left text-sm transition-colors ${
                      i === k ? "text-ink" : "text-ink/45 hover:text-ink"
                    }`}
                  >
                    <span className="flex items-center gap-5">
                      <span className="text-[10px] tracking-[0.3em]">0{k + 1}</span>
                      <span className="font-display text-xl italic">{d.name}</span>
                    </span>
                    <span className="text-xs">{i === k ? "●" : "○"}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── HORIZONTAL SCROLL row */
function HorizontalRoll() {
  const imgs = [dishOctopus, interiorWide, dishPaella, barShelf, dishSangria, privateDining, heroTapas, dishJamon];
  return (
    <section className="bg-cream py-28">
      <div className="mx-auto mb-10 flex max-w-[1800px] items-end justify-between gap-6 px-6 md:px-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-terracotta">— A walk-through</p>
          <h2 className="mt-4 font-display text-3xl md:text-5xl">Drag to look around.</h2>
        </div>
        <span className="hidden text-[10px] uppercase tracking-[0.3em] text-ink/40 md:inline">scroll →</span>
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 md:px-10">
        {imgs.map((src, i) => (
          <div
            key={i}
            className="grain relative aspect-[4/5] w-[70vw] flex-shrink-0 snap-start overflow-hidden md:w-[28vw]"
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
            <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.3em] text-cream/85">
              {String(i + 1).padStart(2, "0")} / {String(imgs.length).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────── PRESS strip */
function Press() {
  const quotes = [
    "Time Out · ★★★★★",
    "“the kind of place you cancel plans for” — Eater",
    "Observer Food Monthly · Best New Opening",
    "“fire-charred brilliance” — FT Weekend",
    "Guardian · 2024 best tapas in London",
  ];
  const row = [...quotes, ...quotes];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-bone py-5">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-xs uppercase tracking-[0.35em] text-ink/55">
        {row.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

/* ───────────────────── PERSPECTIVES — minimal carousel */
function Perspectives() {
  const items = [
    { img: dishPaella, t: "On the fire", d: "An afternoon at the grill" },
    { img: interiorWide, t: "Forty seats", d: "Inside the room" },
    { img: barShelf, t: "The back-bar", d: "Notes from the cellar" },
    { img: privateDining, t: "The corner", d: "Our private room" },
  ];
  return (
    <section className="bg-ink py-28 text-cream md:py-40">
      <div className="mx-auto max-w-[1800px] px-6 md:px-10">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80">— Perspectives</p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02]">Stories from the room.</h2>
          </div>
          <Link to="/about" className="hidden border-b border-cream pb-1 text-[11px] uppercase tracking-[0.3em] hover:text-gold hover:border-gold md:inline">
            View all →
          </Link>
        </div>
        <div className="no-scrollbar grid grid-cols-1 gap-6 md:grid-cols-4">
          {items.map((p, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className="group"
            >
              <div className="grain relative aspect-[3/4] overflow-hidden bg-cream/5">
                <img src={p.img} alt="" className="h-full w-full object-cover transition-transform duration-[1.6s] group-hover:scale-105" />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-display text-xl italic">{p.t}</h3>
                <span className="text-[10px] uppercase tracking-[0.3em] text-cream/40">0{i + 1}</span>
              </div>
              <p className="mt-1 text-sm text-cream/55">{p.d}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── GALLERY + OVERLAPPING FAQ
   The FAQ panel now covers the entire image section above it.    */
function GalleryFAQ() {
  const items = [
    { q: "Do you take walk-ins?", a: "Half of every service is held back for walk-ins — the bar is first-come, first-served from 5pm." },
    { q: "Can you cater for dietary requirements?", a: "Yes. The menu is clearly marked for vegan, vegetarian and gluten-free options. Tell us in advance for anything else." },
    { q: "How big is your largest table?", a: "Our private corner seats up to 14. For larger parties, get in touch about a full buy-out of the room." },
    { q: "Is the restaurant accessible?", a: "The dining room is step-free from the street. Accessible WC available on the ground floor." },
    { q: "What's your cancellation policy?", a: "Cancellations are free up to 24 hours before. After that we hold a £15 per head no-show fee." },
  ];
  return (
    <section className="relative bg-cream">
      {/* image section */}
      <div className="relative h-[90vh] overflow-hidden">
        <img src={interiorWide} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="grain absolute inset-0" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-8 md:p-20">
          <div className="max-w-xl text-cream">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">— The room</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] md:text-6xl">
              Forty seats, one long bar, and a fire that never quite goes out.
            </h2>
          </div>
        </div>
      </div>

      {/* Overlapping FAQ — covers the entire image section */}
      <div className="relative z-10 -mt-[85vh] flex min-h-[85vh] items-end pb-20 md:pb-32">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.1, ease: [0.16, 0.84, 0.24, 1] }}
          className="relative mx-auto w-full max-w-[1800px] px-6 md:px-10"
        >
          <div className="ml-auto w-full max-w-3xl bg-cream p-10 shadow-[0_60px_140px_-30px_rgba(0,0,0,0.45)] md:p-16">
            <p className="text-[10px] uppercase tracking-[0.4em] text-terracotta">— FAQ</p>
            <h3 className="mt-4 font-display text-4xl md:text-6xl">Good to know.</h3>
            <div className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
              {items.map((it, i) => (
                <details key={i} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                    <span className="font-display text-xl md:text-2xl">{it.q}</span>
                    <span className="text-2xl text-terracotta transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70 md:text-base">{it.a}</p>
                </details>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────── RESERVE CTA */
function ReserveCTA() {
  return (
    <section className="bg-deep-red text-cream">
      <div className="mx-auto flex max-w-[1800px] flex-col items-start justify-between gap-10 px-6 py-28 md:flex-row md:items-end md:px-10 md:py-40">
        <h2 className="max-w-3xl font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1.02]">
          Come and eat with us —<br /><span className="italic text-gold">we'll save you a candle.</span>
        </h2>
        <Link to="/visit" className="group inline-flex items-center gap-4 border-b border-cream pb-2 text-[11px] uppercase tracking-[0.3em] hover:text-gold hover:border-gold">
          Book a table <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
