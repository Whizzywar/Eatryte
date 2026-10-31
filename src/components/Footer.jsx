import { useState } from "react";
import { Link } from "react-router-dom";
import { NAV } from "../data";

const PRODUCTS = ["Chicken & Sauce", "Cake & Bread", "Rice & Soup", "Burger & Pies", "Pizza & Shawarma", "Pop-Corn & Ice Cream"];
const SOCIAL = ["Twitter", "YouTube", "Facebook", "Instagram"];

export default function Footer() {
  const [sent, setSent] = useState(false);
  return (
    <footer className="bg-ink px-5 pt-16 text-white/80 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-display text-3xl font-extrabold text-white">Eatryte</p>
          <p className="mt-1 text-gold">Simply different.</p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 flex max-w-sm gap-2">
            <label htmlFor="news-email" className="sr-only">Email address</label>
            <input id="news-email" type="email" required placeholder="Your email address"
              className="min-w-0 flex-1 rounded-full bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/50 focus:ring-2 focus:ring-gold" />
            <button className="rounded-full bg-gold px-5 text-sm font-bold text-ink">{sent ? "Subscribed" : "Subscribe"}</button>
          </form>
        </div>
        <div>
          <h3 className="mb-3 font-display font-bold text-white">Useful links</h3>
          <ul className="space-y-2 text-sm">
            {NAV.map(([l, to]) => <li key={to}><Link to={to} className="hover:text-gold">{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-display font-bold text-white">Products</h3>
          <ul className="space-y-2 text-sm">
            {PRODUCTS.map((l) => <li key={l}><Link to="/menu" className="hover:text-gold">{l}</Link></li>)}
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="mb-3 font-display font-bold text-white">Address</h3>
          <p>#Arochukwu Street by Umuwayo Road</p>
          <p>Umuahia, Abia State, Nigeria</p>
          <p className="mt-2"><a href="mailto:info@eatryte.com" className="hover:text-gold">info@eatryte.com</a></p>
          <p><a href="tel:+2349083500000" className="hover:text-gold">(+234) 9083500000</a></p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SOCIAL.map((s) => (
              <a key={s} href="#" className="rounded-full border border-white/25 px-3 py-1 text-xs transition hover:border-gold hover:text-gold">{s}</a>
            ))}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-white/15 py-6 text-xs text-white/55">
        © 2023 Eatryte – simply different. Powered by Whizzyware Technologies
      </p>
    </footer>
  );
}
