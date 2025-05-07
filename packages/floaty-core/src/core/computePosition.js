import { DEFAULT_OPTIONS } from "@/constants/index.js";
import {
  axisUtils,
  coordsUtils,
  layoutUtils,
  placementUtils,
  rectUtils,
  validateUtils
} from "@/utils/index.js";

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

  const initialCoords = rectUtils.getInitialRect({
    direction,
    alignment,
    referenceEl,
    floatingEl,
    mainAxis,
    crossAxis
  });
  const overflows = layoutUtils.detectOverflow(referenceEl, initialCoords);

  console.log("[computePosition]", { overflows });

  const strategyToPositionMap = {
    absolute: () =>
      coordsUtils.convertViewportToLocalCoords(initialCoords, referenceEl),
    fixed: () => initialCoords
  };

  if (!strategyToPositionMap[options.strategy]) {
    console.warn("[adjustPositionByStrategy] strategy가 유효하지 않음", {
      strategy: options.strategy
    });
  }

  return strategyToPositionMap[options.strategy]?.();
};
