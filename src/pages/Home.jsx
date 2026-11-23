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
      <section className="bg-paper px-5 py-16 sm:py-20 md:px-8 md:py-28">
  <div className="mx-auto max-w-7xl">
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <h2 className="font-display text-3xl font-extrabold leading-tight text-leaf sm:text-4xl md:text-5xl">
        Food to put you in the right mood
      </h2>
      <p className="mt-3 text-base text-ink/70 sm:text-lg">
        A satisfied stomach is a happy one.
      </p>
    </div>

    <MenuGrid limit={8} />

    <div className="mt-10 text-center md:mt-12">
      <Link
        to="/menu"
        className="inline-block rounded-full border-2 border-leaf px-7 py-3 text-sm font-bold text-leaf transition hover:bg-leaf hover:text-white"
      >
        See the full menu
      </Link>
    </div>
  </div>
</section>
      <StorySection />
      <Banner />
    </>
  );
}
