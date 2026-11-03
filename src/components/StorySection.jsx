import { useRef } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion";
import { IMG } from "../data";

const POINTS = [
  ["Fresh bread", "Our loaves are baked by professional bakers, all day long."],
  [
    "Chicken & rice",
    "Fresh grilled chicken with well-garnished rice and savory vegetables.",
  ],
  [
    "Quick as a flash",
    "Swing by for a tasty bite, however busy your day is. Eatryte before you shoprite!",
  ],
];

export default function StorySection() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (!motionOK()) return;
      gsap.fromTo(
        ".story-img",
        { clipPath: "inset(0 100% 0 0 round 2rem)" },
        {
          clipPath: "inset(0 0% 0 0 round 2rem)",
          duration: 1.3,
          ease: "power4.inOut",
          scrollTrigger: { trigger: root.current, start: "top 65%" },
        },
      );
      gsap.to(".story-img img", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="bg-leaf px-5 py-20 text-white md:px-8 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div className="story-img aspect-4/5 overflow-hidden">
          <img
            src={IMG.bread}
            alt="Fresh bread from the Eatryte bakery"
            className="h-[115%] w-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
            The food you can trust
          </h2>
          <p className="mt-4 max-w-md text-white/80">
            Comfort food for your hungry soul.
          </p>
          <dl className="mt-10 space-y-7">
            {POINTS.map(([t, d]) => (
              <div key={t} className="border-l-4 border-gold pl-5">
                <dt className="font-display text-xl font-bold">{t}</dt>
                <dd className="mt-1 max-w-md text-white/75">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
