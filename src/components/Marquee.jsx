import { useRef } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion";

const WORDS = ["Fresh bread", "Chicken & rice", "Pastries", "Burgers & pies", "Pizza & shawarma", "Pop-corn & ice cream"];

export default function Marquee() {
  const track = useRef(null);

  useGSAP(() => {
    if (!motionOK()) return;
    const tween = gsap.to(track.current, { xPercent: -50, duration: 28, repeat: -1, ease: "none" });
    const el = track.current.parentElement;
    el.onmouseenter = () => gsap.to(tween, { timeScale: 0.2, duration: 0.4 });
    el.onmouseleave = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
  });

  return (
    <div className="overflow-hidden bg-gold py-4 text-ink" aria-hidden="true">
      <div ref={track} className="flex w-max whitespace-nowrap font-display text-2xl font-extrabold">
        {[...WORDS, ...WORDS, ...WORDS, ...WORDS].map((w, i) => (
          <span key={i} className="mx-6">{w}<span className="ml-12 text-pepper">✺</span></span>
        ))}
      </div>
    </div>
  );
}
