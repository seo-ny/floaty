import { DEFAULT_RECT, DIRECTION } from "../constants";
import { elementUtils, rectUtils, validateUtils } from "../utils";

const detectOverflow = (referenceEl = null, floatingElRect = DEFAULT_RECT) => {
  if (!validateUtils.isHTMLElement(referenceEl)) return;

  const overflowAncestors = elementUtils.getOverflowAncestors(referenceEl);
  const clippingAncestors = elementUtils.getClippingAncestors(
    overflowAncestors,
    floatingElRect
  );
  const clippingRect = getClippingRect(clippingAncestors);

  console.log("[detectOverflow]", {
    // overflowAncestors,
    // clippingAncestors,
    clippingRect,
    floatingElRect
  });

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
const getClippingRect = (clippingAncestors = []) => {
  if (!clippingAncestors.filter((el) => !validateUtils.isHTMLElement(el)))
    return;

  const clippingRects = clippingAncestors
    .filter(validateUtils.isHTMLElement)
    .map(rectUtils.getInnerRect);

  // console.log("[getClippingRect]", { clippingRects });

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

  return clippingRects.reduce(intersectRects);
};

export { detectOverflow, getClippingRect };
