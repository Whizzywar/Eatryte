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
      {/* Background image */}
      <div
        className="ph-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      {/* Even dark overlay so centered text stays readable. Delete this block for the raw image. */}
      <div className="absolute inset-0 bg-ink/60" aria-hidden="true" />

      {/* Centered content */}
      <div className="ph relative mx-auto flex max-w-7xl flex-col items-center px-5 pb-14 pt-28 text-center sm:pb-20 sm:pt-32 md:px-8 md:pb-28 md:pt-40">
        <h1 className="max-w-4xl text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl text-balance text-base text-white/90 sm:mt-5 sm:max-w-2xl sm:text-lg md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}