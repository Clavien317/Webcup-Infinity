import { useEffect } from "react";
import { gsap } from "gsap";

export const useEntranceAnimation = (selector, options = {}) => {
  const {
    duration = 0.6,
    stagger = 0.1,
    y = 20,
    delay = 0.2,
    ease = "power2.out",
  } = options;

  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) return;

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease,
      }
    );

    return () => {
      gsap.killTweensOf(elements);
    };
  }, [selector, duration, stagger, y, delay, ease]);
};

export const useFadeAnimation = (selector, options = {}) => {
  const { duration = 0.5, delay = 0, ease = "power1.out" } = options;

  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) return;

    gsap.fromTo(
      elements,
      { opacity: 0 },
      { opacity: 1, duration, delay, ease }
    );

    return () => {
      gsap.killTweensOf(elements);
    };
  }, [selector, duration, delay, ease]);
};
