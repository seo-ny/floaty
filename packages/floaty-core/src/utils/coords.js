import { ALIGNMENT, AXIS } from "@/constants/index.js";
import { rectUtils, validateUtils } from "@/utils/index.js";

/**
 * [ bottom ]
 *
 * - referenceElRect.y + referenceElRect.height
 *
 * [ top ]
 *
 * - referenceElRect.y - floatingElRect.height
 *
 * [ left ]
 *
 * - referenceElRect.x - floatingElRect.width
 *
 * [ right ]
 *
 * - referenceElRect.x + referenceElRect.width
 */

/**
 * [ start ]
 *
 * - bottom, top: referenceElRect.x
 * - left, right: referenceElRect.y
 *
 * [ center ]
 *
 * - bottom, top: referenceElRect.x + (referenceElRect.width - floatingElRect.width) * 0.5
 * - left, right: referenceElRect.y + (referenceElRect.height - floatingElRect.height) * 0.5
 *
 * [ end ]
 *
 * - bottom, top: referenceElRect.x + (referenceElRect.width - floatingElRect.width)
 * - left, right: referenceElRect.y + (referenceElRect.height - floatingElRect.height)
 */
const getInitialCoords = ({
  direction = "bottom",
  alignment = "center",
  referenceEl = null,
  floatingEl = null,
  mainAxis = "y",
  crossAxis = "x"
}) => {
  const referenceElRect = rectUtils.getElementRect(referenceEl);
  const floatingElRect = rectUtils.getElementRect(floatingEl);
  const initialCoords = { x: 0, y: 0 };
  const baseCoords = { x: referenceElRect.x, y: referenceElRect.y };
  const mainAxisSize = mainAxis === AXIS.Y ? "height" : "width";
  const crossAxisSize = crossAxis === AXIS.X ? "width" : "height";

  // 1. direction 값을 바탕으로 초기 x 또는 y 값 결정
  const directionOffset = validateUtils.isDirectionPositive(direction)
    ? referenceElRect[mainAxisSize]
    : -floatingElRect[mainAxisSize];
  initialCoords[mainAxis] = baseCoords[mainAxis] + (directionOffset || 0);

  // 2. alignment 값을 바탕으로 초기 x 또는 y 값 결정
  const alignmentOffsetMap = {
    [ALIGNMENT.START]: 0,
    [ALIGNMENT.CENTER]:
      (referenceElRect[crossAxisSize] - floatingElRect[crossAxisSize]) * 0.5,
    [ALIGNMENT.END]:
      referenceElRect[crossAxisSize] - floatingElRect[crossAxisSize]
  };
  initialCoords[crossAxis] =
    baseCoords[crossAxis] + (alignmentOffsetMap[alignment] || 0);

  console.log("[getInitialCoords]", {
    referenceElRect,
    floatingElRect,
    initialCoords
  });

  return initialCoords;
};

const adjustCoordsToOffsetParent = (
  originCoords = { x: 0, y: 0 },
  offsetParentEl = null
) => {
  const offsetParentElRect = rectUtils.getElementRect(offsetParentEl);

  console.log("[adjustCoordsToOffsetParent]", {
    offsetParentEl,
    offsetParentElRect
  });

  return {
    x: originCoords.x - offsetParentElRect.x,
    y: originCoords.y - offsetParentElRect.y
  };
};

export { getInitialCoords, adjustCoordsToOffsetParent };
