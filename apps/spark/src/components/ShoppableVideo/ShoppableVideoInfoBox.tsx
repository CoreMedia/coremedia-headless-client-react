import styled from "styled-components";
import React from "react";
import { supportsPricing } from "../../models/Banner/ProductBanner";
import ProductPricing, { StyledPricing } from "../Product/ProductPricing";
import SquareResponsiveImage from "../SquareBanner/SquareResponsiveImage";
import { ImageBox } from "../Media/ResponsiveImage";
import { useShoppableVideoContextState } from "./ShoppableVideoContext";

const StyledInfoBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 75%;
  z-index: 2;
  display: flex;
  flex-direction: row;
  transform: translateX(-50%) translateY(-50%);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: var(--border-radius-large);
  box-shadow: var(--drop-shadow);
  padding: var(--padding-medium);
  gap: var(--padding-medium);
`;

const StyledInfoBoxImage = styled.div`
  width: 50%;
  aspect-ratio: 1/1;
  border-radius: var(--border-radius-medium);
  overflow: hidden;

  > ${ImageBox} {
    --aspect-ratio: 1 * 1;
  }
`;

const StyledInfoBoxDetails = styled.div`
  width: 50%;
  flex: 1;

  ${StyledPricing} {
    margin-bottom: 1em;
  }
`;

interface Props {}

const ShoppableVideoInfoBox: React.FC<Props> = () => {
  const { selectedEntry, playing } = useShoppableVideoContextState();

  if (!selectedEntry || playing) {
    return null;
  }

  return (
    <StyledInfoBox>
      <StyledInfoBoxImage>
        {selectedEntry.picture && <SquareResponsiveImage picture={selectedEntry.picture} />}
      </StyledInfoBoxImage>
      <StyledInfoBoxDetails>
        <h2>{selectedEntry.title}</h2>
        {supportsPricing(selectedEntry) && <ProductPricing {...selectedEntry} />}
        {selectedEntry.text && <div dangerouslySetInnerHTML={{ __html: selectedEntry.text }}></div>}
      </StyledInfoBoxDetails>
    </StyledInfoBox>
  );
};

export default ShoppableVideoInfoBox;
