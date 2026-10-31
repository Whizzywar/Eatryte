import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { gsap, useGSAP, motionOK } from "../lib/motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  const main = useRef(null);
  const { pathname } = useLocation();

  // Short page transition when the visitor navigates
  useGSAP(() => {
    if (motionOK()) gsap.fromTo(main.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" });
  }, { dependencies: [pathname] });

  return (
    <div className="font-body antialiased">
      <ScrollToTop />
      <Navbar />
      <main ref={main}><Outlet /></main>
      <Footer />
    </div>
  );
}
