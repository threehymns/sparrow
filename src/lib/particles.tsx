export function particles(el: Element) {
  const parent = el.parentElement;
  const rect = el.getBoundingClientRect();
  const parentRect = parent?.getBoundingClientRect();
  const x =
    parentRect === undefined
      ? rect.left + rect.width / 4
      : rect.left - parentRect.left + rect.width / 4;
  const y =
    parentRect === undefined
      ? rect.top + rect.height / 4
      : rect.top - parentRect.top + rect.height / 4;

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    parent?.insertBefore(particle, el);

    const size = Math.random() * 5 + 5;
    const angle = Math.random() * Math.PI + (Math.random() < 0.5 ? 0 : Math.PI);
    const distance = Math.random() * 20 + 40;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    particle.style.left = `${x + Math.random() * 10 - 5}px`;
    particle.style.top = `${y + Math.random() * 10 - 5}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.setProperty("--tx", `${tx}px`);
    particle.style.setProperty("--ty", `${ty}px`);

    particle.animate(
      [
        { transform: "translate(0, 0)", opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px)`, opacity: 0 },
      ],
      {
        duration: Math.random() * 500 + 500,
        easing: "cubic-bezier(0, .9, .57, 1)",
        delay: Math.random() * 100,
      },
    ).onfinish = () => particle.remove();
  }
}
