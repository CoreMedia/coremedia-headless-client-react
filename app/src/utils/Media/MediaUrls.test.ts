import { getImageUrl, isUrlAbsolute } from "./MediaUrls";

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("media", () => {
  it("is url absolute", () => {
    expect(isUrlAbsolute("https://example.com")).toBe(true);
    expect(isUrlAbsolute("example.com")).toBe(false);
  });

  it("imageUrl with regular uriTemplate", () => {
    const exampleUriTemplate = "url/{cropName}/{width}";
    const expectedUrl = "url/test_ratio/400";
    const resultUrl = getImageUrl(exampleUriTemplate, "test_ratio", 400);
    expect(resultUrl).toEqual(expectedUrl);
  });

  it("imageUrl with null", () => {
    const exampleUriTemplate = null;
    const resultUrl = getImageUrl(exampleUriTemplate, "test_ratio", 400);
    expect(resultUrl).toEqual("");
  });

  it("imageUrl with external image", () => {
    const exampleUriTemplate = "https://www.example.com/example.jpg";
    const expectedUrl = "https://www.example.com/example.jpg";
    const resultUrl = getImageUrl(exampleUriTemplate, "test_ratio", 400);
    expect(resultUrl).toEqual(expectedUrl);
  });
});
