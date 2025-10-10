import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedPage({ children, direction = "right" }) {
  const ref = useRef();
  useEffect(() => {
    const fromX = direction === "right" ? 100 : -100;
    gsap.fromTo(ref.current, { autoAlpha: 0, x: fromX }, { autoAlpha: 1, x: 0, duration: 0.6 });
    return () => {
      gsap.to(ref.current, { autoAlpha: 0, x: -fromX, duration: 0.35 });
    };
  }, [direction]);
  return <div ref={ref}>{children}</div>;
}
