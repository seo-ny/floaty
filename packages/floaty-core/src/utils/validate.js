import { POSITIVE_DIRECTIONS, VERTICAL_DIRECTIONS } from "../constants";

const isHTMLElement = (el = null, { error = true } = {}) => {
  const isElement = el && el instanceof HTMLElement;

  if (!isElement && error) {
    console.error("[isHTMLElement] HTML Element가 아님", {
      hasElement: !!el,
      isHTMLElement: el instanceof HTMLElement
    });
  }

  return isElement;
};

const isRect = (rect = null, { error = true } = {}) => {
  const isRectObject =
    rect &&
    typeof rect === "object" &&
    "x" in rect &&
    "y" in rect &&
    "width" in rect &&
    "height" in rect;

  if (!isRectObject && error) {
    console.error("[isRect] Rect가 아님", {
      hasRect: !!rect,
      isRect: isRectObject
    });
  }

  return isRectObject;
};

const isRects = (rects = {}, { error = true } = {}) => {
  if (!rects || typeof rects !== "object") {
    console.error("[isRects] rects is not a valid object");
  }

  return Object.values(rects).every((rect) => isRect(rect, { error }));
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
