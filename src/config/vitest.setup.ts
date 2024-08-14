import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";

expect.extend(matchers);

HTMLCanvasElement.prototype.getContext = () => {
  return {} as any;
};

if (typeof window === "undefined") {
  global.window = Object.create(window);
}

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
