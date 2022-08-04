import { PageGridPlacement } from "@coremedia-labs/graphql-layer";
import CarouselBannerContainer from "../../components/CarouselBanner/CarouselBannerContainer";
import HeroBannerContainer from "../../components/HeroBanner/HeroBannerContainer";
import LandscapeBannerContainer from "../../components/LandscapeBanner/LandscapeBannerContainer";
import LeftRightBannerContainer from "../../components/LeftRightBanner/LeftRightBannerContainer";
import PortraitBannerContainer from "../../components/PortraitBanner/PortraitBannerContainer";
import SquareBannerContainer from "../../components/SquareBanner/SquareBannerContainer";
import { Col, Grid } from "../../models/Grid/Grid";

export const slotByName = (viewtype?: string | null) => {
  let container;
  switch (viewtype) {
    case "hero": {
      container = HeroBannerContainer;
      break;
    }
    case "carousel": {
      container = CarouselBannerContainer;
      break;
    }
    case "landscape": {
      container = LandscapeBannerContainer;
      break;
    }
    case "left-right": {
      container = LeftRightBannerContainer;
      break;
    }
    case "portrait": {
      container = PortraitBannerContainer;
      break;
    }
    case "square": {
      container = SquareBannerContainer;
      break;
    }
    default: {
      container = HeroBannerContainer;
    }
  }
  return container;
};

export const colByName = (grid: Grid | undefined | null, colName: string): Col | undefined => {
  let colByName = undefined;
  if (grid) {
    grid.rows?.forEach((row) => {
      row.cols?.forEach((placement) => {
        if (placement.name === colName) {
          colByName = placement;
          return;
        }
      });
    });
  }
  return colByName;
};

export const placementByName = (
  placements: Array<PageGridPlacement | null> | undefined | null,
  colName: string
): PageGridPlacement | undefined | null => {
  return placements?.find((item) => item && item.name === colName);
};
