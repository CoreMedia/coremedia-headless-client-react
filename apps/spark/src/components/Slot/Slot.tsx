import React from "react";
import styled from "styled-components";
import { Banner } from "../../models/Banner/Banner";
import { Slot as SlotProps } from "../../models/Grid/Slot";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import SlotHeader from "./SlotHeader";

interface Props extends SlotProps {
  BannerComponent: React.FC<Banner>;
}

export const StyledSlot = styled.div`
  --number-items: 1;
  --gap-width: 0;
`;

export const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--gap-width);
`;

export const Item = styled.div`
  --item-width: calc(1 / var(--number-items) * 100%);
  --gap-width-per-item: calc(var(--gap-width) * (var(--number-items) - 1) / var(--number-items));
  width: calc(var(--item-width) - var(--gap-width-per-item));
`;

const Slot: React.FC<Props> = ({ items, text, title, BannerComponent, metadata }) => {
  return (
    <StyledSlot {...metaDataElement(metadata?.root)}>
      <SlotHeader title={title} text={text} metadata={metadata} />
      <Items {...metaDataProperty(metadata?.properties?.items)}>
        {items &&
          items.map((item, index) => {
            return (
              <Item key={index} {...metaDataElement(item.metadata?.root)}>
                <BannerComponent key={index} {...item} />
              </Item>
            );
          })}
      </Items>
    </StyledSlot>
  );
};

export default Slot;
