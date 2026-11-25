import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP, motionOK } from "../lib/motion";
import { IMG } from "../data";

/*
  Edit the slides here.
  - img:    the photo (use a different IMG key, or a path in /public, for each slide)
  - kicker: the small line above the headline
  - lines:  the headline, one string per line. Put *stars* around words to show them in gold italic.
  - text:   the short caption under the headline
*/
const SLIDES = [
  {
    img: IMG.hero,
    kicker: "Eatryte · Umuahia",
    lines: ["A safe haven", "for a *sweet*", "or *savory* treat."],
    text: "Eat Right! It's fresh, it's fluffy and delicious.",
  },
  {
    img: IMG.bread,
    kicker: "From our ovens",
    lines: ["Fresh *bread*,", "baked all day long."],
    text: "Soft, fluffy loaves and pastries, fresh from our ovens.",
  },
  {
    img: IMG.burger,
    kicker: "From our grills",
    lines: ["Flame-grilled", "and full of *flavor*."],
    text: "Burgers and grilled chicken, made fresh and served hot.",
  },
  {
    img: IMG.pasta,
    kicker: "From our kitchen",
    lines: ["Chicken & rice,", "the way you *love* it."],
    text: "Well-garnished rice with grilled chicken and savory vegetables.",
  },
];

const DURATION = 6.5; // seconds each slide stays on screen

// Turns "or *savory* treat." into text with the starred word in gold italic
const renderLine = (line) =>
  line.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") ? (
      <em key={i} className="font-semibold italic text-gold">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    ),
  );


export default function Hero() {
  const root = useRef(null);
  const api = useRef({});
  const touch = useRef({ x: 0, y: 0 });
  const [canAnimate] = useState(motionOK);
  const [index, setIndex] = useState(0);
  const playingRef = useRef(canAnimate);

  useGSAP(
    (context, contextSafe) => {
      const q = gsap.utils.selector(root);
      const slides = q(".hero-slide");
      const caps = q(".hero-caption");
      const bars = q(".hero-bar-fill");
      const n = slides.length;
      const animate = motionOK();
      let cur = 0;
      let busy = false;
      let hovering = false;
      let progress = null;

      // Load the other photos in advance so a slide never appears blank
      SLIDES.forEach((s) => {
        const im = new Image();
        im.src = s.img;
      });

      // Starting state: only the first slide is visible
      gsap.set(slides, { autoAlpha: 0 });
      gsap.set(slides[0], { autoAlpha: 1 });
      gsap.set(caps, { autoAlpha: 0 });
      gsap.set(caps[0], { autoAlpha: 1 });
      gsap.set(bars, { transformOrigin: "0% 50%", scaleX: 0 });

      const resetBars = (i) =>
        gsap.set(bars, { scaleX: (j) => (j < i || (j === i && !playingRef.current) ? 1 : 0) });

      // The progress bar of the current slide doubles as the autoplay timer
      const startProgress = contextSafe((i) => {
        progress?.kill();
        if (!animate || !playingRef.current) return;
        progress = gsap.to(bars[i], {
          scaleX: 1,
          duration: DURATION,
          ease: "none",
          onComplete: () => go(i + 1, 1),
        });
        if (hovering) progress.pause();
      });

      const kenBurns = (bg, delay) =>
        gsap.to(bg, { scale: 1.16, duration: DURATION + 1.5, ease: "none", delay });

      const go = contextSafe((to, dir = 1) => {
        const next = (to + n) % n;
        if (busy || next === cur) return;
        const prev = cur;
        cur = next;
        setIndex(next);
        progress?.kill();
        resetBars(next);

        // No motion wanted: switch instantly
        if (!animate) {
          gsap.set(slides, { autoAlpha: 0 });
          gsap.set(caps, { autoAlpha: 0 });
          gsap.set(slides[next], { autoAlpha: 1 });
          gsap.set(caps[next], { autoAlpha: 1 });
          return;
        }

        busy = true;
        const inBg = slides[next].querySelector(".hero-bg");
        const inCap = caps[next];
        const outCap = caps[prev];

        gsap.killTweensOf(inBg);
        gsap.set(inBg, { scale: 1.3 });
        gsap.set(slides[next], {
          autoAlpha: 1,
          zIndex: 2,
          clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
        });
        gsap.set(slides[prev], { zIndex: 1 });
        gsap.set(inCap, { autoAlpha: 1 });

        gsap
          .timeline({
            onComplete: () => {
              gsap.set(slides[prev], { autoAlpha: 0 });
              gsap.set(slides[next], { clearProps: "clipPath,zIndex" });
              gsap.set(outCap, { y: 0 });
              busy = false;
              startProgress(next);
            },
          })
          // Old caption lifts away while the new photo wipes in
          .to(outCap, { autoAlpha: 0, y: -24, duration: 0.5, ease: "power2.in" }, 0)
          .to(
            slides[next],
            { clipPath: dir > 0 ? "inset(0 0 0 0%)" : "inset(0 0% 0 0)", duration: 1.3, ease: "power4.inOut" },
            0,
          )
          .to(inBg, { scale: 1.08, duration: 1.8, ease: "power2.out" }, 0)
          // New caption rises in line by line
          .fromTo(
            inCap.querySelectorAll(".cap-kicker"),
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
            0.7,
          )
          .fromTo(
            inCap.querySelectorAll(".cap-line > span"),
            { yPercent: 110 },
            { yPercent: 0, duration: 1, stagger: 0.12, ease: "power4.out" },
            0.75,
          )
          .fromTo(
            inCap.querySelectorAll(".cap-sub"),
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
            "-=0.55",
          );

        kenBurns(inBg, 1.7);
      });

      // Opening animation
      if (animate) {
        const first = caps[0];
        const keep = { clearProps: "opacity,visibility,transform" };
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(slides[0].querySelector(".hero-bg"), { scale: 1.2, duration: 2, ease: "power2.out" }, 0)
          .from(first.querySelectorAll(".cap-kicker"), { autoAlpha: 0, y: 16, duration: 0.7, ...keep }, 0.2)
          .from(first.querySelectorAll(".cap-line > span"), { yPercent: 110, duration: 1, stagger: 0.12, clearProps: "transform" }, 0.35)
          .from(first.querySelectorAll(".cap-sub"), { autoAlpha: 0, y: 20, duration: 0.7, ...keep }, "-=0.5")
          .from(".hero-cta", { autoAlpha: 0, y: 20, stagger: 0.1, duration: 0.6, ...keep }, "-=0.5")
          .from(".hero-controls", { autoAlpha: 0, y: 30, duration: 0.8, ...keep }, "-=0.4");

        kenBurns(slides[0].querySelector(".hero-bg"), 2);
        gsap.delayedCall(1.6, () => {
          if (cur === 0 && !busy && !progress) startProgress(0);
        });
      }

      // Parallax: the photos drift slower than the page
      gsap.to(q(".hero-bg"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      api.current = {
        go: (i) => go(i, i > cur ? 1 : -1),
        next: () => go(cur + 1, 1),
        prev: () => go(cur - 1, -1),
        hold: () => {
          hovering = true;
          progress?.pause();
        },
        release: () => {
          hovering = false;
          if (playingRef.current) progress?.resume();
        },
      };
    },
    { scope: root },
  );

  // Swipe left or right on touch screens
  const onTouchStart = (e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY });
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) dx < 0 ? api.current.next?.() : api.current.prev?.();
  };

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label="Featured at Eatryte"
      onMouseEnter={() => api.current.hold?.()}
      onMouseLeave={() => api.current.release?.()}
      onFocus={() => api.current.hold?.()}
      onBlur={() => api.current.release?.()}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative flex min-h-svh flex-col overflow-hidden text-white"
    >
      {/* Photos (one per slide, stacked) */}
      <div className="absolute inset-0 isolate" aria-hidden="true">
        {SLIDES.map((s) => (
          <div key={s.kicker} className="hero-slide absolute inset-0 overflow-hidden">
            <div
              className="hero-bg absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${s.img})` }}
            />
          </div>
        ))}
      </div>

      {/* Dark overlay so the centered text stays readable. Delete this block for the raw photos. */}
      <div
        className="absolute inset-0 bg-linear-to-b from-ink/60 via-ink/45 to-ink/80"
        aria-hidden="true"
      />

      {/* Centered captions */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pb-6 pt-28 text-center sm:pt-32 md:px-8">
        <div className="grid w-full place-items-center" aria-live={canAnimate ? "off" : "polite"}>
          {SLIDES.map((s, i) => {
            const Title = i === 0 ? "h1" : "h2";
            return (
              <div
                key={s.kicker}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${SLIDES.length}`}
                aria-hidden={i !== index}
                className="hero-caption col-start-1 row-start-1 flex flex-col items-center"
              >
                <div className="cap-kicker flex items-center gap-3 text-sm font-semibold text-white/85 sm:gap-4 sm:text-base">
                  <span className="h-px w-8 bg-gold sm:w-12" aria-hidden="true" />
                  {s.kicker}
                  <span className="h-px w-8 bg-gold sm:w-12" aria-hidden="true" />
                </div>

                <Title className="mt-5 text-balance font-display text-[2.5rem] font-extrabold leading-[1.02] tracking-tight min-[400px]:text-5xl sm:mt-6 sm:text-6xl lg:text-7xl xl:text-8xl">
                  {s.lines.map((line) => (
                    <span key={line} className="cap-line block overflow-hidden pb-1">
                      <span className="block">{renderLine(line)}</span>
                    </span>
                  ))}
                </Title>

                <p className="cap-sub mx-auto mt-5 max-w-md text-balance text-base text-white/90 sm:mt-7 sm:text-lg md:text-xl">
                  {s.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-9 sm:gap-4">
          <Link
            to="/menu"
            className="hero-cta rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:shadow-xl sm:px-8 sm:py-3.5 sm:text-base"
          >
            Place your order now!
          </Link>
        </div>
      </div>

      {/* Slider controls: counter, progress lines, arrows */}
      <div className="hero-controls relative mx-auto w-full max-w-7xl px-5 pb-6 md:px-8 md:pb-10">
        <div className="flex items-center gap-4 sm:gap-6">

          <div className="flex flex-1 gap-2 sm:gap-3">
            {SLIDES.map((s, i) => (
              <button
                key={s.kicker}
                onClick={() => api.current.go?.(i)}
                aria-label={`Show slide ${i + 1}: ${s.kicker}`}
                aria-current={i === index}
                className="group flex-1 py-3 text-left"
              >
                <span className="block h-0.5 overflow-hidden rounded bg-white/25">
                  <span className="hero-bar-fill block h-full bg-gold" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}