import { expect, test, describe, vi, beforeEach, afterEach } from "vitest";
import { setupPosition } from "../../src/core/setupPosition.js";
import { DEFAULT_OPTIONS } from "../../src/constants";
import { elementUtils } from "../../src/utils";

describe("setupPosition 테스트", () => {
  let referenceEl;
  let floatingEl;
  let scrollParentEl;

  beforeEach(() => {
    scrollParentEl = document.createElement("div");
    scrollParentEl.style.overflow = "auto";
    scrollParentEl.style.width = "300px";
    scrollParentEl.style.height = "300px";

    referenceEl = document.createElement("div");
    referenceEl.style.width = "100px";
    referenceEl.style.height = "100px";

    floatingEl = document.createElement("div");
    floatingEl.style.width = "150px";
    floatingEl.style.height = "150px";

    scrollParentEl.appendChild(referenceEl);
    document.body.appendChild(scrollParentEl);
    document.body.appendChild(floatingEl);

    vi.spyOn(elementUtils, "getScrollParents").mockReturnValue([
      scrollParentEl
    ]);
  });

  afterEach(() => {
    scrollParentEl.remove();
    floatingEl.remove();
    vi.restoreAllMocks();
  });

  test("setupPosition은 x, y, clear 함수를 포함한 객체를 반환해야 함", async () => {
    const result = await setupPosition(referenceEl, floatingEl);

    expect(result).toEqual({
      x: expect.any(Number),
      y: expect.any(Number),
      clear: expect.any(Function)
    });
  });

  describe("onAfterComputePosition 옵션이 있는 경우", () => {
    test("초기화 시 해당 콜백이 호출되어야 함", async () => {
      const onAfterComputePosition = vi.fn();

      await setupPosition(referenceEl, floatingEl, {
        onAfterComputePosition
      });

      expect(onAfterComputePosition).toHaveBeenCalledTimes(1);
      expect(onAfterComputePosition).toHaveBeenCalledWith({
        elements: { reference: referenceEl, floating: floatingEl },
        position: expect.objectContaining({
          x: expect.any(Number),
          y: expect.any(Number)
        })
      });
    });

    test.each([
      {
        eventName: "scroll",
        target: () => scrollParentEl,
        eventType: "scroll"
      },
      { eventName: "resize", target: () => window, eventType: "resize" }
    ])(
      "$eventName 이벤트가 발생하면 onAfterComputePosition이 호출되어야 함",
      async ({ target, eventType }) => {
        const onAfterComputePosition = vi.fn();

        await setupPosition(referenceEl, floatingEl, {
          onAfterComputePosition
        });

        onAfterComputePosition.mockClear();

        target().dispatchEvent(new Event(eventType));
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(onAfterComputePosition).toHaveBeenCalled();
      }
    );
  });

  describe("onAfterComputePosition 옵션이 없는 경우", () => {
    beforeEach(() => {
      vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) =>
        cb()
      );
    });

    test("초기화 시 floatingEl의 스타일이 업데이트되어야 함", async () => {
      await setupPosition(referenceEl, floatingEl);

      expect(floatingEl.style.position).toBe(DEFAULT_OPTIONS.strategy);
      expect(floatingEl.style.left).toBe("0px");
      expect(floatingEl.style.top).toBe("0px");
    });

    test.each([
      {
        eventName: "scroll",
        target: () => scrollParentEl,
        eventType: "scroll"
      },
      { eventName: "resize", target: () => window, eventType: "resize" }
    ])(
      "$eventName 이벤트가 발생하면 floatingEl의 스타일이 업데이트되어야 함",
      async ({ target, eventType }) => {
        await setupPosition(referenceEl, floatingEl);

        floatingEl.style.left = "";
        floatingEl.style.top = "";

        target().dispatchEvent(new Event(eventType));
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(floatingEl.style.position).toBe(DEFAULT_OPTIONS.strategy);
        expect(floatingEl.style.left).toBe("0px");
        expect(floatingEl.style.top).toBe("0px");
      }
    );
  });

  test("clear 함수 호출시 이벤트 리스너가 제거되어야 함", async () => {
    const removeEventListenerSpy = vi.spyOn(
      scrollParentEl,
      "removeEventListener"
    );
    const windowRemoveEventListenerSpy = vi.spyOn(
      window,
      "removeEventListener"
    );

    const { clear } = await setupPosition(referenceEl, floatingEl);

    clear();

    expect(removeEventListenerSpy).toHaveBeenCalled();
    expect(windowRemoveEventListenerSpy).toHaveBeenCalled();
  });
});
