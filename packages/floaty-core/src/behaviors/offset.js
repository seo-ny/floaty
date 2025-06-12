import { ALIGNMENT, DEFAULT_RECT } from "../constants";
import { errorUtils, placementUtils, validateUtils } from "../utils";

export const offset = ({
  options = {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: 0
  },
  x = 0,
  y = 0,
  rects = {
    reference: DEFAULT_RECT,
    floating: DEFAULT_RECT
  },
  placement = "bottom"
}) => {
  if (!validateUtils.isRects(rects)) {
    errorUtils.throwError("[offset] rects가 유효하지 않음", {
      rects
    });
  }

  const { mainAxis = 0, crossAxis = 0, alignmentAxis = 0 } = options;
  const { START, END } = ALIGNMENT;
  const { direction, alignment } = placementUtils.decomposePlacement(placement);
  const isVertical = validateUtils.isDirectionVertical(direction);

  const offset = {
    mainAxis,
    crossAxis,
    alignmentAxis:
      alignment === START ? alignmentAxis : END ? -alignmentAxis : 0
  };
  // alignmentAxis 우선 적용
  const xOffset = isVertical
    ? offset.alignmentAxis || offset.crossAxis
    : offset.mainAxis;
  const yOffset = isVertical
    ? offset.mainAxis
    : offset.alignmentAxis || offset.crossAxis;

  const computedCoords = {
    x: x + xOffset,
    y: y + yOffset
  };

  return {
    x: computedCoords.x,
    y: computedCoords.y,
    width: rects.floating.width,
    height: rects.floating.height
  };
};
