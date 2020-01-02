let parallaxUpdateScheduled = false;

const Load = () => {
  const parallaxElements = document.querySelectorAll(".parallax");

  const updateParallax = () => {
    if (!parallaxUpdateScheduled) {
      parallaxUpdateScheduled = true;
      window.requestAnimationFrame(() => {
        parallaxUpdateScheduled = false;
        const scrollRatio = Math.min(1, window.scrollY / window.innerHeight);
        if (scrollRatio <= 1) {
          const bgPosStyle = `center calc(50% + ${50 * scrollRatio}%)`;
          for (let target of parallaxElements) {
            target.style.backgroundPosition = bgPosStyle;
          }
        }
      });
    }
  };

  if (parallaxElements.length > 0) {
    updateParallax();
    window.addEventListener("scroll", updateParallax);
  }
};

if (document.readyState === "loading") {
  window.addEventListener("load", Load);
} else {
  Load();
}
