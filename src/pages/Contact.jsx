import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion";
import PageHeader from "../components/PageHeader";
import { IMG } from "../data";

/* ---------- Edit your details here ---------- */
const EMAIL = "info@eatryte.com";
const PHONE_TEXT = "(+234) 9083500000";
const PHONE_HREF = "tel:+2349083500000";
const ADDRESS = ["#Arochukwu Street by Umuwayo Road", "Umuahia, Abia State, Nigeria"];
const MAP_QUERY = "Arochukwu Street, Umuwayo Road, Umuahia, Abia State, Nigeria";

// Placeholder hours. Replace with your real ones.
// `on` lists the days (0 = Sunday ... 6 = Saturday); `open` / `close` are 24-hour clock hours.
const HOURS = [
  { days: "Monday to Saturday", range: "8am to 9pm", on: [1, 2, 3, 4, 5, 6], open: 8, close: 21 },
  { days: "Sunday", range: "12pm to 8pm", on: [0], open: 12, close: 20 },
];

// To receive messages without an email app, paste a Formspree (or similar) address here.
// Leave it empty to open the visitor's email app with the message ready instead.
const ENDPOINT = "";

/* ---------- Helpers ---------- */
const field =
  "w-full rounded-2xl border-2 border-ink/10 bg-white px-4 py-3 outline-none transition placeholder:text-ink/40 focus:border-leaf";
const label = "mb-1 block text-sm font-bold text-ink";

const DAY = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
function isOpenNow() {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Lagos",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t)?.value;
    const time = Number(get("hour")) + Number(get("minute")) / 60;
    const slot = HOURS.find((h) => h.on.includes(DAY[get("weekday")]));
    return !!slot && time >= slot.open && time < slot.close;
  } catch {
    return null;
  }
}

function InfoCard({ title, children, hint }) {
  return (
    <div className="rv rounded-3xl border-t-4 border-leaf bg-white p-6 shadow-xl shadow-ink/5 md:p-7">
      <h2 className="font-display text-xl font-bold text-leaf">{title}</h2>
      <div className="mt-3 text-lg leading-snug text-ink">{children}</div>
      {hint}
    </div>
  );
}

export default function Contact() {
  const root = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [open, setOpen] = useState(null);

  // "Open now" badge, using Nigerian time
  useEffect(() => {
    setOpen(isOpenNow());
    const t = setInterval(() => setOpen(isOpenNow()), 60000);
    return () => clearInterval(t);
  }, []);

  // Gentle scroll-in for every ".rv" element
  useGSAP(
    () => {
      if (!motionOK()) return;
      const els = gsap.utils.toArray(".rv");
      gsap.set(els, { autoAlpha: 0, y: 32 });
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            gsap.to(en.target, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" });
            io.unobserve(en.target);
          }),
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    },
    { scope: root },
  );

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.company) return; // spam trap: real visitors never see this field
    delete data.company;
    setStatus("sending");

    if (ENDPOINT) {
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Request failed");
        form.reset();
        setStatus("sent");
      } catch {
        setStatus("error");
      }
    } else {
      const body = [data.message, "", data.name, data.email, data.phone].filter((x) => x !== undefined).join("\n");
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Website message from ${data.name}`)}&body=${encodeURIComponent(body)}`;
      form.reset();
      setStatus("sent");
    }
  };


  return (
    <div ref={root}>
      {/* image is optional: remove it to use the default hero image */}
      <PageHeader
        title="Contact Us"
        subtitle="Questions, bulk orders or feedback? Send us a message."
        image={IMG.contact}
      />

      {/* 1. Quick contact cards, overlapping the page header */}
      <section className="relative z-10 -mt-12 bg-paper px-5 pb-4 md:-mt-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <InfoCard
            title="Call us"
            hint={<p className="mt-2 text-sm text-ink/55">Tap the number to call.</p>}
          >
            <a href={PHONE_HREF} className="font-semibold hover:text-pepper">{PHONE_TEXT}</a>
          </InfoCard>
          <InfoCard
            title="Write to us"
            hint={<p className="mt-2 text-sm text-ink/55">We will reply as soon as we can.</p>}
          >
            <a href={`mailto:${EMAIL}`} className="break-all font-semibold hover:text-pepper">{EMAIL}</a>
          </InfoCard>
          <InfoCard
            title="Visit us"
            hint={
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm font-bold text-pepper underline-offset-4 hover:underline"
              >
                Get directions
              </a>
            }
          >
            {ADDRESS.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </InfoCard>
        </div>
      </section>

      {/* 2. Form, opening hours and map */}
      <section className="bg-paper px-5 py-12 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Form */}
          <div id="contact-form" className="rv scroll-mt-24 rounded-3xl bg-white p-6 shadow-xl shadow-ink/5 sm:p-8 md:p-10 lg:col-span-3">
            {status === "sent" ? (
              <div role="status" className="rounded-3xl bg-leaf p-8 text-white">
                <h2 className="font-display text-2xl font-bold">
                  {ENDPOINT ? "Message sent" : "Almost there"}
                </h2>
                <p className="mt-2 text-white/85">
                  {ENDPOINT
                    ? "Thank you. We will reply as soon as we can."
                    : "Your email app should now be open with your message ready. Press send there to finish."}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-leaf transition hover:-translate-y-0.5"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <h2 className="font-display text-2xl font-bold text-leaf md:text-3xl">Send us a message</h2>
                  <p className="mt-1 text-ink/65">We read every message.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={label}>Your name</label>
                    <input id="name" name="name" required autoComplete="name" placeholder="Your full name" className={field} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>Phone <span className="font-normal text-ink/50">(optional)</span></label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="080..." className={field} />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={label}>Email address</label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
                </div>


                <div>
                  <label htmlFor="msg" className={label}>Message</label>
                  <textarea
                    id="msg"
                    name="message"
                    rows="6"
                    required
                    placeholder="How can we help?"
                    className={`${field} resize-y`}
                  />
                </div>

                {/* Spam trap: hidden from real visitors */}
                <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                {status === "error" && (
                  <p role="alert" className="rounded-2xl bg-pepper/10 px-4 py-3 text-sm text-pepper">
                    Something went wrong and your message was not sent. Please try again, or email us at{" "}
                    <a href={`mailto:${EMAIL}`} className="font-bold underline">{EMAIL}</a>.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-pepper px-8 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "sending" ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>

          {/* Hours + map */}
          <div className="space-y-8 lg:col-span-2">
            <div className="rv rounded-3xl bg-ink p-7 text-white md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold">Opening hours</h2>
                {open !== null && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      open ? "bg-emerald-400/20 text-emerald-300" : "bg-white/10 text-white/70"
                    }`}
                  >
                    {open ? "Open now" : "Closed now"}
                  </span>
                )}
              </div>
              <dl className="mt-6 space-y-4">
                {HOURS.map((h) => (
                  <div key={h.days} className="flex items-baseline gap-3">
                    <dt className="shrink-0 text-white/80">{h.days}</dt>
                    <span aria-hidden="true" className="flex-1 border-b border-dotted border-white/30" />
                    <dd className="shrink-0 font-bold">{h.range}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rv overflow-hidden rounded-3xl bg-white shadow-xl shadow-ink/5">
              <iframe
                title="Map showing our location in Umuahia"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0 md:h-72"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <p className="text-sm text-ink/70">
                  {ADDRESS[0]}, {ADDRESS[1]}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-leaf px-5 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5"
                >
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}