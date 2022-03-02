import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { DetailPerson } from "@coremedia-labs/graphql-layer";
import DetailedPerson from "../DetailedPerson";
import { initializeDetailAuthor } from "../../../models/Detail/DetailAuthor";
import SeoHeader from "../../Header/SeoHeader";

const CMPersonAsDetail: React.FC<IncludeProps<DetailPerson>> = ({ self }) => {
  const author = initializeDetailAuthor(self);
  return (
    <>
      <SeoHeader title={author.displayName} />
      <DetailedPerson {...author} />
    </>
  );
};
export default CMPersonAsDetail;
