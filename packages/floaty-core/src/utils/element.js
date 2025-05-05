import { validateUtils } from "@/utils/index.js";

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

export { getScrollParents };
