import React from "react";
import styled from "styled-components";
import { initializeDetail } from "../../models/Detail/Detail";
import { Slot as SlotProps } from "../../models/Grid/Slot";
import { notEmpty } from "../../utils/Helpers";
import { Items, StyledSlot } from "../Slot/Slot";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import SlotHeader from "../Slot/SlotHeader";
import { useSiteContextState } from "../../context/SiteContextProvider";
import Detail, { MetaList, StyledDetail } from "./Detail";

const StyledContainer = styled.div`
  ${StyledSlot} {
    width: 100%;
    flex-grow: 1;
  }

  ${StyledDetail} {
    ${MetaList} {
      display: none;
    }
  }
`;

const DetailContainer: React.FC<SlotProps> = ({ title, text, items, metadata }) => {
  const { rootSegment } = useSiteContextState();
  return (
    <StyledContainer>
      <StyledSlot {...metaDataElement(metadata?.root)}>
        <SlotHeader title={title} text={text} metadata={metadata} />

        <Items {...metaDataProperty(metadata?.properties?.items)}>
          {items &&
            items
              .filter(notEmpty)
              .map((item) => {
                return initializeDetail(item, rootSegment);
              })
              .filter(notEmpty)
              .map((item, index) => {
                return <Detail key={index} {...item} />;
              })}
        </Items>
      </StyledSlot>
    </StyledContainer>
  );
};

export default DetailContainer;
