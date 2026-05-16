import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import dishPaella from "@/assets/be/dish-paella.jpg";
import dishJamon from "@/assets/be/dish-jamon.jpg";
import dishOctopus from "@/assets/be/dish-octopus.jpg";
import dishPadron from "@/assets/be/dish-padron.jpg";
import dishSangria from "@/assets/be/dish-sangria.jpg";
import heroTapas from "@/assets/be/hero-tapas.jpg";
import interiorWide from "@/assets/be/interior-wide.jpg";
import { Leaves } from "@/components/site/Leaves";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Bar Estilo" },
      { name: "description", content: "Wood-fired tapas, paellas, raciones and an all-Iberian wine list." },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

type Tag = "vg" | "v" | "gf";
type Item = { name: string; desc: string; price: string; img?: string; tags?: Tag[]; cat: Cat };
type Cat = "starters" | "fire" | "rice" | "sweet" | "drinks";

const items: Item[] = [
  { name: "Pan de cristal", desc: "Tomato, garlic, Arbequina oil.", price: "5", cat: "starters", tags: ["vg"] },
  { name: "Padrón peppers", desc: "Blistered, sea salt, lemon.", price: "8", cat: "starters", tags: ["vg", "gf"], img: dishPadron },
  { name: "Jamón ibérico 5J", desc: "Hand-sliced, 30g.", price: "16", cat: "starters", tags: ["gf"], img: dishJamon },
  { name: "Boquerones", desc: "Vinegar-cured anchovies, parsley oil.", price: "9", cat: "starters", tags: ["gf"] },
  { name: "Pulpo a la brasa", desc: "Charred octopus, smoked paprika oil.", price: "18", cat: "fire", tags: ["gf"], img: dishOctopus },
  { name: "Whole turbot", desc: "Wood-fired, salsa verde — for two.", price: "62", cat: "fire", tags: ["gf"] },
  { name: "Iberico pluma", desc: "Acorn-fed pork, romesco.", price: "24", cat: "fire", tags: ["gf"] },
  { name: "Aubergine miel", desc: "Charred, rosemary honey, almonds.", price: "12", cat: "fire", tags: ["v", "gf"] },
  { name: "Paella Valenciana", desc: "Bomba, saffron, rabbit, snails — for two.", price: "44", cat: "rice", tags: ["gf"], img: dishPaella },
  { name: "Arroz negro", desc: "Squid ink rice, calamari, alioli.", price: "38", cat: "rice", tags: ["gf"] },
  { name: "Garbanzos & espinacas", desc: "Chickpeas, spinach, cumin.", price: "11", cat: "rice", tags: ["vg", "gf"] },
  { name: "Crema catalana", desc: "Burnt orange, anise.", price: "8", cat: "sweet", tags: ["v", "gf"] },
  { name: "Chocolate & olive oil", desc: "70%, smoked salt, sourdough.", price: "9", cat: "sweet", tags: ["v"] },
  { name: "Casa sangria", desc: "Garnacha, brandy, citrus, soda.", price: "9", cat: "drinks", tags: ["vg", "gf"], img: dishSangria },
  { name: "Vermut de la casa", desc: "House-blended, orange peel, olive.", price: "7", cat: "drinks", tags: ["vg", "gf"] },
];

const cats: { id: "all" | Cat; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "starters", label: "To start" },
  { id: "fire", label: "From the fire" },
  { id: "rice", label: "Rice & beans" },
  { id: "sweet", label: "Sweet" },
  { id: "drinks", label: "Bar" },
];

const diet: { id: "all" | Tag; label: string }[] = [
  { id: "all", label: "All diets" },
  { id: "vg", label: "Vegan" },
  { id: "v", label: "Vegetarian" },
  { id: "gf", label: "Gluten-free" },
];

const tagLabel: Record<Tag, string> = { vg: "VG", v: "V", gf: "GF" };

function MenuPage() {
  const [cat, setCat] = useState<"all" | Cat>("all");
  const [dietary, setDietary] = useState<"all" | Tag>("all");

  const filtered = items.filter(
    (i) =>
      (cat === "all" || i.cat === cat) &&
      (dietary === "all" || i.tags?.includes(dietary)),
  );

  return (
    <>
      {/* hero */}
      <section className="grain relative overflow-hidden bg-ink pt-40 pb-28 text-cream">
        <img src={heroTapas} alt="" className="absolute inset-0 h-full w-full animate-slowzoom object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />
        <Leaves variant="branch" className="pointer-events-none absolute right-0 top-32 hidden h-80 w-80 text-sage/30 md:block" />
        <div className="relative mx-auto max-w-[1600px] px-6">
          <p className="text-[11px] uppercase tracking-[0.5em] text-gold">The menu</p>
          <h1 className="mt-6 font-display text-[clamp(4rem,12vw,11rem)] leading-[0.88] tracking-tight">
            Eat <span className="italic text-gold">slowly.</span>
          </h1>
          <p className="mt-8 max-w-xl text-cream/70">
            Sourced from a tight rotation of Spanish, Portuguese and Cornish suppliers. The menu shifts every few weeks — this is what's on it now.
          </p>
        </div>
      </section>

      {/* signature spotlight */}
      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 0.84, 0.24, 1] }}
            className="grain relative aspect-[4/5] overflow-hidden"
          >
            <img src={dishPaella} alt="Paella Valenciana" className="h-full w-full object-cover" />
          </motion.div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.5em] text-terracotta">Signature · 01</p>
            <h2 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
              Paella <span className="italic">Valenciana.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/75">
              The first dish we ever cooked together, on a borrowed grill in a friend's garden in Albaida. Twenty minutes of staring at the rice, two of attention, then a cold beer. We still cook it the same way.
            </p>
            <div className="mt-8 flex items-center gap-6 text-sm text-ink/60">
              <span>£44 · for two</span>
              <span className="rounded-full border border-terracotta/40 px-3 py-1 text-[10px] tracking-widest text-terracotta">GF</span>
            </div>
          </div>
        </div>
      </section>

      {/* filters */}
      <section className="sticky top-0 z-20 border-y border-ink/10 bg-cream/95 backdrop-blur py-5">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {cats.map((f) => (
              <button
                key={f.id}
                onClick={() => setCat(f.id)}
                className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition ${
                  cat === f.id ? "border-ink bg-ink text-cream" : "border-ink/20 text-ink hover:border-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {diet.map((f) => (
              <button
                key={f.id}
                onClick={() => setDietary(f.id)}
                className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition ${
                  dietary === f.id ? "border-terracotta bg-terracotta text-cream" : "border-ink/20 text-ink hover:border-terracotta"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* grid */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-[1600px] px-6">
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-ink/60">Nothing matches that filter — try widening it.</p>
          ) : (
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((it, i) => (
                <motion.article
                  key={it.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: (i % 6) * 0.04 }}
                  className="group"
                >
                  <div className="grain relative aspect-[4/5] overflow-hidden bg-ink/5">
                    {it.img ? (
                      <img src={it.img} alt={it.name} className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-deep-red/10 to-terracotta/10">
                        <Leaves variant="sprig" className="h-32 w-32 text-sage/60" />
                      </div>
                    )}
                    {it.tags && (
                      <div className="absolute right-3 top-3 flex gap-1">
                        {it.tags.map((t) => (
                          <span key={t} className="rounded-full bg-cream/95 px-2 py-1 text-[9px] font-medium tracking-widest text-terracotta">
                            {tagLabel[t]}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl">{it.name}</h3>
                    <span className="font-display text-lg text-ink/70">£{it.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-ink/60">{it.desc}</p>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-deep-red text-cream">
        <img src={interiorWide} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="relative mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 px-6 py-24 md:flex-row md:items-end">
          <h2 className="max-w-2xl font-display text-4xl md:text-6xl">Hungry yet? Reserve before the room fills.</h2>
          <Link to="/visit" className="rounded-full bg-gold px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-ink hover:bg-cream">
            Book a table
          </Link>
        </div>
      </section>
    </>
  );
}