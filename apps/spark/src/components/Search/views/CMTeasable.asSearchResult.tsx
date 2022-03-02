import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "@coremedia-labs/graphql-layer";
import SearchBanner from "../SearchBanner";
import { Banner, initializeBanner } from "../../../models/Banner/Banner";

const CMTeasableAsSearchResult: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  const banner: Banner = initializeBanner(self);
  return <SearchBanner banner={banner} />;
};
export default CMTeasableAsSearchResult;
