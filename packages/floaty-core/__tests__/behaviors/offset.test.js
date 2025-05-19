import { expect, test, describe } from "vitest";
import { offset } from "../../src/behaviors/offset.js";
import { DEFAULT_RECT } from "../../src/constants";

describe("offset 동작 테스트", () => {
  test("기본 offset 함수 호출 시 입력된 x, y 값이 그대로 반환되어야 함", () => {
    const initialRect = { x: 10, y: 20 };
    const result = offset({
      x: initialRect.x,
      y: initialRect.y,
      rects: {
        reference: DEFAULT_RECT,
        floating: { ...DEFAULT_RECT, width: 100, height: 50 }
      }
    });

    expect(result).toEqual({
      x: initialRect.x,
      y: initialRect.y,
      width: 100,
      height: 50
    });
  });

  test.each([
    {
      options: { mainAxis: 10 },
      placement: "bottom",
      coords: {
        x: 0,
        y: 10
      }
    },
    {
      options: { mainAxis: 10 },
      placement: "right",
      coords: {
        x: 10,
        y: 0
      }
    },
    {
      options: { crossAxis: 10 },
      placement: "bottom",
      coords: {
        x: 10,
        y: 0
      }
    },
    {
      options: { crossAxis: 10 },
      placement: "right",
      coords: {
        x: 0,
        y: 10
      }
    },
    {
      options: { alignmentAxis: 10 },
      placement: "bottom-start",
      coords: {
        x: 10,
        y: 0
      }
    },
    {
      options: { alignmentAxis: 10 },
      placement: "bottom-end",
      coords: {
        x: -10,
        y: 0
      }
    },
    {
      options: { mainAxis: 10, alignmentAxis: 5 },
      placement: "left-end",
      coords: {
        x: 10,
        y: -5
      }
    }
  ])(
    "$options 옵션이 적용된 경우 ($placement 배치)",
    ({ options, placement, coords }) => {
      const result = offset({
        options,
        x: 0,
        y: 0,
        rects: {
          reference: DEFAULT_RECT,
          floating: { ...DEFAULT_RECT, width: 100, height: 50 }
        },
        placement
      });

      expect(result).toEqual({
        ...coords,
        width: 100,
        height: 50
      });
    }
  );

  test("잘못된 rects가 전달된 경우 에러를 throw 해야 함", () => {
    const runWithInvalidRects = () => {
      offset({
        x: 10,
        y: 20,
        rects: null
      });
    };

    expect(runWithInvalidRects).toThrow();
  });
});
