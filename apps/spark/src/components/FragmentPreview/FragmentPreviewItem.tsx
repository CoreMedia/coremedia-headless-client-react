import React, { FC, useState } from "react";
import expandedIcon from "./assets/expanded.png";
import collapsedIcon from "./assets/collapsed.png";

interface FragmentPreviewItemProps {
  title: string;
}

const FragmentPreviewItem: FC<FragmentPreviewItemProps> = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={"cm-preview-item"}>
      <div
        className={"cm-preview-item__headline"}
        onClick={(): void => setCollapsed(!collapsed)}
        style={{
          background: `url(${collapsed ? collapsedIcon : expandedIcon}) 6px no-repeat #c8c6c6`,
        }}
      >
        {title}
      </div>
      <div style={{ display: collapsed ? "none" : "block" }}>
        <div className={"cm-preview-item__container"}>
          <div className={"cm-preview-item__content"}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FragmentPreviewItem;
