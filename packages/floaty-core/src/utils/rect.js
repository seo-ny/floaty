import { ALIGNMENT, AXIS, DEFAULT_RECT } from "../constants";
import { axisUtils, errorUtils, placementUtils, validateUtils } from "../utils";

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
  placement = "bottom",
  rects = { reference: DEFAULT_RECT, floating: DEFAULT_RECT }
}) => {
  if (!validateUtils.isRects(rects)) {
    errorUtils.throwError("[getInitialRect] rects가 유효하지 않음", {
      rects
    });
  }

  const { direction, alignment } = placementUtils.decomposePlacement(placement);
  const { mainAxis, crossAxis } = axisUtils.getAxesFromDirection(direction);
  const { reference: referenceElRect, floating: floatingElRect } = rects;

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
    [crossAxisSize]: floatingElRect[crossAxisSize]
  };

  console.log("[getInitialRect]", {
    // referenceElRect,
    // floatingElRect,
    initialRect
  });

  return initialRect;
};

const getElementRect = (el = null) => {
  if (!validateUtils.isHTMLElement(el)) {
    errorUtils.throwError("[getElementRect] el이 HTMLElement가 아님", {
      el
    });
  }

  const rect = el.getBoundingClientRect();

  return rect || DEFAULT_RECT;
};

// border 제외하고 padding, content만 포함하는 영역을 구함
const getElementInnerRect = (el = null) => {
  if (!validateUtils.isHTMLElement(el)) {
    errorUtils.throwError("[getElementInnerRect] el이 HTMLElement가 아님", {
      el
    });
  }

  const rect = getElementRect(el);
  const { clientLeft, clientTop, clientWidth, clientHeight } = el;
  const x = rect.x + clientLeft;
  const y = rect.y + clientTop;

  return {
    x,
    y,
    width: clientWidth,
    height: clientHeight
  };
};

// border는 제외하고 스크롤 위치까지 고려하여 요소의 스크롤 가능한 내부 콘텐츠 영역을 구함
const getElementScrollContentRect = (el = null) => {
  if (!validateUtils.isHTMLElement(el)) {
    errorUtils.throwError(
      "[getElementScrollContentRect] el이 HTMLElement가 아님",
      {
        el
      }
    );
  }

  const innerRect = getElementInnerRect(el);
  const { scrollWidth, scrollHeight, scrollLeft, scrollTop } = el;
  const x = innerRect.x - scrollLeft;
  const y = innerRect.y - scrollTop;

  return {
    x,
    y,
    width: scrollWidth,
    height: scrollHeight
  };
};

const insetRect = (rect = DEFAULT_RECT, padding = 0) => {
  return {
    x: rect.x + padding,
    y: rect.y + padding,
    width: rect.width - padding * 2,
    height: rect.height - padding * 2
  };
};

// 스크롤 위치를 고려하지 않고 뷰포트 영역을 구함
const getViewportRect = () => {
  const width = window.visualViewport?.width ?? window.innerWidth ?? 0;
  const height = window.visualViewport?.height ?? window.innerHeight ?? 0;
  const x = window.visualViewport?.offsetLeft ?? window.scrollX ?? 0;
  const y = window.visualViewport?.offsetTop ?? window.scrollY ?? 0;

  return {
    x,
    y,
    width,
    height
  };
};

// 스크롤 위치 고려하여 Document(문서 전체)의 스크롤 가능한 내부 컨텐츠 영역을 구함
const getDocumentRect = () => {
  const documentEl = document.documentElement;
  const body = document.body;

  const scrollLeft =
    window.scrollX ?? documentEl.scrollLeft ?? body.scrollLeft ?? 0;
  const scrollTop =
    window.scrollY ?? documentEl.scrollTop ?? body.scrollTop ?? 0;

  const width = Math.max(
    body.scrollWidth,
    body.offsetWidth,
    documentEl.scrollWidth,
    documentEl.clientWidth,
    documentEl.offsetWidth
  );
  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    documentEl.scrollHeight,
    documentEl.clientHeight,
    documentEl.offsetHeight
  );

  return {
    x: 0 - scrollLeft,
    y: 0 - scrollTop,
    width,
    height
  };
};

export {
  getInitialRect,
  getElementRect,
  getElementInnerRect,
  getElementScrollContentRect,
  insetRect,
  getViewportRect,
  getDocumentRect
};
