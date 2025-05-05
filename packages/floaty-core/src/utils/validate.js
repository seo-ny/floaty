import { POSITIVE_DIRECTIONS } from "@/constants/index.js";

const isHTMLElement = (el = null) => {
  if (!(el && el instanceof HTMLElement)) {
    console.warn("[isHTMLElement] HTML Element가 아님", {
      hasElement: !!el,
      isHTMLElement: el instanceof HTMLElement
    });
    return false;
  }

  return true;
};

const isDirectionPositive = (direction = "bottom") => {
  return POSITIVE_DIRECTIONS.includes(direction);
};

export { isHTMLElement, isDirectionPositive };
