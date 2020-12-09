import React from "react";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import Include from "../../utils/ViewDispatcher/Include";
import "./Slot.scss";
import SlotHeader from "./SlotHeader";
import { Slot as SlotProps } from "../../models/Grid/Slot";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";

interface Props extends SlotProps {
  items: Array<Dispatchable | null> | null;
  className?: string;
  viewName: string;
}

const Slot: React.FC<Props> = ({ items, className = "cm-banner", viewName, text, title, metadata = {} }) => {
  return (
    <div className={`cm-slot ${className}-container`} {...metaDataElement(metadata.root)}>
      <SlotHeader slotTitle={title} slotText={text} />
      <div className={`cm-slot__items`} {...metaDataProperty(metadata.items)}>
        {items &&
          items.map((item, index) => {
            return (
              item && (
                <Include
                  self={item}
                  key={index}
                  view={"_gridItem"}
                  params={{ includeView: viewName, className: className }}
                />
              )
            );
          })}
      </div>
    </div>
  );
};

export default Slot;
