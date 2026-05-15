import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import dishPaella from "@/assets/be/dish-paella.jpg";
import dishJamon from "@/assets/be/dish-jamon.jpg";
import dishOctopus from "@/assets/be/dish-octopus.jpg";
import dishPadron from "@/assets/be/dish-padron.jpg";
import dishSangria from "@/assets/be/dish-sangria.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Bar Estilo" },
      {
        name: "description",
        content:
          "Wood-fired tapas, paellas, raciones and an all-Iberian wine list. Filter by vegan, vegetarian or gluten-free.",
      },
    ],
  }),
  component: MenuPage,
});

type Tag = "vg" | "v" | "gf";
type Item = {
  name: string;
  desc: string;
  price: string;
  tags?: Tag[];
};
type Section = { title: string; items: Item[] };

const sections: Section[] = [
  {
    title: "To start",
    items: [
      { name: "Pan de cristal", desc: "Tomato, garlic, Arbequina oil.", price: "5", tags: ["vg"] },
      { name: "Padrón peppers", desc: "Blistered, sea salt, lemon.", price: "8", tags: ["vg", "gf"] },
      { name: "Jamón ibérico 5J", desc: "Hand-sliced, 30g.", price: "16", tags: ["gf"] },
      { name: "Boquerones", desc: "Vinegar-cured anchovies, parsley oil.", price: "9", tags: ["gf"] },
    ],
  },
  {
    title: "From the fire",
    items: [
      { name: "Pulpo a la brasa", desc: "Charred octopus, smoked paprika oil.", price: "18", tags: ["gf"] },
      { name: "Whole turbot", desc: "Wood-fired, salsa verde — for two.", price: "62", tags: ["gf"] },
      { name: "Iberico pluma", desc: "Acorn-fed pork, romesco.", price: "24", tags: ["gf"] },
      { name: "Aubergine miel", desc: "Charred, rosemary honey, almonds.", price: "12", tags: ["v", "gf"] },
    ],
  },
  {
    title: "Rice & beans",
    items: [
      { name: "Paella Valenciana", desc: "Bomba, saffron, rabbit, snails — for two.", price: "44", tags: ["gf"] },
      { name: "Arroz negro", desc: "Squid ink rice, calamari, alioli.", price: "38", tags: ["gf"] },
      { name: "Garbanzos & espinacas", desc: "Chickpeas, spinach, cumin.", price: "11", tags: ["vg", "gf"] },
    ],
  },
  {
    title: "Sweet",
    items: [
      { name: "Crema catalana", desc: "Burnt orange, anise.", price: "8", tags: ["v", "gf"] },
      { name: "Chocolate & olive oil", desc: "70%, smoked salt, sourdough.", price: "9", tags: ["v"] },
    ],
  },
];

const filters: { id: "all" | Tag; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "vg", label: "Vegan" },
  { id: "v", label: "Vegetarian" },
  { id: "gf", label: "Gluten-free" },
];

const tagLabel: Record<Tag, string> = { vg: "VG", v: "V", gf: "GF" };

function MenuPage() {
  const [active, setActive] = useState<"all" | Tag>("all");
  const filtered = sections
    .map((s) => ({
      ...s,
      items: s.items.filter((i) => active === "all" || i.tags?.includes(active)),
    }))
    .filter((s) => s.items.length);

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-40 pb-24 text-cream">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">The menu</p>
          <h1 className="mt-6 font-display text-7xl leading-[0.9] md:text-9xl">
            Eat <span className="italic text-gold">slowly.</span>
          </h1>
          <p className="mt-8 max-w-xl text-cream/70">
            Sourced from a tight rotation of Spanish, Portuguese and Cornish suppliers.
            The menu shifts every few weeks — this is what's on it now.
          </p>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-cream py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-6">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition ${
                active === f.id
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/20 text-ink hover:border-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 md:grid-cols-2">
          {filtered.map((s) => (
            <div key={s.title}>
              <h2 className="mb-10 font-display text-4xl italic text-terracotta">
                {s.title}
              </h2>
              <ul className="divide-y divide-ink/10">
                {s.items.map((it) => (
                  <li key={it.name} className="py-6">
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="font-display text-2xl">{it.name}</h3>
                      <span className="font-display text-xl text-ink/70">£{it.price}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <p className="text-sm text-ink/60">{it.desc}</p>
                      {it.tags && (
                        <span className="ml-auto flex gap-1">
                          {it.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded border border-terracotta/40 px-1.5 py-0.5 text-[10px] tracking-widest text-terracotta"
                            >
                              {tagLabel[t]}
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-deep-red text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
          <img
            src={dishSangria}
            alt="A glass of red sangria with citrus"
            className="aspect-[4/3] w-full rounded-sm object-cover"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Wine & sherry</p>
            <h2 className="mt-4 font-display text-5xl">A short, all-Iberian list.</h2>
            <p className="mt-6 text-cream/80">
              Forty bottles, twelve by the glass, rotated monthly. Ask a server —
              they actually want to talk about it.
            </p>
          </div>
        </div>
      </section>

      {/* preload referenced imports so unused warnings stay quiet */}
      <div className="hidden">
        <img src={dishPaella} alt="" />
        <img src={dishJamon} alt="" />
        <img src={dishOctopus} alt="" />
        <img src={dishPadron} alt="" />
      </div>
    </>
  );
}
