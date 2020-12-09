import React from "react";
import { Slot as SlotProps } from "../../models/Grid/Slot";
import Slot from "../Slot/Slot";

interface Props {
  slot: SlotProps;
}

const PortraitBannerContainer: React.FC<Props> = ({ slot }) => {
  return <Slot className={"cm-portrait-banner"} viewName={"asPortraitBanner"} {...slot} />;
};

export default PortraitBannerContainer;
