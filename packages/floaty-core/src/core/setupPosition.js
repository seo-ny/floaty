/**
 * @module core/setupPosition
 * @description 부유 요소의 위치를 계산하고 조정합니다.
 */
/**
 * @typedef {Object} ElementRect
 * @property {number} top top 값
 * @property {number} left left 값
 * @property {number} width width 값
 * @property {number} height height 값
 */
/**
 * @typedef {Object} Rect
 * @property {number} x x 값
 * @property {number} y y 값
 * @property {number} width width 값
 * @property {number} height height 값
 */
/**
 * @typedef {"offset" | "flip" | "shift" | "size" | "hide"} BehaviorType
 * @description 부유 요소의 위치를 조정하기 위해 사용할 수 있는 동작 목록 ("offset" | "flip" | "shift" | "size" | "hide")
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
 * @typedef {Object} OriginOptions
 * @property {
 *   "bottom" | "top" | "left" | "right" |
 *   "bottom-start" | "bottom-end" |
 *   "top-start" | "top-end" |
 *   "left-start" | "left-end" |
 *   "right-start" | "right-end"
 * } placement 부유 요소를 어떻게 배치하고 정렬할 것인가
 * @property {"absolute" | "fixed"} strategy 위치 계산 전략
 * @property {"clippingAncestors" | ElementRect} boundary 부유 요소의 넘침 여부를 판단할 기준이 되는 경계 (여길 넘으면 안돼!)
 * @property {"viewport" | "document"} rootBoundary 부유 요소가 무조건 넘칠 수밖에 없는 시스템적 경계 (여길 넘으면 안 보여!)
 * @property {number} padding boundary와 rootBoundary 교집합 영역의 padding (부요 요소가 "보여야 하는 영역"을 좁힘)
 * @property {BehaviorType[]} behaviors 부유 요소가 넘칠 때 어떤 동작을 할 것인가 (순서 중요)
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
