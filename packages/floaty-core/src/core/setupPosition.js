import { DEFAULT_OPTIONS } from "../constants";
import { elementUtils } from "../utils";
import { computePosition } from "./computePosition.js";

export const setupPosition = async (
  referenceEl = null,
  floatingEl = null,
  originOptions = {}
) => {
  const updatePosition = async (e) => {
    const options = { ...DEFAULT_OPTIONS, ...originOptions };
    const { x, y } = await computePosition(referenceEl, floatingEl, options);

    console.log("[updatePosition]", {
      x,
      y,
      eventTarget: e?.target,
      eventType: e?.type
    });

    if (typeof options.onAfterComputePosition === "function") {
      const data = {
        elements: { reference: referenceEl, floating: floatingEl },
        position: { x, y }
      };
      options.onAfterComputePosition(data);
    } else {
      requestAnimationFrame(() => {
        Object.assign(floatingEl.style, {
          position: options.strategy,
          left: `${x}px`,
          top: `${y}px`
        });
      });
    }

    return { x, y };
  };

  const scrollParents = elementUtils.getScrollParents(referenceEl);
  setupEventListener(scrollParents, updatePosition);

  const { x, y } = await updatePosition();

  return {
    x,
    y,
    clear: clearEventListener
  };
};

const setupEventListener = (scrollParents = [], listener = () => {}) => {
  scrollParents.forEach((el) => {
    el.addEventListener("scroll", listener, { passive: true });
  });
  window.addEventListener("resize", listener);
};
const clearEventListener = (scrollParents = [], listener = () => {}) => {
  scrollParents.forEach((el) => {
    el.removeEventListener("scroll", listener, { passive: true });
  });
  window.removeEventListener("resize", listener);
};
