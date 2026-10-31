import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP, motionOK } from "../lib/motion";
import { IMG } from "../data";

export default function Banner() {
  const root = useRef(null);
  const btn = useRef(null);
  const { contextSafe } = useGSAP({ scope: root });

  const move = contextSafe((e) => {
    if (!motionOK()) return;
    const r = btn.current.getBoundingClientRect();
    gsap.to(btn.current, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4 });
  });
  const leave = contextSafe(() => gsap.to(btn.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" }));

  return (
    <section ref={root} className="relative overflow-hidden px-5 py-24 text-center text-white md:px-8">
      <img src={IMG.snack} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="relative mx-auto max-w-3xl">
        <h2 className="font-display text-4xl font-extrabold leading-tight md:text-6xl">Feel the joy of mouthwatering dishes</h2>
        <p className="mt-4 text-lg text-white/85">Our menu offers a plethora of dishes, flavours and pastries.</p>
        <Link ref={btn} to="/menu" onMouseMove={move} onMouseLeave={leave} className="mt-8 inline-block rounded-full bg-gold px-9 py-4 font-bold text-ink">
          See the full menu
        </Link>
      </div>
    </section>
  );
}
