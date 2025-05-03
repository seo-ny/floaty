import { computePosition } from "@/core/computePosition.js";

export const setupPosition = async (
  referenceEl = null,
  floatingEl = null,
  originOptions = {}
) => {
  const { x, y } = await computePosition(
    referenceEl,
    floatingEl,
    originOptions
  );

  if (originOptions.applyStyle) {
    requestAnimationFrame(() => {
      Object.assign(floatingEl.style, {
        transform: `translate3d(${x}px, ${y}px, 0)`
      });
    });
  }

  return {
    x,
    y
  };
};
