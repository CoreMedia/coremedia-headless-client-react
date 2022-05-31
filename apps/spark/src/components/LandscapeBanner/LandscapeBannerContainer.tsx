import React from "react";
import styled from "styled-components";
import { Slot as SlotProps } from "../../models/Grid/Slot";
import Slot, { StyledSlot } from "../Slot/Slot";
import LandscapeBanner from "./LandscapeBanner";

const StyledLandscapeBanner = styled.div`
  ${StyledSlot} {
    --number-items: 1;
    --gap-width: var(--padding-medium);

    @media screen and (min-width: 768px) {
      --number-items: 2;
    }

    @media screen and (min-width: 1024px) {
      --number-items: 3;
    }
  }
`;

const LandscapeBannerContainer: React.FC<SlotProps> = (slot) => {
  return (
    <StyledLandscapeBanner>
      <Slot {...slot} BannerComponent={LandscapeBanner} />
    </StyledLandscapeBanner>
  );
};

export default LandscapeBannerContainer;
