import { createFileRoute, Link } from "@tanstack/react-router";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";
import heroInterior from "@/assets/be/hero-interior.jpg";
import heroTapas from "@/assets/be/hero-tapas.jpg";
import dishPaella from "@/assets/be/dish-paella.jpg";
import dishJamon from "@/assets/be/dish-jamon.jpg";
import dishOctopus from "@/assets/be/dish-octopus.jpg";
import dishPadron from "@/assets/be/dish-padron.jpg";
import interiorWide from "@/assets/be/interior-wide.jpg";

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
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ColorShiftSection />
      <ZoomThroughHeader />
      <SignatureDishes />
      <GalleryStrip />
      <FAQs />
      <ReserveCTA />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100vh] overflow-hidden bg-ink text-cream">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroInterior}
          alt="Candlelit interior of Bar Estilo with terracotta walls and a wood-fired open kitchen"
          className="h-full w-full animate-slowzoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/90" />
      </motion.div>
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24"
      >
        <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">
          Shoreditch · est. 2018
        </p>
        <h1 className="font-display text-[14vw] leading-[0.85] tracking-tight md:text-[10vw]">
          Bar
          <br />
          <span className="italic text-gold">Estilo</span>
        </h1>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-md text-base leading-relaxed text-cream/80">
            A candlelit Spanish kitchen — fire, salt and slow afternoons, off
            Cobalt Lane.
          </p>
          <Link
            to="/visit"
            className="rounded-full bg-cream px-8 py-4 text-xs uppercase tracking-[0.25em] text-ink transition hover:bg-gold"
          >
            Reserve a table
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Wood-fired",
    "★",
    "Natural wine",
    "★",
    "Late tables",
    "★",
    "Whole turbot",
    "★",
    "Jamón ibérico",
    "★",
    "Open kitchen",
    "★",
  ];
  const row = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-cream py-6">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-3xl italic text-ink/80 md:text-5xl">
        {row.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function ColorShiftSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // slow scroll feel — full color reveal takes a long scroll distance
    offset: ["start 90%", "end 10%"],
  });

  const paragraphs = [
    "We started Bar Estilo with a single thought —",
    "that food should taste of where it comes from,",
    "and of the hands that touched it last.",
    "Our kitchen runs on fire, citrus, and patience.",
    "Everything else is just decoration.",
  ];

  return (
    <section
      ref={ref}
      className="relative bg-ink py-[40vh] text-cream"
    >
      <div className="mx-auto max-w-4xl px-6">
        <p className="mb-16 text-xs uppercase tracking-[0.4em] text-gold">
          Manifesto
        </p>
        <div className="space-y-10">
          {paragraphs.map((line, i) => (
            <ColorLine
              key={i}
              text={line}
              progress={scrollYProgress}
              start={i / paragraphs.length}
              end={(i + 1) / paragraphs.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ColorLine({
  text,
  progress,
  start,
  end,
}: {
  text: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  // interpolate from cream/30 → terracotta → bright cream
  const color = useTransform(
    progress,
    [start, (start + end) / 2, end],
    [
      "oklch(0.97 0.012 75 / 0.25)",
      "oklch(0.55 0.15 30)",
      "oklch(0.97 0.012 75)",
    ],
  );
  return (
    <motion.p
      style={{ color }}
      className="font-display text-3xl leading-tight md:text-5xl"
    >
      {text}
    </motion.p>
  );
}

function ZoomThroughHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-deep-red text-cream">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.h2
          style={{ scale, opacity }}
          className="font-display text-[18vw] italic leading-none tracking-tight text-gold"
        >
          estilo
        </motion.h2>
      </div>
    </section>
  );
}

function SignatureDishes() {
  const dishes = [
    {
      img: dishPaella,
      name: "Paella Valenciana",
      note: "Bomba rice, saffron, rabbit, snails — for two.",
    },
    {
      img: dishJamon,
      name: "Jamón Ibérico",
      note: "5J, sliced to order, on warm pan de cristal.",
    },
    {
      img: dishOctopus,
      name: "Pulpo a la Brasa",
      note: "Charred Galician octopus, smoked paprika oil.",
    },
    {
      img: dishPadron,
      name: "Padrón Peppers",
      note: "Blistered, flaked sea salt, lemon.",
    },
  ];
  return (
    <section className="bg-cream py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-terracotta">
              From the kitchen
            </p>
            <h2 className="mt-4 max-w-xl font-display text-5xl md:text-6xl">
              A handful of things we'd be sad to take off the menu.
            </h2>
          </div>
          <Link
            to="/menu"
            className="rounded-full border border-ink px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ink hover:text-cream"
          >
            See full menu
          </Link>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {dishes.map((d, i) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 0.84, 0.24, 1] }}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden bg-ink/5">
                <img
                  src={d.img}
                  alt={d.name}
                  className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl">{d.name}</h3>
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

function GalleryStrip() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={interiorWide}
        alt="Wide view of Bar Estilo's main dining room with copper light"
        className="h-[80vh] w-full object-cover"
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 to-transparent p-10 md:p-20">
        <div className="max-w-xl text-cream">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">The room</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">
            Forty seats, one long bar, and a fire that never quite goes out.
          </h2>
        </div>
      </div>
    </section>
  );
}

function FAQs() {
  const items = [
    {
      q: "Do you take walk-ins?",
      a: "Half of every service is held back for walk-ins — the bar is first-come, first-served from 5pm.",
    },
    {
      q: "Can you cater for dietary requirements?",
      a: "Yes. The menu is clearly marked for vegan, vegetarian and gluten-free options. Tell us in advance for anything else.",
    },
    {
      q: "How big is your largest table?",
      a: "Our private corner seats up to 14. For larger parties, get in touch about a full buy-out of the room.",
    },
    {
      q: "Is the restaurant accessible?",
      a: "The dining room is step-free from the street. Accessible WC available on the ground floor.",
    },
    {
      q: "What's your cancellation policy?",
      a: "Cancellations are free up to 24 hours before. After that we hold a £15 per head no-show fee.",
    },
  ];
  return (
    <section className="bg-cream py-32">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs uppercase tracking-[0.4em] text-terracotta">FAQ</p>
        <h2 className="mt-4 font-display text-5xl md:text-6xl">Good to know.</h2>
        <div className="mt-16 divide-y divide-ink/15 border-y border-ink/15">
          {items.map((it, i) => (
            <FAQItem key={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group py-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
        <span className="font-display text-2xl md:text-3xl">{q}</span>
        <span className="text-3xl text-terracotta transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70">{a}</p>
    </details>
  );
}

function ReserveCTA() {
  return (
    <section className="bg-deep-red text-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-6 py-32 md:flex-row md:items-end">
        <h2 className="max-w-2xl font-display text-5xl md:text-7xl">
          Come and eat with us — we'll save you a candle.
        </h2>
        <Link
          to="/visit"
          className="rounded-full bg-gold px-10 py-5 text-xs uppercase tracking-[0.25em] text-ink transition hover:bg-cream"
        >
          Book a table →
        </Link>
      </div>
    </section>
  );
}

void heroTapas;
