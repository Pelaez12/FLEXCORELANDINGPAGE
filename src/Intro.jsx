import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimate, useReducedMotion } from "motion/react";

export function wantsIntro() {
  if (new URLSearchParams(location.search).get("intro") === "1") return true;
  try {
    return !localStorage.getItem("flexcore-intro-v1");
  } catch {
    return true;
  }
}
export default function Intro({ onFinish }) {
  const [scope, animate] = useAnimate();
  const reduced = useReducedMotion();
  const skip = useRef(null);
  const [exiting, setExiting] = useState(false);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    skip.current?.focus();
    const escape = (e) => {
      if (e.key === "Escape") setExiting(true);
    };
    window.addEventListener("keydown", escape);
    const fallback = setTimeout(() => setExiting(true), reduced ? 700 : 6900);
    let active = true;
    const animation = reduced
      ? animate(".intro-word", { opacity: 1 }, { duration: 0.15 })
      : animate([
          [".intro-dots", { opacity: [1, 0] }, { at: 1.2, duration: 0.3 }],
          [
            ".intro-word",
            { opacity: [0, 1], scale: [0.92, 1] },
            { at: 1.5, duration: 0.65 },
          ],
          [
            ".intro-word",
            { rotateX: [0, -90], opacity: [1, 0] },
            { at: 3.1, duration: 0.5 },
          ],
          [
            ".intro-question",
            { rotateX: [90, 0], opacity: [0, 1], y: [12, 0] },
            { at: 3.5, duration: 0.6 },
          ],
          [
            ".intro-question",
            { opacity: 0, y: -12 },
            { at: 5.6, duration: 0.4 },
          ],
          [
            ".intro-word",
            { rotateX: 0, opacity: [0, 1], scale: [1, 1.05] },
            { at: 6, duration: 0.35 },
          ],
          [scope.current, { opacity: 0 }, { at: 6.35, duration: 0.35 }],
        ]);
    if (!reduced)
      animation.then(() => {
        if (active) setExiting(true);
      });
    return () => {
      active = false;
      clearTimeout(fallback);
      animation.cancel();
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", escape);
    };
  }, [animate, reduced, scope]);
  useEffect(() => {
    if (exiting) {
      try {
        localStorage.setItem("flexcore-intro-v1", "1");
      } catch {
        /* Storage is optional. */
      }
      onFinish();
    }
  }, [exiting, onFinish]);
  return (
    <div
      className="intro"
      ref={scope}
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenido a FLEXCORE"
    >
      <div className="intro-dots" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.i
            key={i}
            animate={reduced ? {} : { opacity: [0.25, 1, 0.25], x: [0, 5, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.16 }}
          />
        ))}
      </div>
      <div className="intro-word" aria-hidden="true">
        FLEX<span>CORE</span>
      </div>
      <p className="intro-question" aria-hidden="true">
        ¿Qué necesita
        <br />
        tu negocio?
      </p>
      <button ref={skip} onClick={() => setExiting(true)}>
        Saltar intro <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
