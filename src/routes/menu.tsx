import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import interiorWide from "@/assets/be/interior-wide.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "The Menu — Bar Estilo" },
      { name: "description", content: "Wood-fired tapas, paellas, raciones and an all-Iberian wine list." },
      { property: "og:title", content: "The Menu — Bar Estilo" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

type Tag = "vg" | "v" | "gf";
type Item = { name: string; desc: string; price: string; tags?: Tag[]; cat: Cat };
type Cat = "starters" | "fire" | "rice" | "sweet" | "drinks";

const items: Item[] = [
  { name: "Pan de cristal", desc: "Tomato, garlic, Arbequina oil.", price: "5", cat: "starters", tags: ["vg"] },
  { name: "Olives Gordal", desc: "Lemon, fennel, bay.", price: "6", cat: "starters", tags: ["vg", "gf"] },
  { name: "Padrón peppers", desc: "Blistered, sea salt, lemon.", price: "8", cat: "starters", tags: ["vg", "gf"] },
  { name: "Boquerones", desc: "Vinegar-cured anchovies, parsley oil.", price: "9", cat: "starters", tags: ["gf"] },
  { name: "Jamón ibérico 5J", desc: "Hand-sliced, 30g.", price: "16", cat: "starters", tags: ["gf"] },
  { name: "Croquetas de jamón", desc: "Béchamel, hand-rolled, fried to order.", price: "10", cat: "starters" },
  { name: "Tortilla", desc: "Slow onion, Bintje potato, runny centre.", price: "11", cat: "starters", tags: ["v", "gf"] },

  { name: "Pulpo a la brasa", desc: "Charred octopus, smoked paprika oil.", price: "18", cat: "fire", tags: ["gf"] },
  { name: "Whole turbot", desc: "Wood-fired, salsa verde — for two.", price: "62", cat: "fire", tags: ["gf"] },
  { name: "Iberico pluma", desc: "Acorn-fed pork, romesco.", price: "24", cat: "fire", tags: ["gf"] },
  { name: "Cordero lechal", desc: "Milk-fed lamb shoulder, salt-baked.", price: "32", cat: "fire", tags: ["gf"] },
  { name: "Aubergine miel", desc: "Charred, rosemary honey, almonds.", price: "12", cat: "fire", tags: ["v", "gf"] },
  { name: "Setas a la plancha", desc: "Wild mushrooms, garlic, sherry.", price: "13", cat: "fire", tags: ["vg", "gf"] },

  { name: "Paella Valenciana", desc: "Bomba, saffron, rabbit, snails — for two.", price: "44", cat: "rice", tags: ["gf"] },
  { name: "Arroz negro", desc: "Squid ink rice, calamari, alioli.", price: "38", cat: "rice", tags: ["gf"] },
  { name: "Arroz de verduras", desc: "Artichoke, broad bean, lemon — for two.", price: "32", cat: "rice", tags: ["vg", "gf"] },
  { name: "Fideuà", desc: "Toasted noodles, prawn, alioli.", price: "36", cat: "rice" },
  { name: "Garbanzos & espinacas", desc: "Chickpeas, spinach, cumin.", price: "11", cat: "rice", tags: ["vg", "gf"] },

  { name: "Crema catalana", desc: "Burnt orange, anise.", price: "8", cat: "sweet", tags: ["v", "gf"] },
  { name: "Chocolate & olive oil", desc: "70%, smoked salt, sourdough.", price: "9", cat: "sweet", tags: ["v"] },
  { name: "Santiago", desc: "Almond cake, Pedro Ximénez ice cream.", price: "9", cat: "sweet", tags: ["v"] },

  { name: "Casa sangria", desc: "Garnacha, brandy, citrus, soda.", price: "9", cat: "drinks", tags: ["vg", "gf"] },
  { name: "Vermut de la casa", desc: "House-blended, orange peel, olive.", price: "7", cat: "drinks", tags: ["vg", "gf"] },
  { name: "Gin tonic Mediterráneo", desc: "Gin Mare, rosemary, citrus.", price: "12", cat: "drinks", tags: ["vg", "gf"] },
  { name: "Sherry flight", desc: "Three glasses, fino to PX.", price: "16", cat: "drinks", tags: ["vg", "gf"] },
];

const cats: { id: "all" | Cat; label: string; n: string }[] = [
  { id: "all", label: "Everything", n: "00" },
  { id: "starters", label: "To start", n: "01" },
  { id: "fire", label: "From the fire", n: "02" },
  { id: "rice", label: "Rice & beans", n: "03" },
  { id: "sweet", label: "Sweet", n: "04" },
  { id: "drinks", label: "Bar", n: "05" },
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
    (i) => (cat === "all" || i.cat === cat) && (dietary === "all" || i.tags?.includes(dietary)),
  );

  const grouped = cats
    .filter((c) => c.id !== "all" && (cat === "all" || cat === c.id))
    .map((c) => ({ cat: c, list: filtered.filter((i) => i.cat === c.id) }))
    .filter((g) => g.list.length > 0);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink pt-40 pb-32 text-cream">
        <img src={interiorWide} alt="" className="absolute inset-0 h-full w-full animate-slowzoom object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />
        <div className="relative mx-auto max-w-[1800px] px-6 md:px-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">— The menu</p>
          <h1 className="mt-6 font-display text-[clamp(4rem,13vw,13rem)] leading-[0.86] tracking-tight">
            Eat <span className="italic text-gold">slowly.</span>
          </h1>
          <p className="mt-10 max-w-xl text-cream/70">
            Sourced from a tight rotation of Spanish, Portuguese and Cornish suppliers. The menu shifts every few weeks — this is what's on it now.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-0 z-30 border-y border-ink/15 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {cats.map((f) => (
              <button
                key={f.id}
                onClick={() => setCat(f.id)}
                className={`group inline-flex items-baseline gap-2 text-[11px] uppercase tracking-[0.25em] transition-colors ${
                  cat === f.id ? "text-ink" : "text-ink/45 hover:text-ink"
                }`}
              >
                <span className="text-[9px] text-ink/40">{f.n}</span>
                <span className="border-b pb-0.5 transition-colors" style={{ borderColor: cat === f.id ? "currentColor" : "transparent" }}>
                  {f.label}
                </span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {diet.map((f) => (
              <button
                key={f.id}
                onClick={() => setDietary(f.id)}
                className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] transition ${
                  dietary === f.id ? "border-terracotta bg-terracotta text-cream" : "border-ink/20 text-ink/60 hover:border-ink hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MENU LIST (text-led, editorial) */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-[1800px] px-6 md:px-10">
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-ink/55">Nothing matches that filter — try widening it.</p>
          ) : (
            <div className="space-y-24">
              {grouped.map((g) => (
                <div key={g.cat.id} className="grid gap-10 md:grid-cols-12">
                  <div className="md:col-span-4 md:sticky md:top-32 md:self-start">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-terracotta">— {g.cat.n}</p>
                    <h2 className="mt-3 font-display text-5xl leading-tight md:text-7xl">{g.cat.label}.</h2>
                  </div>
                  <ul className="md:col-span-8 divide-y divide-ink/15 border-y border-ink/15">
                    {g.list.map((it, k) => (
                      <motion.li
                        key={it.name}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: (k % 8) * 0.03 }}
                        className="group grid grid-cols-[1fr_auto] items-baseline gap-x-8 gap-y-2 py-6 transition-colors hover:bg-bone/60"
                      >
                        <div>
                          <div className="flex flex-wrap items-baseline gap-3">
                            <h3 className="font-display text-2xl leading-tight md:text-3xl">{it.name}</h3>
                            {it.tags && (
                              <span className="flex gap-1.5">
                                {it.tags.map((t) => (
                                  <span key={t} className="rounded-full border border-terracotta/40 px-2 py-0.5 text-[9px] tracking-widest text-terracotta">
                                    {tagLabel[t]}
                                  </span>
                                ))}
                              </span>
                            )}
                          </div>
                          <p className="mt-2 max-w-xl text-sm text-ink/60 md:text-base">{it.desc}</p>
                        </div>
                        <div className="flex items-center gap-4 self-start pt-2">
                          <span className="hidden h-px w-12 bg-ink/20 group-hover:bg-terracotta md:block" />
                          <span className="font-display text-xl text-ink/80 md:text-2xl">£{it.price}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-deep-red text-cream">
        <img src={interiorWide} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="relative mx-auto flex max-w-[1800px] flex-col items-start justify-between gap-8 px-6 py-24 md:flex-row md:items-end md:px-10">
          <h2 className="max-w-2xl font-display text-4xl md:text-6xl">Hungry yet? Reserve before the room fills.</h2>
          <Link to="/visit" className="border-b border-cream pb-1 text-[11px] uppercase tracking-[0.3em] hover:text-gold hover:border-gold">
            Book a table →
          </Link>
        </div>
      </section>
    </>
  );
}
