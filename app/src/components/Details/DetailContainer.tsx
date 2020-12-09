import React from "react";
import { Slot as SlotProps } from "../../models/Grid/Slot";
import Slot from "../Slot/Slot";

interface Props {
  slot: SlotProps;
}

const DetailContainer: React.FC<Props> = ({ slot }) => {
  return <Slot className={"cm-details"} viewName={"asDetail"} {...slot} />;
};

export default DetailContainer;
