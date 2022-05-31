import React, { FC, ReactNodeArray } from "react";
import { Row as RowProps } from "../../models/Grid/Grid";

// render rows only, if at least 2 placements are in a row
const Row: FC<RowProps> = ({ children }) => {
  if (children !== undefined && Array.isArray(children)) {
    let array: ReactNodeArray = children;
    array = children.filter((item) => {
      return item !== undefined;
    });
    if (array.length <= 1) {
      return <>{children}</>;
    }
  }
  return <div>{children}</div>;
};

export default Row;
