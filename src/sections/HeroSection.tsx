import { useEffect, useRef, useState } from "react";
import { RevealText } from "../components/RevealText";
import { TypingAnimation } from "../components/TypingAnimation";
import { showcaseProjects } from "../data/showcaseProjects";
import { scrollToSection } from "../hooks/useSmoothScroll";

const SHOWCASE_INTERVAL_MS = 3000;

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const showcaseProject = showcaseProjects[projectIndex];
  const showcaseImage = showcaseProject.images[imageIndex];
  const showcaseWatch = showcaseProject.watchImages?.[imageIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setImageIndex((currentImageIndex) => {
        if (currentImageIndex + 1 < showcaseProject.images.length) {
          return currentImageIndex + 1;
        }

        setProjectIndex(
          (currentProjectIndex) =>
            (currentProjectIndex + 1) % showcaseProjects.length,
        );
        return 0;
      });
    }, SHOWCASE_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [projectIndex, imageIndex, showcaseProject.images.length]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      // The sticky hero releases after its scrollable distance is complete.
      // Keeping this range aligned with that distance makes the fill reach
      // 100% exactly as the next section is allowed to enter.
      const range = Math.max(1, hero.offsetHeight - window.innerHeight);
      const progress = Math.max(
        0,
        Math.min(1, -hero.getBoundingClientRect().top / range),
      );
      // Let the highlighted typography stay present before the next section
      // begins its natural slide-up.
      const textProgress = Math.min(1, progress / 0.78);
      const lineCount = 3;

      for (let index = 0; index < lineCount; index += 1) {
        const lineProgress = Math.max(
          0,
          Math.min(1, textProgress * lineCount - index),
        );
        hero.style.setProperty(
          `--hero-line-${index + 1}-unfilled`,
          `${((1 - lineProgress) * 100).toFixed(2)}%`,
        );
      }

      hero.style.setProperty("--hero-progress", progress.toFixed(3));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="section hero-section editorial-hero"
    >
      <div className="hero-sticky">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div
          className={`hero-device hero-device--${showcaseProject.device}${showcaseWatch ? " hero-device--paired" : ""}`}
          aria-label={`${showcaseProject.title} showcase`}
          style={{
            aspectRatio:
              showcaseProject.device === "phone"
                ? showcaseImage.frameRatio
                : undefined,
          }}
        >
          <div className="hero-device-shell">
            <div className="hero-device-screen">
              <img
                key={showcaseImage.src}
                className="hero-device-art"
                src={showcaseImage.src}
                alt={showcaseImage.alt}
              />
            </div>
          </div>
          {showcaseProject.device === "laptop" && (
            <div className="hero-device-base" />
          )}
          {showcaseWatch && (
            <div className="hero-watch-frame">
              <div className="hero-watch-screen">
                <img
                  key={showcaseWatch}
                  className="hero-watch-art"
                  src={showcaseWatch}
                  alt=""
                />
              </div>
              <span className="hero-watch-crown" />
            </div>
          )}
          <div className="hero-device-loader">
            <div className="hero-device-loader-meta">
              <span>{showcaseProject.title}</span>
              <span>
                {String(imageIndex + 1).padStart(2, "0")} /{" "}
                {String(showcaseProject.images.length).padStart(2, "0")}
              </span>
            </div>
            <span className="hero-device-loader-description">
              {showcaseProject.description}
            </span>
            <div
              className="hero-device-loader-track"
              style={{
                gridTemplateColumns: `repeat(${showcaseProject.images.length}, minmax(0, 1fr))`,
              }}
            >
              {showcaseProject.images.map((image, index) => (
                <span
                  key={image.src}
                  className={
                    index < imageIndex
                      ? "is-complete"
                      : index === imageIndex
                        ? "is-active"
                        : ""
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className="hero-inner section-inner">
          <RevealText delay={80} immediate>
            <p className="editorial-kicker">(HELLO) / TING CHUNG CHENG</p>
          </RevealText>
          <RevealText as="div" delay={160} immediate>
            <h1 className="hero-title">
              <span className="hero-title-line">
                <span className="hero-title-line-base">I code, build and</span>
                <span className="hero-title-line-fill" aria-hidden="true">
                  I code, build and
                </span>
              </span>
              <span className="hero-title-line">
                <span className="hero-title-line-base">
                  <em>move</em> digital
                </span>
                <span className="hero-title-line-fill" aria-hidden="true">
                  <em>move</em> digital
                </span>
              </span>
              <span className="hero-title-line">
                <span className="hero-title-line-base">products.</span>
                <span className="hero-title-line-fill" aria-hidden="true">
                  products.
                </span>
              </span>
            </h1>
          </RevealText>
          <RevealText as="div" className="hero-support" delay={280} immediate>
            <TypingAnimation />
            <button
              type="button"
              className="editorial-arrow-link"
              onClick={() => scrollToSection("work")}
            >
              See the work <span aria-hidden="true">↘</span>
            </button>
          </RevealText>
        </div>
        <div className="hero-bottomline" aria-hidden="true">
          <span>React Native / AWS / AI / side quests</span>
          <span>Scroll gently ↓</span>
          <span>01 / 05</span>
        </div>
      </div>
    </section>
  );
}
