import { POSITIVE_DIRECTIONS, VERTICAL_DIRECTIONS } from "@/constants/index.js";

const isHTMLElement = (el = null, { warn = true } = {}) => {
  const isElement = el && el instanceof HTMLElement;

  if (!isElement && warn) {
    console.warn("[isHTMLElement] HTML Element가 아님", {
      hasElement: !!el,
      isHTMLElement: el instanceof HTMLElement
    });
  }

  return isElement;
};

const isDirectionPositive = (direction = "bottom") => {
  return POSITIVE_DIRECTIONS.includes(direction);
};

const isDirectionVertical = (direction = "bottom") => {
  return VERTICAL_DIRECTIONS.includes(direction);
};

export { isHTMLElement, isDirectionPositive, isDirectionVertical };
