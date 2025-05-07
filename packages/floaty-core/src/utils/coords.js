import { elementUtils, rectUtils } from "@/utils/index.js";

const convertViewportToLocalCoords = (
  viewportCoords = { x: 0, y: 0 },
  elementToPosition = null
) => {
  const positioningParent =
    elementUtils.getPositioningParent(elementToPosition);
  const positioningContextOrigin =
    getPositioningContextOriginInViewport(positioningParent);

  // console.log("[convertViewportToLocalCoords]", {
  //   positioningParent,
  //   positioningContextOrigin
  // });

  return {
    x: viewportCoords.x - positioningContextOrigin.x,
    y: viewportCoords.y - positioningContextOrigin.y
  };
};

const getPositioningContextOriginInViewport = (positioningParent = null) => {
  const positioningParentRect = rectUtils.getElementRect(positioningParent);

  return {
    x:
      positioningParentRect.x -
      positioningParent.scrollLeft +
      positioningParent.clientLeft,
    y:
      positioningParentRect.y -
      positioningParent.scrollTop +
      positioningParent.clientTop
  };
};

export { convertViewportToLocalCoords, getPositioningContextOriginInViewport };
