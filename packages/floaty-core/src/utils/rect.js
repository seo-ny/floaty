import { DEFAULT_RECT } from "@/constants/index.js";
import { validateUtils } from "@/utils/index.js";

const getElementRect = (el) => {
  if (!validateUtils.isHTMLElement(el)) return;

  const rect = el.getBoundingClientRect();

  return rect || DEFAULT_RECT;
};

const getClippingRect = () => {};

export { getElementRect, getClippingRect };
