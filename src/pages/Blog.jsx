import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { POSTS } from "../data";

export default function Blog() {
  return (
    <>
      <PageHeader title="Blog" subtitle="News, recipes and stories from the Eatryte kitchen." />
      <section className="bg-paper px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {POSTS.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5 transition hover:shadow-xl">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <p className="text-sm text-ink/55">{p.date}</p>
                <h2 className="mt-2 font-display text-xl font-bold text-ink group-hover:text-pepper">{p.title}</h2>
                <p className="mt-2 text-ink/70">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
