import { useRef } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion";
import PageHeader from "../components/PageHeader";
import Banner from "../components/Banner";
import { IMG } from "../data";

/* ---------- Edit your content here ---------- */

// The three chapters of the story. Replace with your own history, founders and milestones.
const CHAPTERS = [
  {
    label: "Chapter one",
    title: "The idea",
    text: "Eatryte started with a simple belief: everyone deserves a place to fill their stomach with food that is fresh, fluffy and delicious.",
  },
  {
    label: "Chapter two",
    title: "The kitchen",
    text: "From our home in Umuahia, our bakers and cooks prepare bread, pastries, grilled chicken, rice and snacks every day.",
  },
  {
    label: "Chapter three",
    title: "The promise",
    text: "Every order is made with care, so that what reaches your table is pleasant to your body, mind, soul and stomach.",
  },
];

const VALUES = [
  { t: "Fresh", d: "Prepared every day in our own kitchen, so you taste the difference." },
  { t: "Fluffy", d: "Soft bread and pastries with a light, airy bite." },
  { t: "Delicious", d: "Sweet or savory, every treat is made to satisfy." },
  { t: "Trusted", d: "Honest food, made with care, that you can rely on." },
];

const PANELS = [
  { img: IMG.bread, title: "Bread and pastries", text: "Fresh, fluffy loaves and treats from the oven." },
  { img: IMG.burger, title: "Grilled chicken", text: "Hot off the grill and full of flavour." },
  { img: IMG.pasta, title: "Rice and snacks", text: "Hearty plates and quick bites, every day." },
];

/* ---------- Small pieces ---------- */

function Ornament({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-ink/40 ${className}`} aria-hidden="true">
      <span className="h-px w-14 bg-current" />
      <span className="text-xs">◆</span>
      <span className="h-px w-14 bg-current" />
    </div>
  );
}

export default function OurStory() {
  const root = useRef(null);

  // Gentle scroll-in for every ".rv" element (no extra GSAP plugin needed)
  useGSAP(
    () => {
      if (!motionOK()) return;
      const els = gsap.utils.toArray(".rv");
      gsap.set(els, { autoAlpha: 0, y: 36 });
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            gsap.to(en.target, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" });
            io.unobserve(en.target);
          }),
        { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <PageHeader
        title="Our Story"
        subtitle="A safe haven for a sweet or savory treat, built on food you can trust."
        image={IMG.story}
      />

      {/* 1. Opening statement + arch photo + story text */}
      <section className="overflow-x-clip bg-paper px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="rv mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-ink/60">Our story</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-ink md:text-6xl">
              Food you can <em>trust</em>, made fresh every day.
            </h2>
            <Ornament className="mt-8" />
          </div>

          <div className="mt-16 grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
            {/* Photos */}
            <div className="rv relative mx-auto w-full max-w-sm pb-10 lg:col-span-5 lg:max-w-none lg:pr-10">
              <div className="aspect-[3/4] overflow-hidden rounded-b-3xl rounded-t-full bg-ink/10 shadow-xl">
                <img src={IMG.story} alt="Our kitchen" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -right-2 bottom-0 aspect-square w-2/5 overflow-hidden rounded-2xl border-8 border-paper bg-ink/10 shadow-xl lg:right-0">
                <img src={IMG.bread} alt="Fresh bread from our ovens" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -left-2 top-1/3 grid h-28 w-28 place-items-center rounded-full bg-ink p-3 text-center text-xs font-semibold leading-snug text-white shadow-xl md:h-32 md:w-32 md:text-sm lg:-left-6">
                <span>
                  Baked fresh
                  <br />
                  in Umuahia
                </span>
              </div>
            </div>

            {/* Text */}
            <div className="rv lg:col-span-7">
              <div className="space-y-6 text-lg leading-relaxed text-ink/80">
                <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-ink">
                  Eatryte started with a simple idea: everyone deserves a place to fill their stomach
                  with food that is fresh, fluffy and delicious.
                </p>
                <p>
                  From our home in Umuahia, our bakers and cooks prepare bread, pastries, grilled
                  chicken, rice and snacks every day.
                </p>
                {/* Add more of your own history, founders and milestones here */}
              </div>

              <blockquote className="mt-10 border-l-2 border-ink pl-6 font-serif text-2xl italic leading-snug text-ink md:text-3xl">
                “Pastries that are pleasant to your body, mind, soul and stomach.”
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Chapters on a timeline (horizontal on desktop, vertical on phones) */}
      <section className="bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="rv text-center">
            <h2 className="font-serif text-4xl text-ink md:text-5xl">How it all began</h2>
            <Ornament className="mt-6" />
          </div>

          <ol className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-2 top-2 w-px bg-ink/20 md:bottom-auto md:left-0 md:right-0 md:top-2 md:h-px md:w-auto"
            />
            {CHAPTERS.map((c) => (
              <li key={c.title} className="rv relative pl-9 md:pl-0 md:pt-12">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 z-10 h-4 w-4 rounded-full border-2 border-ink bg-white md:top-0"
                />
                <p className="text-sm text-ink/50">{c.label}</p>
                <h3 className="mt-1 font-serif text-2xl text-ink md:text-3xl">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/70">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. What we stand for (dark band) */}
      <section className="bg-ink px-5 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-center lg:gap-20">
          <div className="rv">
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">What we stand for</h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-white/70">
              Four promises we bring to every loaf, plate and treat that leaves our kitchen.
            </p>
          </div>
          <dl className="rv grid gap-px overflow-hidden rounded-3xl bg-white/15 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.t} className="bg-ink p-7 md:p-9">
                <dt className="font-serif text-2xl italic md:text-3xl">{v.t}</dt>
                <dd className="mt-3 leading-relaxed text-white/70">{v.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 4. From our ovens and grills (full-width photo panels) */}
      <section className="bg-paper">
        <div className="rv mx-auto max-w-3xl px-5 py-16 text-center md:py-20">
          <h2 className="font-serif text-4xl text-ink md:text-5xl">From our ovens and grills</h2>
          <p className="mt-4 text-lg text-ink/70">
            Everything is prepared fresh in our kitchen in Umuahia, every day.
          </p>
        </div>
        <div className="grid md:grid-cols-3">
          {PANELS.map((p) => (
            <figure key={p.title} className="group relative h-[340px] overflow-hidden md:h-[520px]">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-7 text-white md:p-9">
                <span className="block font-serif text-2xl md:text-3xl">{p.title}</span>
                <span className="mt-1 block text-white/80">{p.text}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Banner />
    </div>
  );
}