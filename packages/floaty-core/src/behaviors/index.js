import { offset } from "./offset.js";
import { DEFAULT_RECT } from "../constants";
import { validateUtils } from "../utils";

const behaviorRegistry = {
  offset
};

const isValidBehavior = ({ name }) => {
  const behaviorFn = behaviorRegistry[name];
  const isValid = typeof behaviorFn === "function";

  if (!isValid) {
    console.warn("[computePosition] behaviorFn이 함수가 아님", {
      name,
      behaviorFn
    });
  }

  return isValid;
};

const applyBehavior = ({
  currentRect = DEFAULT_RECT,
  behavior = [],
  rects = {
    reference: DEFAULT_RECT,
    floating: DEFAULT_RECT
  },
  placement = "bottom"
}) => {
  const { name, options } = behavior;
  const behaviorFn = behaviorRegistry[name];

  const { x, y } = behaviorFn({
    options,
    ...currentRect,
    rects,
    placement
  });

  return { x, y };
};

// behaviors 순서대로 실행
const computeWithBehaviors = ({
  behaviors = [],
  initialRect = DEFAULT_RECT,
  rects = {
    reference: DEFAULT_RECT,
    floating: DEFAULT_RECT
  },
  placement = "bottom"
}) => {
  if (!validateUtils.isRects(rects)) return;

  const computedRect = behaviors
    .filter(isValidBehavior)
    .reduce(
      (currentRect, behavior) =>
        applyBehavior({ currentRect, behavior, rects, placement }),
      initialRect
    );

  return {
    x: computedRect.x,
    y: computedRect.y,
    width: rects.floating.width,
    height: rects.floating.height
  };
};

export { computeWithBehaviors, offset };
