/**
 * @namespace utils/axis
 * @description 주축, 교차축 관련 유틸 함수들
 */
/**
 * @typedef {Object} Axes
 * @property {string} mainAxis 주축
 * @property {string} crossAxis 교차축
 */
/**
 * 방향(direction)에 따른 주축, 교차축 반환
 *
 * @function getAxesFromDirection
 * @memberof utils/axis
 * @param {string} direction 방향
 * @returns {Axes} 주축, 교차축
 */

import { AXIS, VERTICAL_DIRECTIONS } from "../constants";

const getAxesFromDirection = (direction = "bottom") => {
  const isVertical = VERTICAL_DIRECTIONS.includes(direction);

  return {
    mainAxis: isVertical ? AXIS.Y : AXIS.X,
    crossAxis: isVertical ? AXIS.X : AXIS.Y
  };
};

export { getAxesFromDirection };
