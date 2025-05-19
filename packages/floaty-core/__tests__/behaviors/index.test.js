import { expect, test, describe, vi } from "vitest";
import { computeWithBehaviors } from "../../src/behaviors/index.js";
import { DEFAULT_RECT } from "../../src/constants";

const initialRect = { x: 0, y: 0 };
const floatingRect = { ...DEFAULT_RECT, width: 100, height: 50 };
const rects = {
  reference: DEFAULT_RECT,
  floating: floatingRect
};

describe("computeWithBehaviors 함수 테스트", () => {
  test("behaviors가 비어있는 경우 초기 rect와 floating rect의 크기를 반환해야 함", () => {
    const result = computeWithBehaviors({
      behaviors: [],
      initialRect,
      rects
    });

    expect(result).toEqual({
      ...initialRect,
      width: rects.floating.width,
      height: rects.floating.height
    });
  });

  test("offset behavior가 적용된 경우 올바른 위치가 계산되어야 함", () => {
    const result = computeWithBehaviors({
      behaviors: [
        {
          name: "offset",
          options: { mainAxis: 10 }
        }
      ],
      initialRect,
      rects,
      placement: "bottom"
    });

    expect(result).toEqual({
      x: 0,
      y: 10,
      width: rects.floating.width,
      height: rects.floating.height
    });
  });

  // TODO: "여러 behaviors가 순서대로 적용되어야 함" 테스트 추가

  test("유효하지 않은 behavior가 포함되어 있을 경우 경고를 띄우고 실제 실행 시에는 무시되어야 함", () => {
    const consoleWarnSpy = vi.spyOn(console, "warn");
    const result = computeWithBehaviors({
      behaviors: [
        {
          name: "invalidBehavior"
        },
        {
          name: "offset",
          options: { mainAxis: 10 }
        }
      ],
      initialRect,
      rects,
      placement: "bottom"
    });

    expect(consoleWarnSpy).toHaveBeenCalled();
    expect(result).toEqual({
      x: 0,
      y: 10,
      width: rects.floating.width,
      height: rects.floating.height
    });

    consoleWarnSpy.mockRestore();
  });

  test("잘못된 rects가 전달된 경우 에러를 throw 해야 함", () => {
    const runWithInvalidRects = () => {
      computeWithBehaviors({
        behaviors: [
          {
            name: "offset",
            options: { mainAxis: 10 }
          }
        ],
        initialRect,
        rects: null,
        placement: "bottom"
      });
    };

    expect(runWithInvalidRects).toThrow();
  });
});
