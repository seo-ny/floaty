import {
  axisUtils,
  placementUtils,
  coordsUtils,
  validateUtils
} from "@/utils/index.js";

export const computePosition = async (
  referenceEl = null,
  floatingEl = null,
  options = {}
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

  console.log("[computePosition]", {
    // options,
    direction,
    alignment,
    mainAxis,
    crossAxis
  });

  const initialCoords = coordsUtils.getInitialCoords({
    direction,
    alignment,
    referenceEl,
    floatingEl,
    mainAxis,
    crossAxis
  });

  const strategyToPositionMap = {
    absolute: () =>
      coordsUtils.adjustCoordsToOffsetParent(
        initialCoords,
        floatingEl.parentElement // TODO: 실제 offsetParent 구해서 전달할 것
      ),
    fixed: () => initialCoords
  };

  if (!strategyToPositionMap[options.strategy]) {
    console.warn("[adjustPositionByStrategy] strategy가 유효하지 않음", {
      strategy: options.strategy
    });
  }

  return strategyToPositionMap[options.strategy]?.();
};
