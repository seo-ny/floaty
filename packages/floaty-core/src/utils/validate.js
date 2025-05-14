import { POSITIVE_DIRECTIONS, VERTICAL_DIRECTIONS } from "../constants";

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

const isRect = (rect = null, { warn = true } = {}) => {
  const isRectObject =
    rect &&
    typeof rect === "object" &&
    "x" in rect &&
    "y" in rect &&
    "width" in rect &&
    "height" in rect;

  if (!isRectObject && warn) {
    console.warn("[isRect] Rect가 아님", {
      hasRect: !!rect,
      isRect: isRectObject
    });
  }

  return isRectObject;
};

const isRects = (rects = {}, { warn = true } = {}) => {
  return Object.values(rects).every((rect) => isRect(rect, { warn }));
};

const isDirectionPositive = (direction = "bottom") => {
  return POSITIVE_DIRECTIONS.includes(direction);
};

const isDirectionVertical = (direction = "bottom") => {
  return VERTICAL_DIRECTIONS.includes(direction);
};

export {
  isHTMLElement,
  isRect,
  isRects,
  isDirectionPositive,
  isDirectionVertical
};
