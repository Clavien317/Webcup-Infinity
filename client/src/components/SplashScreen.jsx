import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flame } from "lucide-react";

const SplashScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Fonction pour séparer chaque caractère dans un <span>
    const splitText = (el) => {
      const text = el.innerText;
      el.innerHTML = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        el.appendChild(span);
      });
    };

    splitText(textRef.current);
    splitText(subtitleRef.current);

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500); // plus de délai avant de disparaître
      },
    });

    // Fond animé
    tl.fromTo(
      bgRef.current,
      {
        x: "-100%",
        opacity: 0.8,
        width: "0%",
        borderRadius: "0% 50% 50% 0%",
      },
      {
        x: "0%",
        width: "100%",
        opacity: 1,
        borderRadius: "0%",
        duration: 1.5,
        ease: "power2.inOut",
      }
    );

    // Logo
    tl.fromTo(
      logoRef.current,
      { x: -80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=1"
    );

    // Texte principal - lettre par lettre, animée de gauche à droite
    tl.fromTo(
      textRef.current.querySelectorAll("span"),
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
      },
      "-=0.6"
    );

    // Sous-titre - même effet
    tl.fromTo(
      subtitleRef.current.querySelectorAll("span"),
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // Pulsation du logo
    tl.to(
      logoRef.current,
      {
        scale: 1.1,
        duration: 1,
        repeat: 1,
        yoyo: true,
        ease: "power1.inOut",
      },
      "-=0.2"
    );

    // Sortie
    tl.to(
      bgRef.current,
      {
        x: "100%",
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      "+=1"
    );

    tl.to(
      [logoRef.current, textRef.current, subtitleRef.current],
      {
        x: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      },
      "-=0.8"
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Fond animé */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600"
      ></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div ref={logoRef} className="relative mb-10">
          <div className="text-8xl font-extrabold tracking-tight text-white font-serif">
            <span>TheEnd</span>
            <span className="text-white/80">.page</span>
          </div>
          <div className="absolute -bottom-3 -right-10">
            <Flame className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Texte principal */}
        <div
          ref={textRef}
          className="text-3xl text-center max-w-3xl text-white font-serif font-semibold tracking-wide leading-relaxed mb-4"
        >
          Welcome to the platform of new beginnings
        </div>

        {/* Sous-titre */}
        <div
          ref={subtitleRef}
          className="text-2xl text-center max-w-2xl text-white/90 font-light tracking-wide font-serif"
        >
          When one door closes, another opens. <strong>Be positive</strong> —
          your best opportunities are yet to come.
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
