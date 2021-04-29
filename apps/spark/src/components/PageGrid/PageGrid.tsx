import React, { FC } from "react";
import { Alert } from "../Error/Alert";
import Row from "./Row";
import Col from "./Col";
import { Grid } from "../../models/Grid/Grid";

import "./PageGrid.scss";

const PageGrid: FC<Grid> = ({ rows = [] }) => {
  if (!rows) {
    return <Alert message={"Error: PageGrid has no rows."} />;
  }

  return (
    <>
      {rows.map((row, rowindex) => (
        <Row {...row} key={rowindex}>
          {row.cols?.map((placement, index) => {
            // header and footer are already rendered by SiteContextProvider
            if (
              placement.name === "header" ||
              placement.name === "ticker" ||
              placement.name === "footer-navigation" ||
              placement.name === "footer"
            ) {
              return null;
            } else {
              return <Col key={index} col={placement} />;
            }
          })}
        </Row>
      ))}
    </>
  );
};

export default PageGrid;
