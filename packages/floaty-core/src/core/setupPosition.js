/**
 * @module core/setupPosition
 * @description 부유 요소의 위치를 계산하고 조정합니다.
 */

/**
 * @typedef {Object} OnAfterComputePositionCallbackParams
 * @property {Object} elements
 * @property {HTMLElement} elements.reference 기준 요소
 * @property {HTMLElement} elements.floating 부유 요소
 * @property {Object} position
 * @property {number} position.x x 값
 * @property {number} position.y y 값
 * @description OnAfterComputePositionCallback의 파라미터
 */

/**
 * @typedef {function} OnAfterComputePositionCallback
 * @param {OnAfterComputePositionCallbackParams} data 사용자가 위치 계산 함수 외부에서 접근할 수 있는 값
 * @returns {any}
 * @description 위치 계산 후 호출되는 콜백 함수
 * @example
 * const onAfterComputePosition = ({ elements, position }) => {
 *   requestAnimationFrame(() => {
 *     Object.assign(elements.floating.style, {
 *       position: strategy,
 *       left: `${position.x}px`,
 *       top: `${position.y}px`
 *     });
 *   });
 * };
 */

/**
 * @typedef {BaseOptions} OriginOptions
 * @property {OnAfterComputePositionCallback} onAfterComputePosition 위치 계산 후 호출되는 콜백 함수
 */

/**
 * 스크롤, 리사이징 등 다양한 상황에서 부유 요소의 위치 계산 및 조정
 *
 * @function setupPosition
 * @memberof module:core/setupPosition
 * @param {HTMLElement} referenceEl 기준 요소
 * @param {HTMLElement} floatingEl 부유 요소
 * @param {OriginOptions} originOptions 위치 조정을 위한 옵션들
 * @returns {Rect} 최종적으로 계산된 rect 값
 * @example
 * setupPosition(referenceEl, floatingEl, {
 *   placement: "bottom-start",
 *   strategy: "absolute",
 *   boundary: "clippingAncestors",
 *   rootBoundary: "viewport",
 *   padding: 10,
 *   behaviors: [{ type: "offset", options: { crossAxis: 10 } }]
 * });
 */

/**
 * 위치 계산 및 조정
 *
 * @function updatePosition
 * @memberof module:core/setupPosition
 * @param {Event} e event 객체
 * @returns {Rect} 계산된 rect 값
 */

import { DEFAULT_OPTIONS } from "../constants";
import { elementUtils } from "../utils";
import { computePosition } from "./computePosition.js";

export const setupPosition = async (
  referenceEl = null,
  floatingEl = null,
  originOptions = {}
) => {
  const scrollParents = elementUtils.getScrollParents(referenceEl);

  // eslint-disable-next-line no-unused-vars
  const updatePosition = async (e) => {
    try {
      const options = { ...DEFAULT_OPTIONS, ...originOptions };
      const { x, y } = await computePosition(referenceEl, floatingEl, options);

      // console.log("[updatePosition]", {
      //   x,
      //   y,
      //   eventTarget: e?.target,
      //   eventType: e?.type
      // });

      if (typeof options.onAfterComputePosition === "function") {
        const data = {
          elements: { reference: referenceEl, floating: floatingEl },
          position: { x, y }
        };
        options.onAfterComputePosition(data);
      } else {
        requestAnimationFrame(() => {
          Object.assign(floatingEl.style, {
            position: options.strategy,
            left: `${x}px`,
            top: `${y}px`
          });
        });
      }

      return { x, y };
    } catch (err) {
      console.error(err);
      return {
        x: 0,
        y: 0
      };
    }
  };
  const setupEventListener = () => {
    scrollParents.forEach((el) => {
      el.addEventListener("scroll", updatePosition, { passive: true });
    });
    window.addEventListener("resize", updatePosition);
  };
  const clearEventListener = () => {
    scrollParents.forEach((el) => {
      el.removeEventListener("scroll", updatePosition, { passive: true });
    });
    window.removeEventListener("resize", updatePosition);
  };

  const { x, y } = await updatePosition();
  setupEventListener();

  return {
    x,
    y,
    clear: clearEventListener
  };
};
