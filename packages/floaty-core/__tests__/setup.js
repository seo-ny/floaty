import { beforeAll, afterAll, vi } from "vitest";

let originalConsoleLog;
let originalConsoleWarn;

beforeAll(() => {
  originalConsoleLog = console.log;
  originalConsoleWarn = console.warn;
  console.log = vi.fn();
  console.error = vi.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
  console.error = originalConsoleWarn;
});
