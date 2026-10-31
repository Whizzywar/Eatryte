import { useRef } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion";

export default function PageHeader({ title, subtitle }) {
  const root = useRef(null);
  useGSAP(() => {
    if (!motionOK()) return;
    gsap.from(".ph > *", { y: 40, autoAlpha: 0, stagger: 0.12, duration: 0.8, ease: "power3.out" });
  }, { scope: root });

  return (
    <section ref={root} className="bg-pepper px-5 pb-16 pt-32 text-white md:px-8 md:pb-24 md:pt-40">
      <div className="ph mx-auto max-w-7xl">
        <h1 className="font-display text-5xl font-extrabold leading-none tracking-tight md:text-7xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-xl text-lg text-white/90">{subtitle}</p>}
      </div>
    </section>
  );
}
