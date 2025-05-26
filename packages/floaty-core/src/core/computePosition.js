/**
 * @module core/computePosition
 * @description 부유 요소의 위치를 계산합니다.
 */

/**
 * @typedef {BaseOptions} ComputePositionOptions
 */

/**
 * 스크롤, 리사이징 등 다양한 상황에서 부유 요소의 위치 계산
 *
 * @function computePosition
 * @memberof module:core/computePosition
 * @param {HTMLElement} referenceEl 기준 요소
 * @param {HTMLElement} floatingEl 부유 요소
 * @param {ComputePositionOptions} options 위치 계산을 위한 옵션들
 * @returns {Rect} 계산된 rect 값
 */

import { computeWithBehaviors } from "../behaviors";
import { DEFAULT_OPTIONS } from "../constants";
import { errorUtils, layoutUtils, rectUtils, validateUtils } from "../utils";

export const computePosition = async (
  referenceEl = null,
  floatingEl = null,
  options = DEFAULT_OPTIONS
) => {
  if (
    !validateUtils.isHTMLElement(referenceEl) ||
    !validateUtils.isHTMLElement(floatingEl)
  ) {
    errorUtils.throwError(
      "[computePosition] referenceEl 또는 floatingEl이 HTMLElement가 아님",
      {
        referenceEl,
        floatingEl
      }
    );
  }

  const rects = {
    reference: rectUtils.getElementRect(referenceEl),
    floating: rectUtils.getElementRect(floatingEl)
  };
  const initialRect = rectUtils.getInitialRect({
    placement: options.placement,
    rects
  });
  const computedRect = computeWithBehaviors({
    behaviors: options.behaviors,
    initialRect,
    rects,
    placement: options.placement
  });

  // eslint-disable-next-line no-unused-vars
  const overflows = layoutUtils.detectOverflow({
    referenceEl,
    floatingElRect: computedRect,
    boundary: options.boundary,
    rootBoundary: options.rootBoundary,
    padding: options.padding
  });

  console.log("[computePosition]", {
    // overflows,
    computedRect
  });

  const strategyToPositionMap = {
    absolute: () =>
      layoutUtils.convertViewportToLocalRect(computedRect, referenceEl),
    fixed: () => computedRect
  };

  if (!strategyToPositionMap[options.strategy]) {
    errorUtils.throwError(
      "[adjustPositionByStrategy] strategy가 유효하지 않음",
      {
        strategy: options.strategy
      }
    );
  }

  return strategyToPositionMap[options.strategy]?.();
};
