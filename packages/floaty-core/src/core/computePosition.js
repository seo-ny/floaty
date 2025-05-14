import { DEFAULT_OPTIONS } from "../constants";
import {
  axisUtils,
  layoutUtils,
  placementUtils,
  rectUtils,
  validateUtils
} from "../utils";

export const computePosition = async (
  referenceEl = null,
  floatingEl = null,
  options = DEFAULT_OPTIONS
) => {
  if (
    !validateUtils.isHTMLElement(referenceEl) ||
    !validateUtils.isHTMLElement(floatingEl)
  )
    return;

  const { direction, alignment } = placementUtils.decomposePlacement(
    options.placement
  );
  const { mainAxis, crossAxis } = axisUtils.getAxesFromDirection(direction);

  // console.log("[computePosition]", {
  //   // options,
  //   direction,
  //   alignment,
  //   mainAxis,
  //   crossAxis
  // });

  const initialRect = rectUtils.getInitialRect({
    direction,
    alignment,
    referenceEl,
    floatingEl,
    mainAxis,
    crossAxis
  });
  const overflows = layoutUtils.detectOverflow({
    referenceEl,
    floatingElRect: initialRect,
    boundary: options.boundary,
    rootBoundary: options.rootBoundary
  });

  console.log("[computePosition]", { overflows });

  const strategyToPositionMap = {
    absolute: () =>
      layoutUtils.convertViewportToLocalRect(initialRect, referenceEl),
    fixed: () => initialRect
  };

  if (!strategyToPositionMap[options.strategy]) {
    console.warn("[adjustPositionByStrategy] strategy가 유효하지 않음", {
      strategy: options.strategy
    });
  }

  return strategyToPositionMap[options.strategy]?.();
};
