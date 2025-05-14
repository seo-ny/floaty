import { offset } from "./offset.js";
import { DEFAULT_RECT } from "../constants";
import { validateUtils } from "../utils";

const behaviorRegistry = {
  offset
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

  const computedCoords = { x: initialRect.x, y: initialRect.y };

  for (const behavior of behaviors) {
    const { name, options: behaviorOptions } = behavior;
    const behaviorFn = behaviorRegistry[name];

    if (typeof behaviorFn !== "function") {
      console.error("[computePosition] behaviorFn이 함수가 아님", {
        name,
        behaviorFn
      });
      continue;
    }

    const data = behaviorFn({
      options: behaviorOptions,
      ...computedCoords,
      rects,
      placement
    });

    computedCoords.x = data.x ?? 0;
    computedCoords.y = data.y ?? 0;
  }

  return {
    x: computedCoords.x,
    y: computedCoords.y,
    width: rects.floating.width,
    height: rects.floating.height,
    top: computedCoords.y,
    bottom: computedCoords.y + rects.floating.height,
    left: computedCoords.x,
    right: computedCoords.x + rects.floating.width
  };
};

export { computeWithBehaviors, offset };
