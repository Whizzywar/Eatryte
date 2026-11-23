import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion";
import PageHeader from "../components/PageHeader";
import { IMG } from "../data";

/*
  Edit your dishes here.
  - cat:  the filter category
  - desc: short line shown on hover (desktop) and in the lightbox
  - span: tile size on the "All" view. These 10 tiles fill a 4-column, 5-row grid
          exactly (on phones: 2 columns, 8 rows). If you add or remove photos,
          adjust the spans so no gaps appear.
*/
const PHOTOS = [
  { src: IMG.burger, name: "Flame-grilled burger", cat: "Grills", big: true, span: "col-span-2 row-span-2",
    desc: "A juicy flame-grilled patty with melted cheese and fresh toppings in a toasted bun." },
  { src: IMG.bread, name: "Fresh bread", cat: "Bakery", span: "",
    desc: "Baked fresh with a golden crust and a soft centre." },
  { src: IMG.snack, name: "Quick snack", cat: "Snacks", span: "",
    desc: "A quick, tasty bite for when you are on the move." },
  { src: IMG.pasta, name: "Chicken and rice plate", cat: "Mains", span: "md:row-span-2",
    desc: "Tender chicken served over seasoned rice, plated hot." },
  { src: IMG.snack, name: "Chicken pie", cat: "Snacks", span: "",
    desc: "Flaky pastry filled with seasoned chicken, baked until golden." },
  { src: IMG.bread, name: "Pastries", cat: "Bakery", span: "md:col-span-2",
    desc: "A tray of freshly baked pastries, perfect with tea or coffee." },
  { src: IMG.burger, name: "Shawarma and burger", cat: "Grills", span: "",
    desc: "Shawarma and burger from the grill, made to order." },
  { src: IMG.burger, name: "Signature grill platter", cat: "Grills", big: true, span: "col-span-2 row-span-2 md:col-start-3",
    desc: "Our grill favourites on one plate, cooked to order." },
  { src: IMG.pasta, name: "Lunch plate", cat: "Mains", span: "md:col-span-2",
    desc: "A filling lunch plate, cooked fresh and served hot." },
  { src: IMG.bread, name: "Cinnamon rolls", cat: "Bakery", span: "md:col-span-2",
    desc: "Soft, warm rolls finished with a sweet cinnamon glaze." },
];

const CATS = ["All", ...new Set(PHOTOS.map((p) => p.cat))];
const pad = (n) => String(n).padStart(2, "0");

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [sel, setSel] = useState(null); // index inside the filtered list
  const grid = useRef(null);
  const box = useRef(null);
  const closeBtn = useRef(null);
  const touchX = useRef(0);

  const list = filter === "All" ? PHOTOS : PHOTOS.filter((p) => p.cat === filter);
  const mosaic = filter === "All";
  const n = list.length;
  // Tile sizes: the mosaic on "All", and tidy layouts when a filter leaves few photos
  const sizeOf = (p, i) => {
    if (mosaic) return p.span;
    if (n <= 2) return "col-span-2 row-span-2";
    if (n === 3) return i === 0 ? "col-span-2 row-span-2" : "md:col-span-2";
    return "";
  };
  const isBig = (p, i) => (mosaic ? p.big : n <= 2 || (n === 3 && i === 0));
  const isOpen = sel !== null;
  const cur = isOpen ? list[sel] : null;
  const go = (d) => setSel((i) => (i + d + list.length) % list.length);

  // Tiles animate in on load and every time the filter changes
  useGSAP(
    () => {
      if (!motionOK()) return;
      gsap.from(".g-item", {
        autoAlpha: 0,
        y: 28,
        scale: 0.96,
        stagger: 0.06,
        duration: 0.6,
        ease: "power3.out",
      });
    },
    { scope: grid, dependencies: [filter] },
  );

  // Lightbox zooms in on open and softly on every next / previous
  useGSAP(
    () => {
      if (sel !== null && motionOK())
        gsap.fromTo(
          box.current,
          { scale: 0.94, autoAlpha: 0, y: 12 },
          { scale: 1, autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" },
        );
    },
    { dependencies: [sel] },
  );

  // Keyboard controls, scroll lock and focus while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSel(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeBtn.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, list.length]);

  const stop = (e) => e.stopPropagation();

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="A look at what is coming out of our kitchen and ovens."
        image={IMG.burger}
      />

      <section className="bg-paper px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div
              role="group"
              aria-label="Filter the gallery"
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {CATS.map((c) => {
                const active = filter === c;
                const count = c === "All" ? PHOTOS.length : PHOTOS.filter((p) => p.cat === c).length;
                return (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    aria-pressed={active}
                    className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                      active
                        ? "border-ink bg-ink text-white"
                        : "border-ink/15 bg-white text-ink hover:border-ink/40"
                    }`}
                  >
                    {c} <span className={active ? "text-white/60" : "text-ink/40"}>{count}</span>
                  </button>
                );
              })}
            </div>
            <p aria-live="polite" className="text-sm text-ink/60">
              Showing {list.length} {list.length === 1 ? "photo" : "photos"}
            </p>
          </div>

          {/* Grid */}
          <div
            ref={grid}
            className="mt-8 grid auto-rows-[160px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[200px] md:auto-rows-[210px] md:grid-cols-4 md:gap-4 lg:auto-rows-[250px]"
          >
            {list.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setSel(i)}
                aria-label={`Open ${p.name}`}
                className={`g-item group relative overflow-hidden rounded-3xl bg-ink/10 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${sizeOf(p, i)}`}
              >
                <img
                  src={p.src}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                />

                {/* Readable caption area */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Category tag */}
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur md:left-4 md:top-4">
                  {p.cat}
                </span>


                {/* Name, and a description that slides in on hover (desktop) */}
                <span className="absolute inset-x-0 bottom-0 block p-4 text-white md:p-5">
                  <span
                    className={`block font-semibold leading-tight ${
                      isBig(p, i) ? "text-xl md:text-3xl" : "text-base md:text-lg"
                    }`}
                  >
                    {p.name}
                  </span>
                  <span className="mt-1 hidden max-h-0 overflow-hidden text-sm leading-snug text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-14 group-hover:opacity-100 md:block">
                    {p.desc}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isOpen && cur && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={cur.name}
          onClick={() => setSel(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between p-4 text-white md:p-6">
            <p className="text-sm tabular-nums text-white/70">
              {pad(sel + 1)} / {pad(list.length)}
            </p>
            <button
              ref={closeBtn}
              onClick={(e) => {
                stop(e);
                setSel(null);
              }}
              aria-label="Close"
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl text-ink"
            >
              ×
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 md:px-20">
            {list.length > 1 && (
              <button
                onClick={(e) => {
                  stop(e);
                  go(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-2xl leading-none text-ink md:left-6"
              >
                ‹
              </button>
            )}

            <figure ref={box} onClick={stop} className="flex max-h-full max-w-4xl flex-col items-center">
              <img
                src={cur.src}
                alt={cur.name}
                className="max-h-[52vh] min-h-0 rounded-2xl object-contain sm:max-h-[64vh] sm:rounded-3xl"
              />
              <figcaption className="mt-5 max-w-xl text-center text-white">
                <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {cur.cat}
                </span>
                <span className="mt-3 block text-xl font-semibold md:text-2xl">{cur.name}</span>
                <span className="mt-1 block text-white/70">{cur.desc}</span>
              </figcaption>
            </figure>

            {list.length > 1 && (
              <button
                onClick={(e) => {
                  stop(e);
                  go(1);
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-2xl leading-none text-ink md:right-6"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}