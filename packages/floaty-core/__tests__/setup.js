import { beforeAll, afterAll, vi } from "vitest";

let originalConsoleLog;
let originalConsoleWarn;

beforeAll(() => {
  originalConsoleLog = console.log;
  originalConsoleWarn = console.warn;
  console.log = vi.fn();
  console.warn = vi.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
  console.warn = originalConsoleWarn;
});
