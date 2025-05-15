import { expect, test, vi } from "vitest";
import { setupPosition } from "../../src/core/setupPosition.js";

const referenceEl = document.createElement("div");
const floatingEl = document.createElement("div");
document.body.append(referenceEl, floatingEl);

test("return 값 확인", async () => {
  const result = await setupPosition(referenceEl, floatingEl);

  expect(result).toEqual({
    x: 0,
    y: 0,
    clear: expect.any(Function)
  });
});

test("onAfterComputePosition 옵션 전달했을 때 호출되는지 확인", async () => {
  const onAfterComputePosition = vi.fn();

  setupPosition(referenceEl, floatingEl, {
    onAfterComputePosition
  });

  referenceEl.click();

  await Promise.resolve();

  expect(onAfterComputePosition).toHaveBeenCalled();
});
