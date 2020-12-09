import React, { FC } from "react";
import Include from "../../utils/ViewDispatcher/Include";
import { metaDataForPlacement } from "../../utils/Preview/MetaData";
import { Col as ColProps } from "../../models/Grid/Grid";

interface PageGridPlacementProps {
  col?: ColProps;
}

const Col: FC<PageGridPlacementProps> = ({ col }) => {
  return (
    <>
      {col && col.items.length > 0 && (
        <div className={`cm-placement cm-placement--${col.name}`} {...metaDataForPlacement(col)}>
          <Include self={col} view={"asContainer"} />
        </div>
      )}
    </>
  );
};

export default Col;
