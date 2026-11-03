import { useRef, useState } from "react";
import { FaUtensils } from "react-icons/fa6";
import { gsap, useGSAP, motionOK, naira } from "../lib/motion";
import { CATEGORIES, MENU } from "../data";
import { useCart } from "../context/CartContext";

// Shows the dish photo, or a neutral placeholder if the file is missing or fails to load.
function Thumb({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className="grid h-full w-full place-items-center bg-leaf/10 text-leaf/40"
        role="img"
        aria-label={alt}
      >
        <FaUtensils className="h-10 w-10" aria-hidden="true" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
    />
  );
}

// `limit` shows only the first N items and hides the category tabs (used on the home page).
// Pass limit={MENU.length} (or remove it) on the home page to show every dish.
export default function MenuGrid({ limit }) {
  const [cat, setCat] = useState("All");
  const grid = useRef(null);
  const { add } = useCart();

  let items = cat === "All" ? MENU : MENU.filter((m) => m.cat === cat);
  if (limit) items = items.slice(0, limit);

  useGSAP(
    () => {
      if (!motionOK()) return;
      gsap.from(".menu-card", {
        autoAlpha: 0,
        y: 28,
        scale: 0.97,
        stagger: 0.06,
        duration: 0.5,
        ease: "power3.out",
        // Remove the inline styles afterwards so a card can never stay hidden
        clearProps: "opacity,visibility,transform",
      });
    },
    { scope: grid, dependencies: [cat] },
  );

  const onAdd = (e) => {
    add();
    if (motionOK())
      gsap.fromTo(
        e.currentTarget,
        { scale: 0.85 },
        { scale: 1, duration: 0.5, ease: "elastic.out(1.2,0.4)" },
      );
  };

  return (
    <div>
      {!limit && (
        <div
          role="tablist"
          aria-label="Menu categories"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0 [scrollbar-width:none]"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border-2 px-5 py-2 text-sm font-bold transition ${
                cat === c
                  ? "border-leaf bg-leaf text-white"
                  : "border-leaf/25 text-leaf hover:border-leaf"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div
        ref={grid}
        className={`${limit ? "" : "mt-6 sm:mt-10"} grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4`}
      >
        {items.map((m) => (
          <article
            key={m.id}
            className="menu-card group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5 transition hover:shadow-xl"
          >
            <div className="aspect-4/3 overflow-hidden">
              <Thumb src={m.img} alt={m.name} />
            </div>

            {/* Bottom padding is the same as the sides, with no reserved empty space under the text */}
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <h3 className="font-display text-lg font-bold text-ink">
                {m.name}
              </h3>
              {/* Equal-height note area only when cards sit side by side (sm and up) */}
              <p className="mt-1 text-sm text-ink/65 sm:min-h-12">{m.note}</p>
              <div className="mt-3 flex items-center justify-between sm:mt-auto sm:pt-4">
                <span className="font-display text-xl font-extrabold text-pepper">
                  {naira(m.price)}
                </span>
                <button
                  onClick={onAdd}
                  className="rounded-full bg-gold px-4 py-2 text-sm font-bold text-ink transition hover:bg-pepper hover:text-white"
                >
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
