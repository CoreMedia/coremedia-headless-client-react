import React from "react";
import styled from "styled-components";
import { Slot as SlotProps } from "../../models/Grid/Slot";
import Slot, { StyledSlot } from "../Slot/Slot";
import PortraitBanner from "./PortraitBanner";

const StyledPortraitBanner = styled.div`
  ${StyledSlot} {
    --number-items: 2;
    --gap-width: var(--padding-medium);

    @media screen and (min-width: 1024px) {
      --number-items: 4;
    }
  }
`;

const PortraitBannerContainer: React.FC<SlotProps> = (slot) => {
  return (
    <StyledPortraitBanner>
      <Slot {...slot} BannerComponent={PortraitBanner} />
    </StyledPortraitBanner>
  );
};

export default PortraitBannerContainer;
