import React from "react";
import styled from "styled-components";
import { Slot as SlotProps } from "../../models/Grid/Slot";
import Slot, { Item } from "../Slot/Slot";
import LeftRightBanner, { StyledLeftRightBanner } from "./LeftRightBanner";

const StyledContainer = styled.div`
  ${Item} {
    width: 100%;

    @media screen and (min-width: 768px) {
      &:nth-child(2n) ${StyledLeftRightBanner} {
        flex-direction: row-reverse;
      }
    }
  }
`;

const LeftRightBannerContainer: React.FC<SlotProps> = (slot) => {
  return (
    <StyledContainer>
      <Slot {...slot} BannerComponent={LeftRightBanner} />
    </StyledContainer>
  );
};

export default LeftRightBannerContainer;
