import { DEFAULT_RECT, DIRECTION } from "../constants";
import { elementUtils, errorUtils, rectUtils, validateUtils } from "../utils";

const detectOverflow = ({
  referenceEl = null,
  floatingElRect = DEFAULT_RECT,
  boundary = "clippingAncestors",
  rootBoundary = "viewport",
  padding = 0
}) => {
  if (!validateUtils.isHTMLElement(referenceEl)) {
    errorUtils.throwError("[detectOverflow] referenceEl이 HTMLElement가 아님", {
      referenceEl
    });
  }

  const clippingRect = getClippingRect({
    referenceEl,
    floatingElRect,
    boundary,
    rootBoundary,
    padding
  });

  // console.log("[detectOverflow]", {
  //   // overflowAncestors,
  //   // clippingAncestors,
  //   clippingRect
  //   // floatingElRect
  // });

  // 잘리면 양수, 안 잘리면 음수
  const overflows = {
    [DIRECTION.TOP]: clippingRect.y - floatingElRect.y,
    [DIRECTION.BOTTOM]:
      floatingElRect.y +
      floatingElRect.height -
      (clippingRect.y + clippingRect.height),
    [DIRECTION.LEFT]: clippingRect.x - floatingElRect.x,
    [DIRECTION.RIGHT]:
      floatingElRect.x +
      floatingElRect.width -
      (clippingRect.x + clippingRect.width)
  };

  return overflows;
};

// 실제로 내부 콘텐츠가 잘리는 영역을 구함
const getClippingRect = ({
  referenceEl = null,
  floatingElRect = DEFAULT_RECT,
  boundary = "clippingAncestors",
  rootBoundary = "viewport",
  padding = 0
}) => {
  if (!validateUtils.isHTMLElement(referenceEl)) {
    errorUtils.throwError(
      "[getClippingRect] referenceEl이 HTMLElement가 아님",
      {
        referenceEl
      }
    );
  }

  const clippingRects =
    boundary === "clippingAncestors"
      ? elementUtils
          .getClippingAncestors(
            elementUtils.getOverflowAncestors(referenceEl),
            floatingElRect
          )
          .filter(validateUtils.isHTMLElement)
          .map(rectUtils.getElementInnerRect)
      : [boundary].filter(validateUtils.isRect);
  const rootBoundaryRect =
    rootBoundary === "viewport"
      ? rectUtils.getViewportRect()
      : rectUtils.getDocumentRect();

  // console.log("[getClippingRect]", {
  //   clippingRects,
  //   rootBoundaryRect
  // });

  /**
   * 왼쪽, 위쪽: 큰 값 선택
   * 오른쪽, 아래쪽: 작은 값 선택
   */
  const intersectRects = (a, b) => {
    const x = Math.max(a.x, b.x);
    const y = Math.max(a.y, b.y);
    const right = Math.min(a.x + a.width, b.x + b.width);
    const bottom = Math.min(a.y + a.height, b.y + b.height);
    const width = Math.max(0, right - x);
    const height = Math.max(0, bottom - y);

    return {
      x,
      y,
      width,
      height
    };
  };

  const intersectionRect = clippingRects.reduce(
    intersectRects,
    rootBoundaryRect
  );
  const clippingRect = padding
    ? rectUtils.insetRect(intersectionRect, padding)
    : intersectionRect;

  return clippingRect;
};

const convertViewportToLocalRect = (
  viewportRect = DEFAULT_RECT,
  elementToPosition = null
) => {
  const positioningParent =
    elementUtils.getPositioningParent(elementToPosition);
  const positioningContextRect =
    rectUtils.getElementScrollContentRect(positioningParent);
  const x = viewportRect.x - positioningContextRect.x;
  const y = viewportRect.y - positioningContextRect.y;

  // console.log("[convertViewportToLocalRect]", {
  //   positioningParent,
  //   positioningContextRect
  // });

  return {
    x,
    y,
    width: viewportRect.width,
    height: viewportRect.height
  };
};

export { detectOverflow, getClippingRect, convertViewportToLocalRect };
