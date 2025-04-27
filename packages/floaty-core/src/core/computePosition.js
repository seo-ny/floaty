import { DEFAULT_OPTIONS } from "@/constants/index.js";
import { rectUtils, validateUtils } from "@/utils/index.js";

export const computePosition = (
  referenceEl = null,
  floatingEl = null,
  originOptions = {}
) => {
  if (
    !validateUtils.isHTMLElement(referenceEl) ||
    !validateUtils.isHTMLElement(floatingEl)
  )
    return;

  const options = { ...DEFAULT_OPTIONS, ...originOptions };
  const referenceElRect = rectUtils.getElementRect(referenceEl);
  const floatingElRect = rectUtils.getElementRect(floatingEl);

  console.log("[computePosition]", {
    referenceElRect,
    floatingElRect,
    options
  });
};
