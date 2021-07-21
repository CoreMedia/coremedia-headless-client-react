import React, { FC } from "react";
import expandedIcon from "./assets/expanded.png";
import collapsedIcon from "./assets/collapsed.png";
import { useFragmentPreviewContextState } from "../../context/FragmentPreviewContext";

interface FragmentPreviewItemProps {
  title: string;
}

const FragmentPreviewItem: FC<FragmentPreviewItemProps> = ({ title, children }) => {
  const { toggleEntry, items, type } = useFragmentPreviewContextState();
  const view = type + "_" + title.toLowerCase();

  const collapsed = (id: string) => {
    return !!items.find((item) => item.title === id);
  };

  return (
    <div className={"cm-preview-item"}>
      <div
        className={"cm-preview-item__headline"}
        onClick={() => {
          toggleEntry(view);
        }}
        style={{
          background: `url(${collapsed(view) ? collapsedIcon : expandedIcon}) 6px no-repeat #c8c6c6`,
        }}
      >
        {title}
      </div>
      <div style={{ display: collapsed(view) ? "none" : "block" }}>
        <div className={"cm-preview-item__container"}>
          <div className={"cm-preview-item__content"}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FragmentPreviewItem;
