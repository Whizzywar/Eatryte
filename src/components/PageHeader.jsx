import { useRef } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion";
import { IMG } from "../data";

// Banner at the top of every inner page. Pass `image` to use a different photo on a page;
// it defaults to the same image as the home hero.
export default function PageHeader({ title, subtitle, image = IMG.hero }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (!motionOK()) return;
      gsap.from(".ph-bg", { scale: 1.12, duration: 1.8, ease: "power2.out" });
      gsap.from(".ph > *", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden text-white">
      {/* Background image (replaces the old solid orange) */}
      <div
        className="ph-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      {/* Dark overlay so the title stays readable. Delete this line for the raw image. */}
      <div
        className="absolute inset-0 bg-linear-to-r from-ink/75 via-ink/55 to-ink/40"
        aria-hidden="true"
      />

      <div className="ph relative mx-auto max-w-7xl px-5 pb-12 pt-28 sm:pb-16 sm:pt-32 md:px-8 md:pb-24 md:pt-40">
        <h1 className="font-display text-4xl font-extrabold leading-none tracking-tight sm:text-5xl md:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl text-base text-white/90 sm:mt-5 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
