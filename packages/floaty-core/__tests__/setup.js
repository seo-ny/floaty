import { beforeAll, afterAll, vi } from "vitest";

let originalConsoleLog;
let originalConsoleWarn;
let originalConsoleError;

beforeAll(() => {
  originalConsoleLog = console.log;
  originalConsoleWarn = console.warn;
  originalConsoleError = console.error;
  console.log = vi.fn();
  console.warn = vi.fn();
  console.error = vi.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});
