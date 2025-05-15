import { expect, test, describe } from "vitest";
import { rectUtils, layoutUtils } from "../../src/utils";

describe("[rectUtils.getInitialRect]", () => {
  test("placement이 right-end일 때 올바른 initialRect 값을 계산해야 함", () => {
    const rects = {
      reference: {
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        top: 0,
        bottom: 300,
        left: 0,
        right: 300
      },
      floating: {
        x: 0,
        y: 0,
        width: 500,
        height: 500,
        top: 0,
        bottom: 500,
        left: 0,
        right: 500
      }
    };

    const result = rectUtils.getInitialRect({
      placement: "right-end",
      rects
    });

    const expected = {
      x: 300,
      y: -200,
      width: 500,
      height: 500,
      top: -200,
      bottom: 300,
      left: 300,
      right: 800
    };

    expect(result).toEqual(expected);
  });
});

describe("[layoutUtils.convertViewportToLocalRect]", () => {
  test("스크롤 후 viewport 좌표가 local 좌표로 올바르게 변환되어야 함", () => {
    const ancestorEl = document.createElement("div");
    const referenceEl = document.createElement("div");

    ancestorEl.style.overflow = "scroll";
    ancestorEl.style.width = "100px";
    ancestorEl.style.height = "100px";
    ancestorEl.style.position = "relative";

    referenceEl.style.width = "50px";
    referenceEl.style.height = "200px";
    referenceEl.style.marginTop = "150px";

    ancestorEl.appendChild(referenceEl);
    document.body.appendChild(ancestorEl);

    try {
      const initialRect = referenceEl.getBoundingClientRect();

      ancestorEl.scrollTop = 100;

      const result = layoutUtils.convertViewportToLocalRect(
        initialRect,
        referenceEl
      );

      expect(result.top).toBeGreaterThan(initialRect.top);
    } finally {
      ancestorEl.remove();
    }
  });
});
