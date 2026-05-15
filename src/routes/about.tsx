import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import barShelf from "@/assets/be/bar-shelf.jpg";
import privateDining from "@/assets/be/private-dining.jpg";
import textureTiles from "@/assets/be/texture-tiles.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Bar Estilo" },
      {
        name: "description",
        content:
          "How Bar Estilo came to be — a small Spanish kitchen in Shoreditch built around fire, family and Iberian wine.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-ink pt-40 pb-24 text-cream">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Our story</p>
          <h1 className="mt-6 font-display text-6xl leading-[0.95] md:text-8xl">
            We opened in <span className="italic text-gold">2018</span> with eight
            tables and a borrowed grill.
          </h1>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2">
          <motion.img
            src={barShelf}
            alt="Bottles of sherry and Iberian wine on a back-bar shelf"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 0.84, 0.24, 1] }}
            className="aspect-[3/4] w-full object-cover"
          />
          <div className="space-y-8 text-lg leading-relaxed text-ink/80">
            <p>
              Bar Estilo started as a Sunday-only pop-up in a borrowed pub kitchen.
              We cooked one menu — paella, a few tapas, a magnum of red — and kept
              the lights low.
            </p>
            <p>
              Six years later we have our own room on Cobalt Lane, a wood-fire we
              built ourselves, and a menu that still feels like Sunday lunch.
            </p>
            <p>
              We work with three farms in Andalucía, a fishing co-op in Newlyn,
              and a baker around the corner. Everything else is on the chalkboard.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img
          src={textureTiles}
          alt="Hand-painted Andalusian tiles in deep blue and ochre"
          className="h-[60vh] w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-ink/40 px-6 text-center text-cream">
          <h2 className="max-w-3xl font-display text-4xl italic md:text-6xl">
            "Estilo" — n. doing the small things slowly, on purpose.
          </h2>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-terracotta">
              Private dining
            </p>
            <h2 className="mt-4 font-display text-5xl">The corner room.</h2>
            <p className="mt-6 text-ink/70">
              A semi-private nook for up to 14, with its own bar service and a
              dedicated chef. Set menus from £55 a head, full buy-outs available
              Mondays.
            </p>
            <a
              href="mailto:hola@barestilo.london"
              className="mt-8 inline-block rounded-full border border-ink px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ink hover:text-cream"
            >
              Enquire by email
            </a>
          </div>
          <img
            src={privateDining}
            alt="The private dining corner with a long oak table and warm pendants"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>
    </>
  );
}
