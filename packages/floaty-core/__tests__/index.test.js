import { expect, test, describe } from "vitest";
import {
  setupPosition,
  computeWithBehaviors,
  offset,
  elementUtils,
  layoutUtils,
  rectUtils,
  validateUtils
} from "../src/index.js";

describe("floaty-core 라이브러리 진입점 테스트", () => {
  test("[setupPosition] setupPosition 함수가 export 되어 있어야 함", () => {
    expect(setupPosition).toBeDefined();
    expect(typeof setupPosition).toBe("function");
  });

  test.each([
    ["computeWithBehaviors", computeWithBehaviors],
    ["offset", offset]
  ])("[behaviors] %s가 export 되어 있어야 함", (_, fn) => {
    expect(fn).toBeDefined();
    expect(typeof fn).toBe("function");
  });

  test.each([
    ["elementUtils", elementUtils],
    ["layoutUtils", layoutUtils],
    ["rectUtils", rectUtils],
    ["validateUtils", validateUtils]
  ])("[utils] %s가 export 되어 있어야 함", (_, fn) => {
    expect(fn).toBeDefined();
  });
});
