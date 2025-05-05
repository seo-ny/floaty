import { AXIS, VERTICAL_DIRECTIONS } from "@/constants/index.js";

const getAxesFromDirection = (direction = "bottom") => {
  const isVertical = VERTICAL_DIRECTIONS.includes(direction);

  return {
    mainAxis: isVertical ? AXIS.Y : AXIS.X,
    crossAxis: isVertical ? AXIS.X : AXIS.Y
  };
};

export { getAxesFromDirection };
