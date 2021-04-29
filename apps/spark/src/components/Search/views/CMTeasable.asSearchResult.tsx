import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "../../../queries/fragments/__generated__/Teasable";
import SearchBanner from "../SearchBanner";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { Banner, initializeBanner } from "../../../models/Banner/Banner";

const CMTeasableAsSearchResult: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: Banner = initializeBanner(self, rootSegment);
  return <SearchBanner banner={banner} />;
};
export default CMTeasableAsSearchResult;
