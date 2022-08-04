import { CmPerson } from "@coremedia-labs/graphql-layer";
import React from "react";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeDetailAuthor } from "../../../models/Detail/DetailAuthor";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { StyledGrid } from "../../PageGrid/PageGrid";
import { StyledCol } from "../../PageGrid/Col";
import DetailPerson from "../../Details/DetailPerson";

const CMPersonAsFullPreview: React.FC<IncludeProps<CmPerson>> = ({ self }) => {
  const detail = initializeDetailAuthor(self, useSiteContextState().rootSegment);
  return (
    <StyledGrid>
      <StyledCol zone={"main"}>
        <DetailPerson {...detail} />
      </StyledCol>
    </StyledGrid>
  );
};

export default CMPersonAsFullPreview;
