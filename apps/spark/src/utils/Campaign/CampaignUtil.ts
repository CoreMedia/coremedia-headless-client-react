import { Slot, SlotResult } from "@coremedia-labs/graphql-layer";
import { Banner, initializeBanner } from "../../models/Banner/Banner";
import { Navigation } from "../../models/Navigation/Navigation";
import { isPreview } from "../Preview/Preview";

export const CAMPAIGN_CONTEXT_CATEGORY = "category-page";
export const CAMPAIGN_CONTEXT_PRODUCT = "product-page";
export const CAMPAIGN_CONTEXT_CONTENT = "content-page";

export const getFirstContentForCampaignSlot = (
  slotName: string,
  rootSegment: string,
  campaignContentSlots?: Array<Slot>
): Banner | undefined => {
  let content = undefined;
  campaignContentSlots?.some((slot) => {
    if (slot.name === slotName) {
      const assignment = slot.assignment;
      if (assignment && assignment.items[0]?.content) {
        content = initializeBanner(assignment.items[0].content, rootSegment);
        return true;
      }
    }
    return false;
  });
  return content;
};

/**
 * converts the currentNavigation to a contextData string
 * @param currentNavigation
 * @param channelType
 */
export const getRefinementData = (currentNavigation: Array<string> | undefined, channelType: string): Array<string> => {
  if (channelType === CAMPAIGN_CONTEXT_CATEGORY) {
    return (currentNavigation || []).slice(2, -1);
  } else if (channelType === CAMPAIGN_CONTEXT_PRODUCT) {
    return (currentNavigation || []).slice(2);
  }
  return (currentNavigation || []).slice(1);
};

export const isCampaignEnabled = () => {
  return import.meta.env.VITE_CAMPAIGN_ENABLED === "true";
};

export const hasCampaignData = (campaignData?: SlotResult): boolean => {
  return hasCampaignDataSlotItems(campaignData?.slots);
};

export const hasCampaignDataSlotItems = (campaignDataSlots?: Array<Slot>): boolean => {
  return campaignDataSlots ? campaignDataSlots.length > 0 : false;
};

/**
 * Get the uuid of the current navigation object
 *
 * @param navigation Navigation object of the site including all children
 * @param currentNavigation Array of path segments of the current navigation, at least the root segment of the site
 */
export const getCurrentNavigationUuid = (
  navigation: Navigation | undefined,
  currentNavigation: Array<string>
): string => {
  let currentUuid = "";
  const currentNavigationAsString = currentNavigation?.length > 0 ? "/" + currentNavigation.join("/") + "/" : undefined;
  let navigationLinkTarget = navigation?.linkTarget || "";
  if (navigationLinkTarget.indexOf("?") > 0) {
    navigationLinkTarget = navigationLinkTarget?.substring(0, navigationLinkTarget?.indexOf("?")); // ignore query parameters
  }

  if (currentNavigationAsString) {
    // check if the link target of the given navigation object is the same as the
    // current navigation, otherwise check the navigation objects of the children items
    if (navigationLinkTarget === currentNavigationAsString) {
      currentUuid = navigation?.uuid || "";
    } else if (navigation?.items && navigation?.items.length > 0) {
      // if the navigation has children items, loop over them recursively until
      // the navigation object of the current navigation path is found
      navigation?.items.some((subNavigation) => {
        const subCurrentUuid = getCurrentNavigationUuid(subNavigation, currentNavigation);
        if (!!subCurrentUuid) {
          currentUuid = subCurrentUuid;
          return true;
        }
        return false;
      });
    }
  }
  return currentUuid;
};

/**
 * Add additional variables for campaigns to the query variables map
 * @param variables the GraphQL query variables map
 * @param refinement given refinements
 * @param currentNavigation (optional) given navigation array
 * @param previewCampaignId (optional) given preview campaign id
 * @param previewDate (optional) given preview date for time travel
 */
export const addCampaignQueryVariables = (
  variables: any,
  refinement: string,
  currentNavigation?: string[],
  previewCampaignId?: string,
  previewDate?: Date
) => {
  const campaignEnabled = isCampaignEnabled();
  if (campaignEnabled) {
    const preview = isPreview();
    variables.refinements = currentNavigation ? getRefinementData(currentNavigation, refinement) : [refinement];
    if (preview && previewCampaignId) {
      variables.previewCampaignId = previewCampaignId;
    }
    if (preview && previewDate) {
      variables.previewDate = preview && previewDate?.toISOString();
    }
    variables.modePreviewCampaign = preview && previewCampaignId !== undefined;
    variables.modePreviewCampaignContent = preview && previewCampaignId === undefined;
    variables.modeCampaignContent = !preview;
  }
  return variables;
};
