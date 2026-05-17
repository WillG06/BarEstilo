import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import interiorWide from "@/assets/be/interior-wide.jpg";
import privateDining from "@/assets/be/private-dining.jpg";
import barShelf from "@/assets/be/bar-shelf.jpg";

export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Visit & Book — Bar Estilo" },
      { name: "description", content: "Reserve a table at Bar Estilo in Shoreditch." },
      { property: "og:title", content: "Visit & Book — Bar Estilo" },
      { property: "og:image", content: interiorWide },
    ],
    links: [{ rel: "canonical", href: "/visit" }],
  }),
  component: VisitPage,
});

const today = new Date().toISOString().split("T")[0];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  phone: z.string().trim().min(7, "Please enter a contact number.").max(30),
  guests: z.coerce.number().min(1).max(14),
  date: z.string().refine((d) => d >= today, "Pick a date from today onwards."),
  time: z.string().min(1, "Pick a time."),
  occasion: z.string().optional(),
  notes: z.string().max(500).optional(),
});
type FormValues = z.infer<typeof schema>;

const times = ["12:00","12:30","13:00","13:30","14:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30"];
const occasions = ["—", "Birthday", "Anniversary", "Date night", "Business", "Just hungry"];

function VisitPage() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { guests: 2, date: today, time: "19:00", occasion: "—" },
  });

  const guests = watch("guests");
  const date = watch("date");
  const time = watch("time");

  const onSubmit = async (v: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(v);
    reset({ ...v, notes: "" });
  };

  return (
    <>
      {/* HERO */}
      <section className="relative h-[80svh] overflow-hidden bg-ink text-cream">
        <img src={interiorWide} alt="" className="absolute inset-0 h-full w-full animate-slowzoom object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink" />
        <div className="relative mx-auto flex h-full max-w-[1800px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">— Visit & Book</p>
          <h1 className="mt-6 font-display text-[clamp(4rem,12vw,11rem)] leading-[0.9] tracking-tight">
            Save a <span className="italic text-gold">table.</span>
          </h1>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="border-b border-ink/15 bg-bone">
        <div className="mx-auto grid max-w-[1800px] gap-y-10 px-6 py-14 md:grid-cols-4 md:px-10">
          {[
            { l: "Address", v: ["42 Cobalt Lane", "Shoreditch, London E1"] },
            { l: "Hours", v: ["Tue–Thu · 17–23", "Fri–Sat · 12–late", "Sun · 12–21"] },
            { l: "Contact", v: ["020 7946 0188", "hola@barestilo.london"] },
            { l: "Getting there", v: ["Shoreditch High St · 2 min", "Liverpool St · 8 min"] },
          ].map((b) => (
            <div key={b.l}>
              <p className="text-[10px] uppercase tracking-[0.4em] text-terracotta">— {b.l}</p>
              <div className="mt-4 space-y-1 text-sm text-ink/80">
                {b.v.map((x) => <p key={x}>{x}</p>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto grid max-w-[1800px] gap-16 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.4em] text-terracotta">— Reserve online</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">A few details and we'll save you the table.</h2>
            <p className="mt-6 max-w-md text-ink/65">
              For parties over 8, please email <a className="border-b border-ink/40 hover:border-ink" href="mailto:hola@barestilo.london">hola@barestilo.london</a>. We confirm by email within an hour during opening hours.
            </p>

            <div className="mt-12 grain relative aspect-[4/5] overflow-hidden">
              <img src={privateDining} alt="" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border border-terracotta/40 bg-terracotta/5 p-10 md:p-14"
                >
                  <p className="text-[10px] uppercase tracking-[0.4em] text-terracotta">— Reservation requested</p>
                  <h3 className="mt-4 font-display text-4xl md:text-5xl">Gracias, {submitted.name.split(" ")[0]}.</h3>
                  <p className="mt-4 text-ink/75">
                    We've sent a confirmation to <span className="text-ink">{submitted.email}</span> for{" "}
                    <span className="text-ink">{submitted.guests} guest{submitted.guests > 1 ? "s" : ""} on {submitted.date} at {submitted.time}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(null)}
                    className="mt-8 border-b border-ink pb-1 text-[11px] uppercase tracking-[0.3em] hover:text-terracotta hover:border-terracotta"
                  >
                    Make another booking →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-7"
                >
                  {/* Step indicators */}
                  <div className="grid grid-cols-3 gap-3 border-b border-ink/15 pb-6 text-[10px] uppercase tracking-[0.3em] text-ink/55">
                    <div><span className="text-terracotta">01 ·</span> {guests} {guests > 1 ? "guests" : "guest"}</div>
                    <div><span className="text-terracotta">02 ·</span> {date}</div>
                    <div><span className="text-terracotta">03 ·</span> {time}</div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <Field label="Guests" error={errors.guests?.message}>
                      <select className={inputCls} {...register("guests")}>
                        {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (<option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>))}
                      </select>
                    </Field>
                    <Field label="Date" error={errors.date?.message}>
                      <input type="date" min={today} className={inputCls} {...register("date")} />
                    </Field>
                    <Field label="Time" error={errors.time?.message}>
                      <select className={inputCls} {...register("time")}>
                        {times.map((t) => (<option key={t} value={t}>{t}</option>))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Full name" error={errors.name?.message}>
                    <input className={inputCls} placeholder="As it appears on your card" {...register("name")} />
                  </Field>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Field label="Email" error={errors.email?.message}>
                      <input type="email" className={inputCls} placeholder="hello@example.com" {...register("email")} />
                    </Field>
                    <Field label="Phone" error={errors.phone?.message}>
                      <input type="tel" className={inputCls} placeholder="+44…" {...register("phone")} />
                    </Field>
                  </div>

                  <Field label="Occasion (optional)" error={errors.occasion?.message}>
                    <select className={inputCls} {...register("occasion")}>
                      {occasions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>

                  <Field label="Anything we should know? (optional)" error={errors.notes?.message}>
                    <textarea rows={3} placeholder="Allergies, accessibility, surprises." className={inputCls} {...register("notes")} />
                  </Field>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-ink/45">Free cancellation up to 24h before.</p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex items-center gap-4 bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-cream transition hover:bg-terracotta disabled:opacity-60"
                    >
                      {isSubmitting ? "Sending…" : "Request reservation"}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="relative bg-ink text-cream">
        <div className="mx-auto grid max-w-[1800px] grid-cols-1 md:grid-cols-[1fr_1.5fr]">
          <div className="relative px-6 py-20 md:px-16 md:py-28">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">— On the map</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">Cobalt Lane.</h2>
            <p className="mt-6 max-w-sm text-cream/70">
              Look for the red door — there's no sign. If you reach the canal, you've gone too far.
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Shoreditch+High+Street+London"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex items-center gap-3 border-b border-cream pb-1 text-[11px] uppercase tracking-[0.3em] hover:text-gold hover:border-gold"
            >
              Get directions →
            </a>
            <img src={barShelf} alt="" className="mt-12 hidden h-48 w-full object-cover md:block" />
          </div>
          <div className="relative h-[60vh] overflow-hidden md:h-auto">
            <iframe
              title="Map to Bar Estilo"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.0844%2C51.5210%2C-0.0710%2C51.5275&layer=mapnik&marker=51.5240%2C-0.0770"
              className="absolute inset-0 h-full w-full grayscale contrast-110"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-[oklch(0.32_0.06_45/0.18)] mix-blend-multiply" />
          </div>
        </div>
      </section>

      <section className="border-t border-ink/15 bg-bone py-16">
        <div className="mx-auto flex max-w-[1800px] flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center md:px-10">
          <p className="font-display text-3xl md:text-4xl">Private hire & buy-outs.</p>
          <Link to="/about" className="border-b border-ink pb-1 text-[11px] uppercase tracking-[0.3em] hover:text-terracotta hover:border-terracotta">
            Read about the corner room →
          </Link>
        </div>
      </section>
    </>
  );
}

const inputCls =
  "w-full appearance-none border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink outline-none transition focus:border-terracotta";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] uppercase tracking-[0.3em] text-ink/55">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
