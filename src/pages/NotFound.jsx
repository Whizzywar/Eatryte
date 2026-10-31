import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" subtitle="That page does not exist or has moved." />
      <section className="bg-paper px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Link to="/" className="rounded-full bg-gold px-7 py-3.5 font-bold text-ink">Back to home</Link>
        </div>
      </section>
    </>
  );
}
