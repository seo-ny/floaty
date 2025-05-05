import { DEFAULT_OPTIONS } from "@/constants/index.js";
import { computePosition } from "@/core/computePosition.js";

export const setupPosition = async (
  referenceEl = null,
  floatingEl = null,
  originOptions = {}
) => {
  const options = { ...DEFAULT_OPTIONS, ...originOptions };
  const { x, y } = await computePosition(referenceEl, floatingEl, options);

  console.log("[setupPosition]", { x, y });

  if (options.applyStyle) {
    requestAnimationFrame(() => {
      Object.assign(floatingEl.style, {
        // transform: `translate3d(${x}px, ${y}px, 0)`,
        position: options.strategy,
        left: `${x}px`,
        top: `${y}px`
      });
    });
  }

  return { x, y };
};
