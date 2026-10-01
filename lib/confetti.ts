// canvas-confetti is only downloaded the first time someone solves a problem.
export async function celebrate(from?: HTMLElement) {
  const { default: confetti } = await import("canvas-confetti");
  const rect = from?.getBoundingClientRect();
  confetti({
    particleCount: 70,
    spread: 70,
    startVelocity: 32,
    ticks: 160,
    scalar: 0.9,
    zIndex: 60,
    disableForReducedMotion: true,
    colors: ["#22c55e", "#8f88ff", "#fbbf24", "#fb7185", "#38bdf8"],
    origin: rect
      ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
      : { y: 0.6 },
  });
}
