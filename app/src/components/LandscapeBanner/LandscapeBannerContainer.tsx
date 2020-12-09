import React from "react";
import { Slot as SlotProps } from "../../models/Grid/Slot";
import Slot from "../Slot/Slot";

interface Props {
  slot: SlotProps;
}

const LandscapeBannerContainer: React.FC<Props> = ({ slot }) => {
  return <Slot className={"cm-landscape-banner"} viewName={"asLandscapeBanner"} {...slot} />;
};

export default LandscapeBannerContainer;
