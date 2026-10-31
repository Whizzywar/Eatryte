import PageHeader from "../components/PageHeader";
import StorySection from "../components/StorySection";
import Banner from "../components/Banner";

export default function OurStory() {
  return (
    <>
      <PageHeader title="Our Story" subtitle="A safe haven for a sweet or savory treat, built on food you can trust." />
      <section className="bg-paper px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-ink/80">
          <p>Eatryte started with a simple idea: everyone deserves a place to fill their stomach with food that is fresh, fluffy and delicious.</p>
          <p>From our home in Umuahia, our bakers and cooks prepare bread, pastries, grilled chicken, rice and snacks every day. Pastries that are pleasant to your body, mind, soul and stomach.</p>
          <p>Replace this text with your own history, founders and milestones.</p>
        </div>
      </section>
      <StorySection />
      <Banner />
    </>
  );
}
