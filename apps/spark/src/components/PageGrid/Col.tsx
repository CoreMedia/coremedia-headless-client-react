import React, { FC } from "react";
import styled, { css } from "styled-components";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { initializeBannerFor } from "../../models/Banner/Banner";
import { Col as ColProps } from "../../models/Grid/Grid";
import { initializeSlot, Slot } from "../../models/Grid/Slot";
import { slotByName } from "../../utils/PageGrid/PageGridUtil";
import { flattenItems, notEmpty } from "../../utils/Helpers";
import { metaDataForPlacement } from "../../utils/Preview/MetaData";

interface PageGridPlacementProps {
  col?: ColProps;
}

export const StyledCol = styled.div<{ zone?: string }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  flex-shrink: 0;

  // add gap to grid
  width: calc(100% - var(--grid-gap) * 2);
  margin-top: var(--grid-gap);

  @media screen and (min-width: 1200px) {
    width: var(--screen-size-max);
  }

  // no gap for first element on big screens
  @media screen and (min-width: 768px) and (orientation: landscape), (min-width: 1200px) {
    &:first-of-type {
      margin-top: 0;
    }
  }

  ${(props) => {
    return (
      props.zone &&
      props.zone === "main" &&
      css`
        flex-grow: 1;
      `
    );
  }};
  ${(props) =>
    props.zone &&
    props.zone === "placement3" &&
    css`
      flex-grow: 1;
    `};
  ${(props) =>
    props.zone &&
    props.zone === "footer-navigation" &&
    css`
      width: 100%;
      @media screen and (min-width: 1200px) {
        width: 100%;
      }
      margin-top: var(--padding-large);
    `};
  ${(props) =>
    props.zone &&
    props.zone === "footer" &&
    css`
      width: 100%;
      @media screen and (min-width: 1200px) {
        width: 100%;
      }
      margin-top: 0;
    `};
`;

const Col: FC<PageGridPlacementProps> = ({ col }) => {
  const { rootSegment } = useSiteContextState();
  if (!col || !col.items || col.items.length === 0) {
    return null;
  }

  //Flatten items if a viewtype has been set and it is not default
  if (col.viewtype && col.viewtype !== "default") {
    const Container = slotByName(col.viewtype);
    const items = flattenItems(col.items)
      .map((banner) => initializeBannerFor(banner, rootSegment))
      .filter(notEmpty);

    return (
      <StyledCol zone={col.name} {...metaDataForPlacement(col.name, !!col.items)}>
        <Container {...col} items={items} />
      </StyledCol>
    );
  }
  return (
    <>
      {col && col.items && col.items.length > 0 && (
        <StyledCol zone={col.name} {...metaDataForPlacement(col.name, true)}>
          {col.items.filter(notEmpty).map((item, index) => {
            let slot: Slot;
            const Container = slotByName(item.viewtype);
            //Either we are a collection of items
            if ("items" in item) {
              slot = initializeSlot(item, rootSegment);
            } else {
              //or not
              slot = initializeSlot({ items: [item] }, rootSegment);
            }
            return <Container {...slot} key={index} />;
          })}
        </StyledCol>
      )}
    </>
  );
};

export default Col;
