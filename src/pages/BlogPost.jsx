import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { POSTS } from "../data";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return <NotFound />;

  return (
    <>
      <PageHeader title={post.title} subtitle={post.date} />
      <article className="bg-paper px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <img src={post.img} alt="" className="mb-10 aspect-[16/9] w-full rounded-3xl object-cover" />
          <div className="space-y-5 text-lg leading-relaxed text-ink/80">
            {post.body.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <Link to="/blog" className="mt-10 inline-block rounded-full border-2 border-leaf px-6 py-2.5 text-sm font-bold text-leaf transition hover:bg-leaf hover:text-white">
            Back to the blog
          </Link>
        </div>
      </article>
    </>
  );
}
