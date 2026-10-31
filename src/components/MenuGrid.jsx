import { useRef, useState } from "react";
import { gsap, useGSAP, motionOK, naira } from "../lib/motion";
import { CATEGORIES, MENU } from "../data";
import { useCart } from "../context/CartContext";

// `limit` shows only the first N items and hides the category tabs (used on the home page).
export default function MenuGrid({ limit }) {
  const [cat, setCat] = useState("All");
  const grid = useRef(null);
  const { add } = useCart();

  let items = cat === "All" ? MENU : MENU.filter((m) => m.cat === cat);
  if (limit) items = items.slice(0, limit);

  useGSAP(() => {
    if (!motionOK()) return;
    gsap.from(".menu-card", { autoAlpha: 0, y: 28, scale: 0.97, stagger: 0.06, duration: 0.5, ease: "power3.out" });
  }, { scope: grid, dependencies: [cat] });

  const onAdd = (e) => {
    add();
    if (motionOK()) gsap.fromTo(e.currentTarget, { scale: 0.85 }, { scale: 1, duration: 0.5, ease: "elastic.out(1.2,0.4)" });
  };

  return (
    <div>
      {!limit && (
        <div role="tablist" aria-label="Menu categories" className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border-2 px-5 py-2 text-sm font-bold transition ${
                cat === c ? "border-leaf bg-leaf text-white" : "border-leaf/25 text-leaf hover:border-leaf"}`}>
              {c}
            </button>
          ))}
        </div>
      )}
      <div ref={grid} className={`${limit ? "" : "mt-10"} grid gap-6 sm:grid-cols-2 lg:grid-cols-4`}>
        {items.map((m) => (
          <article key={m.id} className="menu-card group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5 transition hover:shadow-xl">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-ink">{m.name}</h3>
              <p className="mt-1 min-h-[3rem] text-sm text-ink/65">{m.note}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-xl font-extrabold text-pepper">{naira(m.price)}</span>
                <button onClick={onAdd} className="rounded-full bg-gold px-4 py-2 text-sm font-bold text-ink transition hover:bg-pepper hover:text-white">
                  Add to order
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
