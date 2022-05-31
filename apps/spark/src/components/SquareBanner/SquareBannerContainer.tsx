import React from "react";
import styled from "styled-components";
import Slot, { StyledSlot } from "../Slot/Slot";
import { Slot as SlotProps } from "../../models/Grid/Slot";
import SquareBanner from "./SquareBanner";

const StyledSquareBanner = styled.div`
  ${StyledSlot} {
    --number-items: 3;
    --gap-width: var(--padding-medium);

    @media screen and (min-width: 768px) {
      --number-items: 2;
    }

    @media screen and (min-width: 1024px) {
      --number-items: 3;
    }
  }
`;

const SquareBannerContainer: React.FC<SlotProps> = (slot) => {
  return (
    <StyledSquareBanner>
      <Slot {...slot} BannerComponent={SquareBanner} />
    </StyledSquareBanner>
  );
};

export default SquareBannerContainer;
