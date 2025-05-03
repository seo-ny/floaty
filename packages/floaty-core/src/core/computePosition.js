import { DEFAULT_OPTIONS } from "@/constants/index.js";
import { placementUtils, rectUtils, validateUtils } from "@/utils/index.js";

export const computePosition = async (
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

  const { direction, align } = placementUtils.decomposePlacement(
    options.placement
  );

  let x = 0;
  let y = 0;

  console.log("[computePosition]", {
    referenceElRect,
    floatingElRect,
    options,
    direction,
    align
  });

  return {
    x,
    y
  };
};
