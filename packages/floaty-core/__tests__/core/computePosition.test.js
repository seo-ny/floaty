import { expect, test, describe, vi, beforeEach, afterEach } from "vitest";
import { computePosition } from "../../src/core/computePosition.js";
import * as behaviors from "../../src/behaviors";
import { DEFAULT_OPTIONS } from "../../src/constants";
import { rectUtils, layoutUtils } from "../../src/utils";

const mockReferenceRect = {
  x: 100,
  y: 100,
  width: 100,
  height: 100,
  top: 100,
  bottom: 200,
  left: 100,
  right: 200
};
const mockFloatingRect = {
  x: 0,
  y: 0,
  width: 150,
  height: 150,
  top: 0,
  bottom: 150,
  left: 0,
  right: 150
};
const mockComputedRect = {
  x: 100,
  y: 200,
  width: 150,
  height: 150
};

describe("computePosition 테스트", () => {
  let referenceEl;
  let floatingEl;
  let getElementRectSpy;
  let getInitialRectSpy;
  let computeWithBehaviorsSpy;
  let detectOverflowSpy;
  let convertViewportToLocalRectSpy;

  const setupMocks = () => {
    getElementRectSpy = vi
      .spyOn(rectUtils, "getElementRect")
      .mockImplementation((el) => {
        return el === referenceEl ? mockReferenceRect : mockFloatingRect;
      });

    getInitialRectSpy = vi
      .spyOn(rectUtils, "getInitialRect")
      .mockReturnValue(mockComputedRect);

    computeWithBehaviorsSpy = vi
      .spyOn(behaviors, "computeWithBehaviors")
      .mockReturnValue(mockComputedRect);

    detectOverflowSpy = vi
      .spyOn(layoutUtils, "detectOverflow")
      .mockReturnValue({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      });

    convertViewportToLocalRectSpy = vi
      .spyOn(layoutUtils, "convertViewportToLocalRect")
      .mockReturnValue(mockComputedRect);
  };

  beforeEach(() => {
    referenceEl = document.createElement("div");
    referenceEl.style.width = "100px";
    referenceEl.style.height = "100px";
    referenceEl.style.position = "absolute";
    referenceEl.style.top = "100px";
    referenceEl.style.left = "100px";

    floatingEl = document.createElement("div");
    floatingEl.style.width = "150px";
    floatingEl.style.height = "150px";

    document.body.appendChild(referenceEl);
    document.body.appendChild(floatingEl);

    setupMocks();
  });

  afterEach(() => {
    referenceEl.remove();
    floatingEl.remove();
    vi.restoreAllMocks();
  });

  test("computePosition은 유효한 요소가 전달되면 좌표를 반환해야 함", async () => {
    const result = await computePosition(referenceEl, floatingEl);

    expect(result).toEqual(mockComputedRect);
    expect(getInitialRectSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        placement: DEFAULT_OPTIONS.placement,
        rects: expect.any(Object)
      })
    );
  });

  test("유효하지 않은 요소가 전달되면 에러를 throw 해야 함", async () => {
    await expect(async () => {
      await computePosition(null, null);
    }).rejects.toThrow();
  });

  test("strategy가 'fixed'일 때 올바른 좌표를 반환해야 함", async () => {
    const result = await computePosition(referenceEl, floatingEl, {
      ...DEFAULT_OPTIONS,
      strategy: "fixed"
    });

    expect(result).toEqual(mockComputedRect);
  });

  test("유효하지 않은 strategy가 전달되면 에러 로그를 출력해야 함", async () => {
    await expect(async () => {
      await computePosition(referenceEl, floatingEl, {
        ...DEFAULT_OPTIONS,
        strategy: "invalid"
      });
    }).rejects.toThrow();
  });
});
