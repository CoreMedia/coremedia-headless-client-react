import { addCampaignQueryVariables } from "./CampaignUtil";

describe("campaign variables for content-page", () => {
  beforeEach(() => {
    process.env = Object.create(null);
  });

  it("prod campaign", () => {
    process.env.VITE_PREVIEW = "false";
    process.env.VITE_CAMPAIGN_ENABLED = "true";
    const generatedParams = addCampaignQueryVariables({}, "calista", undefined);
    const expectedResult = {
      modeCampaignContent: true,
      modePreviewCampaign: false,
      modePreviewCampaignContent: false,
      refinements: ["calista"],
    };
    expect(generatedParams).toEqual(expectedResult);
  });

  it("preview campaign", () => {
    process.env.VITE_PREVIEW = "true";
    process.env.VITE_CAMPAIGN_ENABLED = "true";
    const generatedParams = addCampaignQueryVariables({}, "calista", undefined);
    const expectedResult = {
      modeCampaignContent: false,
      modePreviewCampaign: false,
      modePreviewCampaignContent: true,
      refinements: ["calista"],
    };
    expect(generatedParams).toEqual(expectedResult);
  });

  it("preview single campaign", () => {
    process.env.VITE_PREVIEW = "true";
    process.env.VITE_CAMPAIGN_ENABLED = "true";
    const generatedParams = addCampaignQueryVariables({}, "calista", undefined, "a");
    const expectedResult = {
      modeCampaignContent: false,
      modePreviewCampaign: true,
      modePreviewCampaignContent: false,
      refinements: ["calista"],
      previewCampaignId: "a",
    };
    expect(generatedParams).toEqual(expectedResult);
  });

  it("preview campaign with time travel", () => {
    process.env.VITE_PREVIEW = "true";
    process.env.VITE_CAMPAIGN_ENABLED = "true";
    const previewDate = new Date("2023-01-01T00:00:00.000Z");
    const generatedParams = addCampaignQueryVariables({}, "calista", undefined, undefined, previewDate);
    const expectedResult = {
      modeCampaignContent: false,
      modePreviewCampaign: false,
      modePreviewCampaignContent: true,
      refinements: ["calista"],
      previewDate: previewDate.toISOString(),
    };
    expect(generatedParams).toEqual(expectedResult);
  });
});
