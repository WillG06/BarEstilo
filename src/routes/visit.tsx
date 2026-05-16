import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import interiorWide from "@/assets/be/interior-wide.jpg";
import { Leaves } from "@/components/site/Leaves";

export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Visit & book — Bar Estilo" },
      { name: "description", content: "Reserve a table at Bar Estilo in Shoreditch." },
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
  notes: z.string().max(500).optional(),
});
type FormValues = z.infer<typeof schema>;

const times = ["12:00","12:30","13:00","13:30","14:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30"];

function VisitPage() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { guests: 2, date: today, time: "19:00" },
  });

  const onSubmit = async (v: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(v);
    reset({ ...v, notes: "" });
  };

  return (
    <>
      {/* hero */}
      <section className="grain relative overflow-hidden bg-ink pt-40 pb-32 text-cream">
        <img src={interiorWide} alt="" className="absolute inset-0 h-full w-full animate-slowzoom object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink" />
        <Leaves variant="branch" className="pointer-events-none absolute -left-8 top-32 hidden h-96 w-96 text-sage/30 md:block" />
        <div className="relative mx-auto max-w-[1600px] px-6">
          <p className="text-[11px] uppercase tracking-[0.5em] text-gold">Visit & book</p>
          <h1 className="mt-6 font-display text-[clamp(4rem,12vw,11rem)] leading-[0.9] tracking-tight">
            Save a <span className="italic text-gold">table.</span>
          </h1>
        </div>
      </section>

      {/* booking + sidebar */}
      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-4xl">Reserve online</h2>
            <p className="mt-3 text-sm text-ink/60">
              For parties over 8, please email{" "}
              <a className="underline" href="mailto:hola@barestilo.london">hola@barestilo.london</a>.
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-10 rounded-sm border border-terracotta/40 bg-terracotta/5 p-8"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Reservation requested</p>
                  <h3 className="mt-3 font-display text-3xl">Gracias, {submitted.name.split(" ")[0]}.</h3>
                  <p className="mt-3 text-ink/70">
                    We've sent a confirmation to <span className="text-ink">{submitted.email}</span> for{" "}
                    <span className="text-ink">{submitted.guests} guest{submitted.guests > 1 ? "s" : ""} on {submitted.date} at {submitted.time}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(null)}
                    className="mt-6 rounded-full border border-ink px-5 py-2 text-xs uppercase tracking-[0.2em] hover:bg-ink hover:text-cream"
                  >
                    Make another booking
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-10 grid gap-5"
                >
                  <Field label="Name" error={errors.name?.message}>
                    <input className={inputCls} {...register("name")} />
                  </Field>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Email" error={errors.email?.message}>
                      <input type="email" className={inputCls} {...register("email")} />
                    </Field>
                    <Field label="Phone" error={errors.phone?.message}>
                      <input type="tel" className={inputCls} {...register("phone")} />
                    </Field>
                  </div>
                  <div className="grid gap-5 md:grid-cols-3">
                    <Field label="Guests" error={errors.guests?.message}>
                      <select className={inputCls} {...register("guests")}>
                        {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (<option key={n} value={n}>{n}</option>))}
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
                  <Field label="Notes (optional)" error={errors.notes?.message}>
                    <textarea rows={3} placeholder="Allergies, occasions, anything we should know." className={inputCls} {...register("notes")} />
                  </Field>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-fit rounded-full bg-deep-red px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-cream transition hover:bg-ink disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending…" : "Request reservation"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <aside className="space-y-10">
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-terracotta">Find us</h3>
              <p className="mt-3 font-display text-2xl leading-tight">42 Cobalt Lane<br />Shoreditch, London E1</p>
              <p className="mt-3 text-sm text-ink/60">Two minutes from Shoreditch High Street overground.</p>
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-terracotta">Hours</h3>
              <ul className="mt-3 space-y-1 text-sm text-ink/70">
                <li>Tue – Thu · 17:00 – 23:00</li>
                <li>Fri – Sat · 12:00 – late</li>
                <li>Sun · 12:00 – 21:00</li>
                <li>Mon · closed (private hire)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-terracotta">Contact</h3>
              <p className="mt-3 text-sm text-ink/70">
                <a className="underline" href="tel:+442079460188">020 7946 0188</a><br />
                <a className="underline" href="mailto:hola@barestilo.london">hola@barestilo.london</a>
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* MAP */}
      <section className="relative bg-ink">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 md:grid-cols-[1fr_1.6fr]">
          <div className="relative px-6 py-20 text-cream md:px-16 md:py-28">
            <Leaves variant="sprig" className="pointer-events-none absolute right-0 top-0 hidden h-56 w-56 text-sage/30 md:block" />
            <p className="text-[11px] uppercase tracking-[0.5em] text-gold">On the map</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">Cobalt Lane.</h2>
            <p className="mt-6 max-w-sm text-cream/70">
              Look for the red door — there's no sign. If you reach the canal, you've gone too far.
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Shoreditch+High+Street+London"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-cream/40 px-6 py-3 text-[11px] uppercase tracking-[0.3em] hover:bg-cream hover:text-ink"
            >
              Get directions →
            </a>
          </div>
          <div className="relative h-[60vh] overflow-hidden md:h-auto">
            {/* Free OpenStreetMap embed — no key, no SSRF risk */}
            <iframe
              title="Map to Bar Estilo"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.0844%2C51.5210%2C-0.0710%2C51.5275&layer=mapnik&marker=51.5240%2C-0.0770"
              className="absolute inset-0 h-full w-full grayscale-[40%] contrast-110"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-[oklch(0.36_0.16_25/0.18)] mix-blend-multiply" />
          </div>
        </div>
      </section>
    </>
  );
}

const inputCls =
  "w-full rounded-sm border border-ink/20 bg-cream px-4 py-3 text-base text-ink outline-none transition focus:border-terracotta";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-ink/60">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-deep-red">{error}</span>}
    </label>
  );
}