import React from "react";
import styled from "styled-components";
import Include, { viewDispatcher } from "../../utils/ViewDispatcher/Include";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { FragmentPreviewContextProvider } from "../../context/FragmentPreviewContext";
import { metaDataForResponsiveDevices } from "../../utils/Preview/MetaData";
import SeoHeader from "../Header/SeoHeader";
import FragmentPreviewItem from "./FragmentPreviewItem";
import { Fragment } from "./FragmentsByType";

/* import views */
import CategoryAsPreview from "./views/Category.asPreview";
import CMChannel from "./views/CMChannel";
import CMCollectionAsContainerPreview from "./views/CMCollection.asContainerPreview";
import ExternalProductAsPreview from "./views/CMExternalProduct.asPreview";
import CMHTMLAsContainerPreview from "./views/CMHTML.asContainerPreview";
import CMPersonAsFullPreview from "./views/CMPerson.asFullPreview";
import CMPictureAsPreview from "./views/CMPicture.asPreview";
import CMTeasableAsContainerPreview from "./views/CMTeasable.asContainerPreview";
import CMTeasableAsFullPreview from "./views/CMTeasable.asFullPreview";
import ProductAsPreview from "./views/Product.asPreview";

/* add views to view dispatcher */
viewDispatcher.addViewComponent(CategoryAsPreview, "Category", "asPreview");
viewDispatcher.addViewComponent(CMChannel, "CMChannel");
viewDispatcher.addViewComponent(CMCollectionAsContainerPreview, "CMCollection", "asContainerPreview");
viewDispatcher.addViewComponent(ExternalProductAsPreview, "CMExternalProduct", "asPreview");
viewDispatcher.addViewComponent(CMHTMLAsContainerPreview, "CMHTML", "asContainerPreview");
viewDispatcher.addViewComponent(CMPersonAsFullPreview, "CMPerson", "asFullPreview");
viewDispatcher.addViewComponent(CMPictureAsPreview, "CMPicture", "asPreview");
viewDispatcher.addViewComponent(CMTeasableAsContainerPreview, "CMTeasable", "asContainerPreview");
viewDispatcher.addViewComponent(CMTeasableAsFullPreview, "CMTeasable", "asFullPreview");
viewDispatcher.addViewComponent(ProductAsPreview, "Product", "asPreview");

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

  return (
    <StyledPreview {...metaDataForResponsiveDevices()}>
      <SeoHeader isPreview={true} />
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
