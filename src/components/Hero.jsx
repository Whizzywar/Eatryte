import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP, motionOK } from "../lib/motion";
import { IMG } from "../data";

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (!motionOK()) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-bg", { scale: 1.15, duration: 2, ease: "power2.out" }, 0)
        .from(
          ".hero-line > span",
          { yPercent: 110, duration: 1, stagger: 0.12 },
          0.2,
        )
        .from(".hero-sub", { autoAlpha: 0, y: 20, duration: 0.7 }, "-=0.5")
        .from(
          ".hero-cta",
          { autoAlpha: 0, y: 20, stagger: 0.1, duration: 0.6 },
          "-=0.5",
        )
        .from(
          ".hero-plate",
          {
            scale: 0.6,
            rotate: -25,
            autoAlpha: 0,
            duration: 1.2,
            ease: "back.out(1.4)",
          },
          0.4,
        )
        .from(
          ".hero-chip",
          { scale: 0, stagger: 0.12, duration: 0.5, ease: "back.out(2)" },
          "-=0.4",
        );

      gsap.to(".hero-spin", {
        rotate: 360,
        duration: 24,
        repeat: -1,
        ease: "none",
      });

      // Gentle floating motion on the chips
      gsap.to(".hero-chip", {
        y: -6,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: { each: 0.4, from: "start" },
      });

      // Parallax: background drifts slower than the page, plate drifts down a little
      const scrub = {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(".hero-bg", { yPercent: 15, ease: "none", scrollTrigger: scrub });
      gsap.to(".hero-plate", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: scrub,
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-svh items-center overflow-hidden text-white"
    >
      {/* Background image */}
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMG.hero})` }}
        aria-hidden="true"
      />
      {/* Dark overlay so text and plate stay readable. Delete this line for the raw image. */}
      <div
        className="absolute inset-0 bg-linear-to-r from-ink/75 via-ink/50 to-ink/30"
        aria-hidden="true"
      />

      {/* Tighter spacing on phones, roomier from sm and up */}
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-6 px-5 pb-12 pt-24 sm:gap-10 sm:pb-16 sm:pt-32 md:grid-cols-2 md:px-8 lg:pb-20">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-[0.95] tracking-tight min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
            {["A safe haven", "for a sweet", "or savory treat."].map((l) => (
              <span key={l} className="hero-line block overflow-hidden pb-1">
                <span className="block">{l}</span>
              </span>
            ))}
          </h1>
          <p className="hero-sub mt-4 max-w-md text-base text-white/90 sm:mt-6 sm:text-lg">
            Eat Right! It's fresh, it's fluffy and delicious.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <Link
              to="/menu"
              className="hero-cta rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:shadow-xl sm:px-7 sm:py-3.5 sm:text-base"
            >
              Place your order now!
            </Link>
            <Link
              to="/our-story"
              className="hero-cta rounded-full border-2 border-white/70 px-6 py-3 text-sm font-bold transition hover:bg-white hover:text-ink sm:px-7 sm:py-3.5 sm:text-base"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Plate, spinning text and floating chips.
            Smaller on phones, capped on large screens so it never dominates. */}
        <div className="relative mx-auto aspect-square w-[min(68vw,15rem)] sm:w-72 md:w-full md:max-w-sm lg:max-w-md xl:max-w-lg">
          <div className="hero-plate absolute inset-[7%] overflow-hidden rounded-full border-4 border-gold shadow-2xl sm:border-8">
            <img
              src={IMG.pasta}
              alt="Eatryte chicken and rice plate"
              className="h-full w-full object-cover"
            />
          </div>
          <svg
            className="hero-spin absolute inset-0 h-full w-full"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <defs>
              <path
                id="hero-circle"
                d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0"
              />
            </defs>
            <text className="fill-white font-display text-[11px] font-bold tracking-[0.35em]">
              <textPath href="#hero-circle">
                FRESH BREAD • GRILLED CHICKEN • PASTRIES • RICE • SNACKS •
              </textPath>
            </text>
          </svg>
          <span className="hero-chip absolute -left-2 top-[22%] whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink shadow-lg sm:left-0 sm:px-4 sm:py-2 sm:text-sm">
            Baked today
          </span>
          <span className="hero-chip absolute -right-2 bottom-[16%] whitespace-nowrap rounded-full bg-leaf px-3 py-1.5 text-xs font-bold shadow-lg sm:right-0 sm:px-4 sm:py-2 sm:text-sm">
            Fast. Fun. Yummy.
          </span>
        </div>
      </div>
    </section>
  );
}
