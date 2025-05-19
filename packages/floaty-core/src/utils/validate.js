import { POSITIVE_DIRECTIONS, VERTICAL_DIRECTIONS } from "../constants";

const isHTMLElement = (el = null) => {
  return el && el instanceof HTMLElement;
};

const isRect = (rect = null) => {
  return (
    rect &&
    typeof rect === "object" &&
    "x" in rect &&
    "y" in rect &&
    "width" in rect &&
    "height" in rect
  );
};

const isRects = (rects = {}) => {
  const isPlainObject =
    typeof rects === "object" && rects !== null && !Array.isArray(rects);

  if (!isPlainObject) return false;

  return Object.values(rects).every((rect) => isRect(rect));
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
