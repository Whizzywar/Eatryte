import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion";
import PageHeader from "../components/PageHeader";
import { IMG } from "../data";

const PHOTOS = [
  [IMG.burger, "Flame-grilled burger", "row-span-2"],
  [IMG.bread, "Fresh bread", ""],
  [IMG.snack, "Quick snack", ""],
  [IMG.pasta, "Chicken and rice plate", "row-span-2"],
  [IMG.snack, "Chicken pie", ""],
  [IMG.bread, "Pastries", ""],
  [IMG.burger, "Shawarma and burger", ""],
  [IMG.pasta, "Lunch plate", ""],
];

export default function Gallery() {
  const [sel, setSel] = useState(null);
  const grid = useRef(null);
  const box = useRef(null);

  useGSAP(() => {
    if (!motionOK()) return;
    gsap.from(".g-item", { autoAlpha: 0, scale: 0.92, stagger: 0.07, duration: 0.6, ease: "power3.out" });
  }, { scope: grid });

  // Lightbox opens with a zoom (answers the click)
  useGSAP(() => {
    if (sel !== null && motionOK()) gsap.fromTo(box.current, { scale: 0.85, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "power3.out" });
  }, { dependencies: [sel] });

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <PageHeader title="Gallery" subtitle="A look at what is coming out of our kitchen and ovens." />
      <section className="bg-paper px-5 py-16 md:px-8 md:py-24">
        <div ref={grid} className="mx-auto grid max-w-7xl auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[240px]">
          {PHOTOS.map(([src, alt, span], i) => (
            <button key={i} onClick={() => setSel(i)} aria-label={`Enlarge: ${alt}`}
              className={`g-item group overflow-hidden rounded-3xl ${span}`}>
              <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
            </button>
          ))}
        </div>
      </section>

      {sel !== null && (
        <div role="dialog" aria-modal="true" onClick={() => setSel(null)}
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/90 p-5">
          <figure ref={box} className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={PHOTOS[sel][0]} alt={PHOTOS[sel][1]} className="max-h-[80vh] rounded-3xl object-contain" />
            <figcaption className="mt-3 text-center text-white/80">{PHOTOS[sel][1]}</figcaption>
          </figure>
          <button onClick={() => setSel(null)} aria-label="Close" className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-xl text-ink">×</button>
        </div>
      )}
    </>
  );
}
