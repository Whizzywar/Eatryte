import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP, motionOK } from "../lib/motion";
import PageHeader from "../components/PageHeader";
import { POSTS, IMG } from "../data";

/*
  Each post needs: slug, title, excerpt, img, date.
  Optional: category (adds the filter chips and the tag on each story).
  Dates written like "2025-03-14" are shown as "14 March 2025"; any other text is shown as it is.
*/
const fmtDate = (d) =>
  /^\d{4}-\d{2}-\d{2}/.test(d || "")
    ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : d;

const CATS = [...new Set(POSTS.map((p) => p.category).filter(Boolean))];

function Meta({ post, className = "" }) {
  const bits = [fmtDate(post.date), post.category].filter(Boolean);
  return <p className={`text-sm text-ink/55 ${className}`}>{bits.join("  ·  ")}</p>;
}

export default function Blog() {
  const root = useRef(null);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const term = q.trim().toLowerCase();
  const filtering = term !== "" || cat !== "All";

  const list = useMemo(
    () =>
      POSTS.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (!term || `${p.title} ${p.excerpt}`.toLowerCase().includes(term)),
      ),
    [cat, term],
  );
  const [first, ...rest] = list;

  // Gentle scroll-in for ".rv" elements (replays when the category changes)
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
    { scope: root, dependencies: [cat] },
  );

  return (
    <div ref={root}>
      <PageHeader
        title="Blog"
        subtitle="News, recipes and stories from the Eatryte kitchen."
        image={IMG.blog}
      />

      <section className="bg-paper px-5 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Toolbar: category chips (if your posts have categories) and search */}
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            {CATS.length > 0 ? (
              <div
                role="group"
                aria-label="Filter stories"
                className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
              >
                {["All", ...CATS].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    aria-pressed={cat === c}
                    className={`shrink-0 rounded-full border-2 px-5 py-2 text-sm font-bold transition ${
                      cat === c
                        ? "border-leaf bg-leaf text-white"
                        : "border-ink/10 bg-white text-ink hover:border-leaf"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            ) : (
              <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Latest stories</h2>
            )}

            <div className="w-full md:max-w-xs">
              <label htmlFor="blog-search" className="sr-only">Search stories</label>
              <input
                id="blog-search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search stories..."
                className="w-full rounded-full border-2 border-ink/10 bg-white px-5 py-3 outline-none transition placeholder:text-ink/40 focus:border-leaf"
              />
            </div>
          </div>

          {list.length === 0 ? (
            <div role="status" className="mt-12 rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-ink/5">
              <h2 className="font-display text-2xl font-bold text-ink">No stories found</h2>
              <p className="mt-2 text-ink/65">Try a different word, or clear your search.</p>
              <button
                onClick={() => {
                  setQ("");
                  setCat("All");
                }}
                className="mt-6 rounded-full bg-pepper px-6 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
              >
                Show all stories
              </button>
            </div>
          ) : (
            <>
              {/* Featured story */}
              <Link
                to={`/blog/${first.slug}`}
                className="rv group mt-10 grid overflow-hidden rounded-3xl bg-white shadow-xl shadow-ink/5 ring-1 ring-ink/5 lg:grid-cols-2"
              >
                <div className="relative min-h-[260px] overflow-hidden sm:min-h-[340px] lg:min-h-[480px]">
                  <img
                    src={first.img}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-pepper px-4 py-1.5 text-xs font-bold text-white">
                    {filtering ? "Top match" : "Latest story"}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                  <Meta post={first} />
                  <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink transition group-hover:text-pepper sm:text-4xl lg:text-5xl">
                    {first.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-ink/70">{first.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-bold text-leaf">
                    Read the story
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>

              {/* Story list + sidebar */}
              <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-8">
                  <h2 className="rv font-display text-2xl font-bold text-ink md:text-3xl">More stories</h2>
                  <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                    {rest.length === 0 && (
                      <p className="py-8 text-ink/60">That is everything for now. Check back soon.</p>
                    )}
                    {rest.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/blog/${p.slug}`}
                        className="rv group grid gap-5 py-7 sm:grid-cols-[230px_1fr] sm:gap-7"
                      >
                        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-ink/10">
                          <img
                            src={p.img}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <Meta post={p} />
                          <h3 className="mt-2 font-display text-2xl font-bold leading-snug text-ink transition group-hover:text-pepper">
                            {p.title}
                          </h3>
                          <p className="mt-2 text-ink/70">{p.excerpt}</p>
                          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-leaf">
                            Read more
                            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <aside className="space-y-8 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
                  

                  <div className="rv rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5 md:p-8">
                    <h2 className="font-display text-xl font-bold text-leaf">Recent stories</h2>
                    <ul className="mt-5 space-y-5">
                      {POSTS.slice(0, 4).map((p) => (
                        <li key={p.slug}>
                          <Link to={`/blog/${p.slug}`} className="group flex items-center gap-4">
                            <img
                              src={p.img}
                              alt=""
                              loading="lazy"
                              className="h-16 w-16 shrink-0 rounded-xl object-cover"
                            />
                            <span>
                              <span className="block font-display font-bold leading-snug text-ink transition group-hover:text-pepper">
                                {p.title}
                              </span>
                              <span className="mt-0.5 block text-xs text-ink/55">{fmtDate(p.date)}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}