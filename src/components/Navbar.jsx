import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { gsap, useGSAP, motionOK } from "../lib/motion";
import { IMG, NAV } from "../data";
import { useCart } from "../context/CartContext";

// Put your logo in /public/Images. The text wordmark shows if the file is missing.
const LOGO_SRC = "/Images/Eatryte-.png";

// Same image as the hero banner, with a dark tint so the white text stays readable.
const bannerBg = {
  backgroundImage: `linear-gradient(rgba(29,26,23,0.68), rgba(29,26,23,0.68)), url(${IMG.hero})`,
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoOk, setLogoOk] = useState(true);
  const panel = useRef(null);
  const badge = useRef(null);
  const { count } = useCart();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close the mobile menu if the window grows to desktop size (matches the lg breakpoint)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useGSAP(() => {
    gsap.to(panel.current, {
      yPercent: open ? 0 : -100,
      autoAlpha: open ? 1 : 0,
      duration: motionOK() ? 0.45 : 0,
      ease: "power3.out",
    });
  }, [open]);

  useGSAP(
    () => {
      if (count > 0 && motionOK())
        gsap.fromTo(
          badge.current,
          { scale: 1.8 },
          { scale: 1, duration: 0.5, ease: "back.out(3)" },
        );
    },
    { dependencies: [count] },
  );

  const link = ({ isActive }) =>
    `whitespace-nowrap text-sm font-medium transition hover:text-gold xl:text-base ${isActive ? "text-gold" : "text-white/90"}`;

  const showBg = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white">
      {/* Banner image layer: transparent at the top of the page, fades in on scroll or when the mobile menu opens */}
      <div
        aria-hidden="true"
        style={bannerBg}
        className={`absolute inset-0 -z-10 bg-cover bg-center shadow-lg transition-opacity duration-300 ${showBg ? "opacity-100" : "opacity-0"}`}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-5 md:px-8 lg:py-3">
        {/* Logo (left) */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          aria-label="Eatryte home"
          className="flex shrink-0 items-center"
        >
          {logoOk ? (
            <img
              src={LOGO_SRC}
              alt="Eatryte"
              onError={() => setLogoOk(false)}
              className="h-9 w-auto object-contain sm:h-11 lg:h-12"
            />
          ) : (
            <span className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
              Eatryte
            </span>
          )}
        </Link>

        {/* Desktop links: from lg up, so tablets use the menu button and never get crowded */}
        <nav
          className="hidden items-center gap-6 lg:flex xl:gap-8"
          aria-label="Main"
        >
          {NAV.map(([label, to]) => (
            <NavLink key={to} to={to} className={link}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/menu"
            className="relative rounded-full bg-gold px-4 py-2 text-sm font-bold text-ink transition hover:scale-105"
          >
            Order
            <span
              ref={badge}
              className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-leaf px-1 text-xs text-white"
            >
              {count}
            </span>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/40 lg:hidden"
          >
            <span className="block h-0.5 w-5 bg-white shadow-[0_6px_0_#fff,0_-6px_0_#fff]" />
          </button>
        </div>
      </div>

      {/* Mobile and tablet menu: hangs below the bar so it never adds to the header's height */}
      <div
        id="mobile-nav"
        ref={panel}
        style={bannerBg}
        className="invisible absolute inset-x-0 top-full max-h-[calc(100svh-4rem)] overflow-y-auto bg-cover bg-center px-5 pb-6 pt-2 shadow-xl md:px-8 lg:hidden"
      >
        {NAV.map(([label, to]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block border-b border-white/15 py-3 font-display text-xl ${isActive ? "text-gold" : ""}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
