import { expect } from "vitest";
import { isPreview } from "./Preview";

describe("isPreview", () => {
  beforeEach(() => {
    process.env = Object.create(null);
  });

  it("VITE_PREVIEW=true", () => {
    process.env.VITE_PREVIEW = "true";
    expect(isPreview()).toBe(true);
  });

  it("DEV=true", () => {
    process.env.DEV = "true";
    expect(isPreview()).toBe(true);
  });

  it("DEV=true, VITE_PREVIEW=false", () => {
    process.env.DEV = "true";
    import.meta.env.VITE_PREVIEW = "false";
    expect(isPreview()).toBe(false);
  });

  it("env=undefined", () => {
    expect(isPreview()).toBe(false);
  });
});
