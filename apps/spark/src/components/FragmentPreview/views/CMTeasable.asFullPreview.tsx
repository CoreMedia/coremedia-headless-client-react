import { Teasable } from "@coremedia-labs/graphql-layer";
import React from "react";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeDetail } from "../../../models/Detail/Detail";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { StyledGrid } from "../../PageGrid/PageGrid";
import { StyledCol } from "../../PageGrid/Col";
import Detail from "../../Details/Detail";

const CMTeasableAsFullPreview: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  const detail = initializeDetail(self, useSiteContextState().rootSegment);
  return (
    <StyledGrid>
      <StyledCol zone={"main"}>
        <Detail {...detail} />
      </StyledCol>
    </StyledGrid>
  );
};

export default CMTeasableAsFullPreview;
