import React from "react";
import { SupportsStaticCode } from "../../models/Banner/Code";
import { metaDataElement } from "../../utils/Preview/MetaData";

const StaticCode: React.FC<SupportsStaticCode> = ({ code, metadata }) => {
  return <>{code && <div {...metaDataElement(metadata?.root)} dangerouslySetInnerHTML={{ __html: code }} />}</>;
};

export default StaticCode;
