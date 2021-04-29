import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { DetailPerson } from "../../../queries/fragments/__generated__/DetailPerson";
import DetailedPerson from "../DetailedPerson";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeDetailAuthor } from "../../../models/Detail/DetailAuthor";

const CMPersonAsDetail: React.FC<IncludeProps<DetailPerson>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  return <DetailedPerson {...initializeDetailAuthor(self, rootSegment)} />;
};
export default CMPersonAsDetail;
