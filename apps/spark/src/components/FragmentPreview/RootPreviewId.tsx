import { Helmet } from "react-helmet-async";
import { metaDataElement, MetadataRoot } from "../../utils/Preview/MetaData";
import React from "react";
import { isPreview } from "../../utils/Preview/Preview";

interface Props {
  metadataRoot?: MetadataRoot;
}

/**
 * Reusing Helmet to pass the id of the root element up the component hierarchy to add it to the body node.
 * This is required to make use of CoreMedia PDE
 * @param id Id of the e.g. Page to display
 */
const RootPreviewId: React.FC<Props> = ({ metadataRoot }) => {
  return (
    <>
      {metadataRoot && isPreview() && (
        <Helmet>
          <body {...metaDataElement(metadataRoot)} />
        </Helmet>
      )}
    </>
  );
};
export default RootPreviewId;
