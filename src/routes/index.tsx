import { createFileRoute, Link } from "@tanstack/react-router";
import { useScroll, useTransform, motion, useSpring } from "motion/react";
import { useRef } from "react";
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
import { Leaves } from "@/components/site/Leaves";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bar Estilo — Spanish kitchen, Shoreditch" },
      {
        name: "description",
        content:
          "Wood-fired tapas, natural wine and late tables in Shoreditch. Reserve a table at Bar Estilo.",
      },
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
      <Manifesto />
      <ZoomThrough />
      <StickySplit />
      <SignatureDishes />
      <PressMarquee />
      <GalleryWithFAQ />
      <Reviews />
      <InstagramGrid />
      <ReserveCTA />
    </>
  );
}

/* -------------------------------------------------- HERO */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const words = ["Bar", "Estilo"];
  return (
    <section
      ref={ref}
      className="grain relative h-[105vh] overflow-hidden bg-ink text-cream"
    >
      {/* layer 1: ken-burns image */}
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <img
          src={heroInterior}
          alt="Candlelit interior of Bar Estilo"
          className="h-full w-full animate-slowzoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.10_0.04_30/0.7))]" />
      </motion.div>

      {/* layer 2: floating tapas plate (parallax mid) */}
      <motion.div
        style={{ y: yMid }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 0.84, 0.24, 1] }}
        className="absolute right-[6%] top-[14%] hidden h-72 w-72 overflow-hidden rounded-full shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-cream/10 md:block lg:h-96 lg:w-96"
      >
        <img src={heroTapas} alt="" className="h-full w-full animate-slowzoom object-cover" />
      </motion.div>

      {/* layer 3: sage leaves */}
      <Leaves
        variant="branch"
        className="pointer-events-none absolute left-[-4%] top-[18%] hidden h-72 w-72 text-sage/40 md:block lg:h-[28rem] lg:w-[28rem]"
      />
      <Leaves
        variant="fern"
        className="pointer-events-none absolute right-[-2%] bottom-[8%] hidden h-72 w-72 text-sage/30 md:block"
      />

      {/* text */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 md:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-10 text-[11px] uppercase tracking-[0.5em] text-gold/90"
        >
          Shoreditch · est. 2018
        </motion.p>

        <h1 className="font-display text-[clamp(5rem,16vw,15rem)] leading-[0.82] tracking-[-0.04em]">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.4,
                  delay: 0.4 + i * 0.18,
                  ease: [0.16, 0.84, 0.24, 1],
                }}
                className={`inline-block ${i === 1 ? "italic text-gold pl-[0.2em]" : ""}`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="mt-12 flex flex-wrap items-end justify-between gap-8"
        >
          <p className="max-w-md text-base leading-relaxed text-cream/75">
            A candlelit Spanish kitchen — fire, salt and slow afternoons,
            off Cobalt Lane.
          </p>
          <Link
            to="/visit"
            className="group inline-flex items-center gap-4 rounded-full border border-cream/40 px-8 py-4 text-[11px] uppercase tracking-[0.3em] transition-all hover:border-gold hover:bg-gold hover:text-ink"
          >
            Reserve a table
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-cream/50"
      >
        <span className="inline-block animate-bounce">↓</span> scroll
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------- MARQUEE */
function Marquee() {
  const items = ["Wood-fired", "★", "Natural wine", "★", "Late tables", "★", "Whole turbot", "★", "Jamón ibérico", "★", "Open kitchen", "★"];
  const row = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-cream py-6">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-3xl italic text-ink/80 md:text-5xl">
        {row.map((t, i) => (<span key={i}>{t}</span>))}
      </div>
    </div>
  );
}

/* -------------------------------------------------- MANIFESTO (color-shift, FIXED) */
function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  // Use a tall section with a sticky inner — that's the proper way to
  // get a "slow" scroll-linked color shift.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.3 });

  const lines = [
    "We started Bar Estilo with a single thought —",
    "that food should taste of where it comes from,",
    "and of the hands that touched it last.",
    "Our kitchen runs on fire, citrus, and patience.",
    "Everything else is just decoration.",
  ];

  return (
    <section ref={ref} className="relative bg-ink text-cream" style={{ height: `${lines.length * 80}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Leaves
          variant="sprig"
          className="pointer-events-none absolute left-[6%] top-1/2 hidden h-80 w-80 -translate-y-1/2 text-sage/25 md:block"
        />
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="mb-12 text-[11px] uppercase tracking-[0.5em] text-gold">Manifesto</p>
          <div className="space-y-7">
            {lines.map((t, i) => (
              <ManifestoLine
                key={i}
                text={t}
                progress={smooth}
                start={i / lines.length}
                end={(i + 1) / lines.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function ManifestoLine({
  text, progress, start, end,
}: { text: string; progress: ReturnType<typeof useSpring>; start: number; end: number }) {
  const color = useTransform(
    progress,
    [Math.max(0, start - 0.05), (start + end) / 2, Math.min(1, end + 0.05)],
    ["oklch(0.97 0.012 75 / 0.18)", "oklch(0.62 0.18 30)", "oklch(0.97 0.012 75)"],
  );
  return (
    <motion.p style={{ color }} className="font-display text-3xl leading-tight md:text-5xl">
      {text}
    </motion.p>
  );
}

/* -------------------------------------------------- ZOOM THROUGH (redesigned) */
function ZoomThrough() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 4.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [1, 1, 0]);
  const subOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={ref} className="grain relative h-[260vh] bg-deep-red text-cream">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.img
          src={interiorWide}
          alt=""
          style={{ y: yImg }}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-red/70 via-transparent to-deep-red" />

        <motion.p
          style={{ opacity: subOpacity }}
          className="absolute top-[16vh] text-[11px] uppercase tracking-[0.5em] text-cream/60"
        >
          A way of doing things
        </motion.p>

        <motion.h2
          style={{ scale, opacity }}
          className="font-display text-[22vw] italic leading-none tracking-tight text-gold drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          estilo
        </motion.h2>

        <motion.p
          style={{ opacity: subOpacity }}
          className="absolute bottom-[16vh] max-w-md px-6 text-center text-base leading-relaxed text-cream/70"
        >
          es · ti · lo — <span className="italic">doing the small things slowly, on purpose.</span>
        </motion.p>
      </div>
    </section>
  );
}

/* -------------------------------------------------- STICKY SPLIT */
function StickySplit() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 md:grid-cols-2">
        <div className="relative h-[80vh] md:h-auto">
          <div className="sticky top-0 h-screen overflow-hidden">
            <img src={barShelf} alt="Back bar with sherry bottles" className="h-full w-full object-cover" />
            <div className="grain absolute inset-0" />
          </div>
        </div>
        <div className="relative px-6 py-24 md:px-16 md:py-40">
          <Leaves
            variant="branch"
            className="pointer-events-none absolute right-0 top-10 hidden h-64 w-64 text-sage/30 md:block"
          />
          <p className="text-[11px] uppercase tracking-[0.5em] text-terracotta">A small kitchen</p>
          <h2 className="mt-6 font-display text-5xl leading-tight md:text-7xl">
            Six chefs, one fire, <span className="italic text-terracotta">no shortcuts.</span>
          </h2>
          <div className="mt-12 space-y-8 text-lg leading-relaxed text-ink/75">
            <p>Every plate that leaves our pass has touched the grill, the brine, or a pair of patient hands. Often all three.</p>
            <p>We bake the bread, cure the anchovies, and butcher the whole fish ourselves. The wine list is short on purpose.</p>
            <p>This is the bit of Spain we miss most — the slow, salt-air kind. We try to keep it on the menu.</p>
          </div>
          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-ink hover:text-terracotta"
          >
            Read our story <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- SIGNATURE DISHES */
function SignatureDishes() {
  const dishes = [
    { img: dishPaella, name: "Paella Valenciana", note: "Bomba rice, saffron, rabbit, snails — for two." },
    { img: dishJamon, name: "Jamón Ibérico", note: "5J, sliced to order, on warm pan de cristal." },
    { img: dishOctopus, name: "Pulpo a la Brasa", note: "Charred Galician octopus, smoked paprika oil." },
    { img: dishPadron, name: "Padrón Peppers", note: "Blistered, flaked sea salt, lemon." },
  ];
  return (
    <section className="relative bg-cream py-32">
      <Leaves
        variant="fern"
        className="pointer-events-none absolute left-4 top-20 hidden h-72 w-72 text-sage/40 md:block"
      />
      <div className="mx-auto max-w-[1600px] px-6">
        <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.5em] text-terracotta">From the kitchen</p>
            <h2 className="mt-6 max-w-xl font-display text-5xl leading-[1.05] md:text-7xl">
              A handful of things we'd be <span className="italic">sad to take off.</span>
            </h2>
          </div>
          <Link to="/menu" className="rounded-full border border-ink px-6 py-3 text-[11px] uppercase tracking-[0.3em] hover:bg-ink hover:text-cream">
            See full menu
          </Link>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {dishes.map((d, i) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: i * 0.06, ease: [0.16, 0.84, 0.24, 1] }}
              className={`group ${i % 2 === 1 ? "md:mt-24" : ""}`}
            >
              <div className="grain relative aspect-[4/5] overflow-hidden bg-ink/5">
                <img src={d.img} alt={d.name} className="h-full w-full object-cover transition-transform duration-[1.6s] group-hover:scale-105" />
              </div>
              <div className="mt-6 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl">{d.name}</h3>
                <span className="font-display italic text-terracotta">0{i + 1}</span>
              </div>
              <p className="mt-2 text-sm text-ink/60">{d.note}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- PRESS MARQUEE */
function PressMarquee() {
  const quotes = [
    "Time Out · ★★★★★",
    "“the kind of place you cancel plans for” — Eater",
    "Observer Food Monthly · Best New Opening",
    "“fire-charred brilliance” — FT Weekend",
    "Guardian · 2024 best tapas in London",
    "“a love letter to Andalucía” — Condé Nast",
  ];
  const row = [...quotes, ...quotes];
  return (
    <div className="overflow-hidden border-y border-cream/10 bg-deep-red py-5 text-cream">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-sm uppercase tracking-[0.3em] text-cream/70">
        {row.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

/* -------------------------------------------------- GALLERY w/ overlapping FAQ */
function GalleryWithFAQ() {
  const items = [
    { q: "Do you take walk-ins?", a: "Half of every service is held back for walk-ins — the bar is first-come, first-served from 5pm." },
    { q: "Can you cater for dietary requirements?", a: "Yes. The menu is clearly marked for vegan, vegetarian and gluten-free options. Tell us in advance for anything else." },
    { q: "How big is your largest table?", a: "Our private corner seats up to 14. For larger parties, get in touch about a full buy-out of the room." },
    { q: "Is the restaurant accessible?", a: "The dining room is step-free from the street. Accessible WC available on the ground floor." },
    { q: "What's your cancellation policy?", a: "Cancellations are free up to 24 hours before. After that we hold a £15 per head no-show fee." },
  ];
  return (
    <section className="relative bg-cream">
      <div className="relative overflow-hidden">
        <img src={interiorWide} alt="Wide view of Bar Estilo's main dining room" className="h-[85vh] w-full object-cover" />
        <div className="grain absolute inset-0" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-8 md:p-20">
          <div className="max-w-xl text-cream">
            <p className="text-[11px] uppercase tracking-[0.5em] text-gold">The room</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
              Forty seats, one long bar, and a fire that never quite goes out.
            </h2>
          </div>
        </div>
      </div>

      {/* Overlapping FAQ card */}
      <div className="relative z-10 mx-auto -mt-32 max-w-5xl px-6 md:-mt-48">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 0.84, 0.24, 1] }}
          className="relative bg-cream p-8 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.4)] md:p-16"
        >
          <Leaves
            variant="sprig"
            className="pointer-events-none absolute -right-12 -top-12 hidden h-48 w-48 text-sage/50 md:block"
          />
          <p className="text-[11px] uppercase tracking-[0.5em] text-terracotta">FAQ</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">Good to know.</h2>
          <div className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
            {items.map((it, i) => <FAQItem key={i} {...it} />)}
          </div>
        </motion.div>
      </div>
      <div className="h-24 md:h-32" />
    </section>
  );
}
function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group py-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
        <span className="font-display text-2xl md:text-3xl">{q}</span>
        <span className="text-3xl text-terracotta transition-transform group-open:rotate-45">+</span>
      </summary>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70">{a}</p>
    </details>
  );
}

/* -------------------------------------------------- REVIEWS */
function Reviews() {
  const reviews = [
    { author: "Helena R.", text: "The pulpo. The candles. The hum of the bar at 9pm. Already booked again.", source: "Google" },
    { author: "Tomás V.", text: "Best paella outside Valencia, said the Valencian at the next table.", source: "Google" },
    { author: "Ada M.", text: "Quietly the most beautiful room in Shoreditch right now.", source: "Resy" },
    { author: "Dan O.", text: "Service knew the list back-to-front. Felt looked after, not fussed over.", source: "OpenTable" },
  ];
  return (
    <section className="bg-ink py-28 text-cream">
      <div className="mx-auto max-w-[1600px] px-6">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.5em] text-gold">Words from the room</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">4.9 ★ — and counting.</h2>
          </div>
          <span className="hidden text-xs uppercase tracking-[0.3em] text-cream/40 md:inline">drag →</span>
        </div>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6">
          {reviews.map((r, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="grain relative w-[85%] flex-shrink-0 snap-start border border-cream/15 bg-[oklch(0.18_0.02_30)] p-10 md:w-[440px]"
            >
              <div className="text-gold">★ ★ ★ ★ ★</div>
              <p className="mt-6 font-display text-xl italic leading-relaxed">"{r.text}"</p>
              <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-cream/50">
                <span>{r.author}</span>
                <span>{r.source}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- INSTAGRAM GRID (mock) */
function InstagramGrid() {
  const grid = [dishOctopus, privateDining, dishPaella, dishSangria, heroTapas, barShelf];
  return (
    <section className="bg-cream py-28">
      <div className="mx-auto max-w-[1600px] px-6">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.5em] text-terracotta">@barestilo</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">Latest from the bar.</h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[11px] uppercase tracking-[0.3em] hover:text-terracotta"
          >
            Follow →
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
          {grid.map((src, i) => (
            <motion.a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="grain group relative block aspect-square overflow-hidden bg-ink/5"
            >
              <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-xs uppercase tracking-[0.3em] text-cream">View</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- RESERVE CTA */
function ReserveCTA() {
  return (
    <section className="relative overflow-hidden bg-deep-red text-cream">
      <Leaves variant="branch" className="pointer-events-none absolute -left-12 top-12 hidden h-80 w-80 text-sage/30 md:block" />
      <Leaves variant="fern" className="pointer-events-none absolute -right-12 bottom-0 hidden h-80 w-80 text-sage/25 md:block" />
      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-10 px-6 py-32 md:flex-row md:items-end">
        <h2 className="max-w-2xl font-display text-5xl leading-[1.05] md:text-7xl">
          Come and eat with us — <span className="italic text-gold">we'll save you a candle.</span>
        </h2>
        <Link to="/visit" className="group inline-flex items-center gap-4 rounded-full bg-gold px-10 py-5 text-[11px] uppercase tracking-[0.3em] text-ink transition hover:bg-cream">
          Book a table <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}