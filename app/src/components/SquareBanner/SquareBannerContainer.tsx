import React from "react";
import Slot from "../Slot/Slot";
import { Slot as SlotProps } from "../../models/Grid/Slot";

interface Props {
  slot: SlotProps;
}

const SquareBannerContainer: React.FC<Props> = ({ slot }) => {
  return <Slot className={"cm-square-banner"} viewName={"asSquareBanner"} {...slot} />;
};

export default SquareBannerContainer;
