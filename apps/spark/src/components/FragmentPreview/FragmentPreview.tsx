import React from "react";
import styled from "styled-components";
import Include from "../../utils/ViewDispatcher/Include";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { FragmentPreviewContextProvider } from "../../context/FragmentPreviewContext";
import { metaDataForResponsiveDevices } from "../../utils/Preview/MetaData";
import FragmentPreviewItem from "./FragmentPreviewItem";
import { Fragment } from "./FragmentsByType";

interface Props {
  self: Dispatchable;
  fragments: Fragment | Array<Fragment>;
}

const StyledPreview = styled.div`
  background: none transparent;
  margin: 0;
  padding: 0;
  height: auto;
`;

const FragmentPreview: React.FC<Props> = ({ self, fragments }) => {
  if (!(fragments instanceof Array)) {
    return <Include self={self} view={fragments.viewName} />;
  }

  document.body.classList.add("cm-app--preview");
  return (
    <StyledPreview {...metaDataForResponsiveDevices()}>
      <FragmentPreviewContextProvider type={self.__typename}>
        {fragments.map((fragment, index) => (
          <FragmentPreviewItem key={index} title={fragment.title}>
            <Include self={self} view={fragment.viewName} params={{ ...fragment.viewParams }} />
          </FragmentPreviewItem>
        ))}
      </FragmentPreviewContextProvider>
    </StyledPreview>
  );
};

export default FragmentPreview;
