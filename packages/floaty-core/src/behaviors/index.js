import { offset } from "./offset.js";
import { DEFAULT_RECT } from "../constants";
import { errorUtils, validateUtils } from "../utils";

const behaviorRegistry = {
  offset
};

const isValidBehavior = (behavior = {}) => {
  const behaviorName = behavior.name ?? "";
  const isValid = typeof behaviorRegistry[behaviorName] === "function";

  if (!isValid) {
    console.warn(
      "[getValidBehaviors] 유효하지 않은 behavior가 포함되어 있습니다.",
      {
        behavior
      }
    );
  }

  return isValid;
};

const applyBehavior = ({
  currentRect = DEFAULT_RECT,
  behavior = {},
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
  if (!validateUtils.isRects(rects)) {
    errorUtils.throwError("[computeWithBehaviors] rects가 유효하지 않습니다.", {
      rects
    });
  }
  if (!Array.isArray(behaviors)) {
    errorUtils.throwError("[computeWithBehaviors] behaviors가 배열이 아님", {
      behaviors
    });
  }

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
