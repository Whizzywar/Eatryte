import PageHeader from "../components/PageHeader";
import MenuGrid from "../components/MenuGrid";

export default function OurMenu() {
  return (
    <>
      <PageHeader title="Our Menu" subtitle="Chicken, rice, fresh bread, pastries and snacks. Add what you like and we will get it ready." />
      <section className="bg-paper px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl"><MenuGrid /></div>
      </section>
    </>
  );
}
