import { useEffect, useRef } from "react";
import gsap from "gsap";

export const useEntranceAnimation = (selector, options = {}) => {
  const defaults = {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out",
    delay: 0,
  };

  const settings = { ...defaults, ...options };

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    gsap.fromTo(
      elements,
      { y: settings.y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: settings.duration,
        stagger: settings.stagger,
        ease: settings.ease,
        delay: settings.delay,
      }
    );

    return () => {
      gsap.killTweensOf(elements);
    };
  }, [selector]);
};

export const useHoverAnimation = (ref, options = {}) => {
  const defaults = {
    scale: 1.05,
    duration: 0.3,
    ease: "power2.out",
  };

  const settings = { ...defaults, ...options };

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const onMouseEnter = () => {
      gsap.to(element, {
        scale: settings.scale,
        duration: settings.duration,
        ease: settings.ease,
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: settings.duration,
        ease: settings.ease,
      });
    };

    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mouseleave", onMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", onMouseEnter);
      element.removeEventListener("mouseleave", onMouseLeave);
      gsap.killTweensOf(element);
    };
  }, [ref, settings]);
};

export default {
  useEntranceAnimation,
  useHoverAnimation,
};
