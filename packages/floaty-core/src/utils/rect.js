import { ALIGNMENT, AXIS, DEFAULT_RECT } from "../constants";
import { validateUtils } from "../utils";

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
const getInitialRect = ({
  direction = "bottom",
  alignment = "center",
  referenceEl = null,
  floatingEl = null,
  mainAxis = "y",
  crossAxis = "x"
}) => {
  const referenceElRect = getElementRect(referenceEl);
  const floatingElRect = getElementRect(floatingEl);
  let initialRect = { x: 0, y: 0, width: 0, height: 0 };
  const baseCoords = { x: referenceElRect.x, y: referenceElRect.y };
  const mainAxisSize = mainAxis === AXIS.Y ? "height" : "width";
  const crossAxisSize = crossAxis === AXIS.X ? "width" : "height";

  // 1. direction 값을 바탕으로 초기 x 또는 y 값 결정
  const directionOffset = validateUtils.isDirectionPositive(direction)
    ? referenceElRect[mainAxisSize]
    : -floatingElRect[mainAxisSize];
  initialRect[mainAxis] = baseCoords[mainAxis] + (directionOffset || 0);

  // 2. alignment 값을 바탕으로 초기 x 또는 y 값 결정
  const alignmentOffsetMap = {
    [ALIGNMENT.START]: 0,
    [ALIGNMENT.CENTER]:
      (referenceElRect[crossAxisSize] - floatingElRect[crossAxisSize]) * 0.5,
    [ALIGNMENT.END]:
      referenceElRect[crossAxisSize] - floatingElRect[crossAxisSize]
  };
  initialRect[crossAxis] =
    baseCoords[crossAxis] + (alignmentOffsetMap[alignment] || 0);

  // 3. initialRect 완성
  initialRect = {
    ...initialRect,
    [mainAxisSize]: floatingElRect[mainAxisSize],
    [crossAxisSize]: floatingElRect[crossAxisSize],
    top: initialRect.y,
    left: initialRect.x,
    bottom: initialRect.y + floatingElRect.height,
    right: initialRect.x + floatingElRect.width
  };

  console.log("[getInitialRect]", {
    // referenceElRect,
    // floatingElRect,
    initialRect
  });

  return initialRect;
};

const getElementRect = (el = null) => {
  if (!validateUtils.isHTMLElement(el)) return;

  const rect = el.getBoundingClientRect();

  return rect || DEFAULT_RECT;
};

// border 제외하고 padding, content만 포함하는 영역을 구함
const getInnerRect = (el = null) => {
  if (!validateUtils.isHTMLElement(el)) return;

  const rect = getElementRect(el);
  const { clientLeft, clientTop, clientWidth, clientHeight } = el;
  const x = rect.x + clientLeft;
  const y = rect.y + clientTop;

  return {
    x,
    y,
    width: clientWidth,
    height: clientHeight,
    top: y,
    bottom: y + clientHeight,
    left: x,
    right: x + clientWidth
  };
};

export { getInitialRect, getElementRect, getInnerRect };
