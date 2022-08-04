import React from "react";
import styled from "styled-components";
import { Detail as DetailProps } from "../../models/Detail/Detail";
import { notEmpty } from "../../utils/Helpers";
import { Items, StyledSlot } from "../Slot/Slot";
import { metaDataElement, metaDataProperty, PreviewMetadata } from "../../utils/Preview/MetaData";
import SlotHeader from "../Slot/SlotHeader";
import { SupportsPicture } from "../../models/Banner/Picture";
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

interface Slot extends SupportsPicture, PreviewMetadata {
  text?: string;
  title?: string;
  items: Array<DetailProps>;
}

const DetailContainer: React.FC<Slot> = ({ title, text, items, metadata }) => {
  return (
    <StyledContainer>
      <StyledSlot {...metaDataElement(metadata?.root)}>
        <SlotHeader title={title} text={text} metadata={metadata} />

        <Items {...metaDataProperty(metadata?.properties?.items)}>
          {items &&
            items.filter(notEmpty).map((item, index) => {
              return <Detail key={index} {...item} />;
            })}
        </Items>
      </StyledSlot>
    </StyledContainer>
  );
};

export default DetailContainer;
