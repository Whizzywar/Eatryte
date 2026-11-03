import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import MenuGrid from "../components/MenuGrid";
import StorySection from "../components/StorySection";
import Banner from "../components/Banner";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <section className="bg-paper px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="max-w-xl font-display text-4xl font-extrabold leading-tight text-leaf md:text-5xl">
                Food to put you in the right mood
              </h2>
              <p className="mt-3 text-ink/70">
                A satisfied stomach is a happy one.
              </p>
            </div>
            <Link
              to="/menu"
              className="rounded-full border-2 border-leaf px-6 py-2.5 text-sm font-bold text-leaf transition hover:bg-leaf hover:text-white"
            >
              See the full menu
            </Link>
          </div>
          <MenuGrid limit={8} />
        </div>
      </section>
      <StorySection />
      <Banner />
    </>
  );
}
