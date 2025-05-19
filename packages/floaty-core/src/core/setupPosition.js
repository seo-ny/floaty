import { DEFAULT_OPTIONS } from "../constants";
import { elementUtils } from "../utils";
import { computePosition } from "./computePosition.js";

export const setupPosition = async (
  referenceEl = null,
  floatingEl = null,
  originOptions = {}
) => {
  const scrollParents = elementUtils.getScrollParents(referenceEl);

  const updatePosition = async (e) => {
    try {
      const options = { ...DEFAULT_OPTIONS, ...originOptions };
      const { x, y } = await computePosition(referenceEl, floatingEl, options);

      // console.log("[updatePosition]", {
      //   x,
      //   y,
      //   eventTarget: e?.target,
      //   eventType: e?.type
      // });

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
    } catch (err) {
      console.error(err);
      return {
        x: 0,
        y: 0
      };
    }
  };
  const setupEventListener = () => {
    scrollParents.forEach((el) => {
      el.addEventListener("scroll", updatePosition, { passive: true });
    });
    window.addEventListener("resize", updatePosition);
  };
  const clearEventListener = () => {
    scrollParents.forEach((el) => {
      el.removeEventListener("scroll", updatePosition, { passive: true });
    });
    window.removeEventListener("resize", updatePosition);
  };

  const { x, y } = await updatePosition();
  setupEventListener();

  return {
    x,
    y,
    clear: clearEventListener
  };
};
