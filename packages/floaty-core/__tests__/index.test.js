import { expect, test } from "vitest";
import { setupPosition } from "../src/index.js";

test("테스트 샘플", async () => {
  const referenceEl = document.createElement("div");
  const floatingEl = document.createElement("div");
  document.body.append(referenceEl, floatingEl);

  // 현재는 rootBoundary 고려 안되어 있어서 setupPosition 실행 중에 에러가 남
  const position = await setupPosition(referenceEl, floatingEl);

  expect(position).toBeDefined();
});
