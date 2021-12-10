import React from "react";
import { Fragment } from "./FragmentsByType";
import Include from "../../utils/ViewDispatcher/Include";
import FragmentPreviewItem from "./FragmentPreviewItem";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";

import "./FragmentPreview.scss";
import { FragmentPreviewContextProvider } from "../../context/FragmentPreviewContext";
import { metaDataForResponsiveDevices } from "../../utils/Preview/MetaData";

interface Props {
  self: Dispatchable;
  fragments: Fragment | Array<Fragment>;
}

const FragmentPreview: React.FC<Props> = ({ self, fragments }) => {
  if (!(fragments instanceof Array)) {
    return <Include self={self} view={fragments.viewName} />;
  }

  document.body.classList.add("cm-app--preview");
  return (
    <div className={"cm-preview"} {...metaDataForResponsiveDevices()}>
      <FragmentPreviewContextProvider type={self.__typename}>
        {fragments.map((fragment, index) => (
          <FragmentPreviewItem key={index} title={fragment.title}>
            <Include self={self} view={fragment.viewName} params={{ ...fragment.viewParams }} />
          </FragmentPreviewItem>
        ))}
      </FragmentPreviewContextProvider>
    </div>
  );
};

export default FragmentPreview;
