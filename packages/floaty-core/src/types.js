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
 * @description 부유 요소의 위치를 조정하기 위해 사용할 수 있는 동작 목록
 */

/**
 * @typedef {Object} BaseOptions
 * @property {("bottom"|"top"|"left"|"right"|"bottom-start"|"bottom-end"|"top-start"|"top-end"|"left-start"|"left-end"|"right-start"|"right-end")} placement 부유 요소를 어떻게 배치하고 정렬할 것인가
 * @property {"absolute" | "fixed"} strategy 위치 계산 전략
 * @property {"clippingAncestors" | ElementRect} boundary 부유 요소의 넘침 여부를 판단할 기준이 되는 경계
 * @property {"viewport" | "document"} rootBoundary 부유 요소가 무조건 넘칠 수밖에 없는 시스템적 경계
 * @property {number} padding boundary와 rootBoundary 교집합 영역의 padding
 * @property {BehaviorType[]} behaviors 부유 요소가 넘칠 때 어떤 동작을 할 것인가
 */
