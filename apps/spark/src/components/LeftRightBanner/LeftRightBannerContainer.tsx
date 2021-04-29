import React from "react";
import { Slot as SlotProps } from "../../models/Grid/Slot";
import Slot from "../Slot/Slot";

interface Props {
  slot: SlotProps;
}

const LeftRightBannerContainer: React.FC<Props> = ({ slot }) => {
  return <Slot className={"cm-left-right-banner"} viewName={"asLeftRightBanner"} {...slot} />;
};

export default LeftRightBannerContainer;
