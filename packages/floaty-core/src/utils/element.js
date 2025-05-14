import { DEFAULT_RECT } from "../constants";
import { rectUtils, validateUtils } from "../utils";

const getScrollParents = (el = null) => {
  const scrollParents = [];
  let currentEl = el?.parentElement;

  while (
    validateUtils.isHTMLElement(currentEl) &&
    currentEl !== document.body &&
    currentEl !== document.documentElement
  ) {
    const style = getComputedStyle(currentEl);
    const overflowStyles = style.overflow + style.overflowX + style.overflowY;

    if (/(auto|scroll)/.test(overflowStyles)) {
      scrollParents.push(currentEl);
    }

    currentEl = currentEl.parentElement;
  }

  return scrollParents.concat(document.body, document.documentElement, window);
};

// 유효한 overflow 속성을 가진 조상 요소들
const getOverflowAncestors = (el = null) => {
  const overflowAncestors = [];
  let currentEl = el?.parentElement;

  while (validateUtils.isHTMLElement(currentEl, { warn: false })) {
    const style = getComputedStyle(currentEl);
    const overflowStyles = style.overflow + style.overflowX + style.overflowY;

    if (/(auto|scroll|clip|hidden)/.test(overflowStyles)) {
      overflowAncestors.push(currentEl);
    }

    currentEl = currentEl.parentElement;
  }

  // console.log("[getOverflowAncestors]", { overflowAncestors });

  return overflowAncestors;
};

// 실제로 내부 콘텐츠가 잘리는 요소들을 구함 (x, y축 어느 한쪽에서만 잘려도 포함됨)
const getClippingAncestors = (
  overflowAncestors = [],
  floatingElRect = DEFAULT_RECT
) => {
  if (overflowAncestors.some((el) => !validateUtils.isHTMLElement(el))) return;

  const isClipping = (overflowAncestorEl = null) => {
    const overflowAncestorInnerRect =
      rectUtils.getElementInnerRect(overflowAncestorEl);

    // console.log("[getClippingAncestors]", {
    //   overflowAncestorInnerRect,
    //   floatingElRect
    // });

    return (
      floatingElRect.x < overflowAncestorInnerRect.x ||
      floatingElRect.x + floatingElRect.width >
        overflowAncestorInnerRect.x + overflowAncestorInnerRect.width ||
      floatingElRect.y < overflowAncestorInnerRect.y ||
      floatingElRect.y + floatingElRect.height >
        overflowAncestorInnerRect.y + overflowAncestorInnerRect.height
    );
  };

  return overflowAncestors.filter(isClipping);
};

const getPositioningParent = (elementToPosition = null) => {
  let positioningParent = document.documentElement;
  let currentEl = elementToPosition?.parentElement;

  while (validateUtils.isHTMLElement(currentEl)) {
    const { position } = getComputedStyle(currentEl);

    if (/^(relative|absolute|sticky|fixed)$/.test(position)) {
      positioningParent = currentEl;
      break;
    }

    currentEl = currentEl.parentElement;
  }

  return positioningParent;
};

export {
  getScrollParents,
  getOverflowAncestors,
  getClippingAncestors,
  getPositioningParent
};
