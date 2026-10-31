import { useState } from "react";
import PageHeader from "../components/PageHeader";

const field = "w-full rounded-2xl border-2 border-ink/10 bg-white px-4 py-3 outline-none transition focus:border-leaf";

export default function Contact() {
  const [sent, setSent] = useState(false);

  // Connect this to your backend, Formspree, EmailJS, etc.
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Questions, bulk orders or feedback? Send us a message." />
      <section className="bg-paper px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-5">
          <div className="space-y-6 md:col-span-2">
            <div>
              <h2 className="font-display text-xl font-bold text-leaf">Visit us</h2>
              <p className="mt-2 text-ink/75">#Arochukwu Street by Umuwayo Road<br />Umuahia, Abia State, Nigeria</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-leaf">Call or write</h2>
              <p className="mt-2 text-ink/75">
                <a href="tel:+2349083500000" className="hover:text-pepper">(+234) 9083500000</a><br />
                <a href="mailto:info@eatryte.com" className="hover:text-pepper">info@eatryte.com</a>
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-leaf">Opening hours</h2>
              <p className="mt-2 text-ink/75">Monday to Saturday: 8am to 9pm<br />Sunday: 12pm to 8pm</p>
              <p className="mt-1 text-sm text-ink/50">Placeholder hours. Replace with your real ones.</p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-5 md:col-span-3">
            {sent ? (
              <div role="status" className="rounded-3xl bg-leaf p-8 text-white">
                <h2 className="font-display text-2xl font-bold">Message sent</h2>
                <p className="mt-2 text-white/85">Thank you. We will reply as soon as we can.</p>
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-bold text-ink">Your name</label>
                  <input id="name" required className={field} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-bold text-ink">Email address</label>
                  <input id="email" type="email" required className={field} />
                </div>
                <div>
                  <label htmlFor="msg" className="mb-1 block text-sm font-bold text-ink">Message</label>
                  <textarea id="msg" rows="6" required className={field} />
                </div>
                <button className="rounded-full bg-pepper px-8 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-xl">
                  Send message
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
