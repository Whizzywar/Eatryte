import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaXTwitter,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";
import { NAV } from "../data";

// Put your logo in /public/Images. The text wordmark shows if the file is missing.
const LOGO_SRC = "/Images/Eatryte-simply-different.png";

const PRODUCTS = [
  "Chicken & Sauce",
  "Cake & Bread",
  "Rice & Soup",
  "Burger & Pies",
  "Pizza & Shawarma",
  "Pop-Corn & Ice Cream",
];

const SOCIAL = [
  { name: "Twitter", href: "#", Icon: FaXTwitter },
  { name: "YouTube", href: "#", Icon: FaYoutube },
  { name: "Facebook", href: "#", Icon: FaFacebookF },
  { name: "Instagram", href: "#", Icon: FaInstagram },
];

const CONTACT_ICON = "mt-0.5 h-4 w-4 shrink-0 text-gold";

export default function Footer() {
  const [sent, setSent] = useState(false);
  const [logoOk, setLogoOk] = useState(true);

  return (
    // flow-root stops the band's negative margin from collapsing through the footer
    <footer className="relative flow-root bg-leaf text-white/80">
      {/* Decorative glows + giant watermark (clipped in its own layer so the band can overlap the section above) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-pepper/20 blur-3xl" />
        <span className="absolute inset-x-0 bottom-[0.18em] select-none text-center font-display text-[24vw] font-extrabold leading-none tracking-tighter text-white/4">
          EATRYTE
        </span>
      </div>

      {/* Newsletter band, overlapping the top edge of the footer */}
      <div className="relative z-10 -mt-14 px-5 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-4xl bg-gold p-7 text-ink shadow-2xl md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-md">
            <h2 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">
              Fresh news, hot from the oven
            </h2>
            <p className="mt-1 text-ink/75">
              New dishes, offers and bakes. No spam, promise.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="Your email address"
              className="min-w-0 flex-1 rounded-full border-2 border-transparent bg-white px-5 py-3.5 text-sm outline-none placeholder:text-ink/45 focus:border-leaf"
            />
            <button className="rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white transition hover:bg-leaf">
              {sent ? "Subscribed ✓" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Main columns: logo on the left */}
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 pb-14 pt-16 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" aria-label="Eatryte home" className="inline-block">
            {logoOk ? (
              <img
                src={LOGO_SRC}
                alt="Eatryte – simply different"
                onError={() => setLogoOk(false)}
                className="h-20 w-auto object-contain"
              />
            ) : (
              <span className="block font-display text-4xl font-extrabold text-white">
                Eatryte
              </span>
            )}
          </Link>
          <p className="mt-5 max-w-xs leading-relaxed text-white/70">
            A safe haven for a sweet or savory treat. Fresh bread, grilled
            chicken and pastries, made with care in Umuahia.
          </p>
          <ul className="mt-6 flex gap-3">
            {SOCIAL.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  aria-label={s.name}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink"
                >
                  <s.Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
          <nav aria-label="Footer">
            <h3 className="mb-4 font-display text-lg font-bold text-white">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              {NAV.map(([l, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group inline-flex items-center gap-2 transition hover:text-gold"
                  >
                    <span className="h-px w-3 bg-gold/60 transition-all group-hover:w-5" />
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-white">
              Our menu
            </h3>
            <ul className="space-y-3 text-sm">
              {PRODUCTS.map((l) => (
                <li key={l}>
                  <Link
                    to="/menu"
                    className="group inline-flex items-center gap-2 transition hover:text-gold"
                  >
                    <span className="h-px w-3 bg-gold/60 transition-all group-hover:w-5" />
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-4 font-display text-lg font-bold text-white">
              Find us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <FaLocationDot className={CONTACT_ICON} aria-hidden="true" />
                <span>
                  #Arochukwu Street by Umuwayo Road, Umuahia, Abia State,
                  Nigeria
                </span>
              </li>

              <li className="flex gap-3">
                <FaEnvelope className={CONTACT_ICON} aria-hidden="true" />
                <a
                  href="mailto:info@eatryte.com"
                  className="transition hover:text-gold"
                >
                  info@eatryte.com
                </a>
              </li>
              <li className="flex gap-3">
                <FaPhone className={CONTACT_ICON} aria-hidden="true" />
                <a
                  href="tel:+2349083500000"
                  className="transition hover:text-gold"
                >
                  (+234) 9083500000
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center text-xs text-white/60 md:flex-row md:px-8 md:text-left">
          <p>
            © 2023 Eatryte – simply different. Powered by Whizzyware
            Technologies
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 font-bold text-white transition hover:border-gold hover:text-gold"
          >
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
