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

// Ajout de la fonction useHoverAnimation manquante
export const useHoverAnimation = (ref, options = {}) => {
  const { scale = 1.05, duration = 0.3, ease = "power2.out" } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        duration,
        ease,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration,
        ease,
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(element);
    };
  }, [ref, scale, duration, ease]);
};
