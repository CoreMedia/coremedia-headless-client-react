import React, { FC } from "react";
import styled from "styled-components";
import { Alert } from "../Error/Alert";
import { Grid } from "../../models/Grid/Grid";
import Row from "./Row";
import Col from "./Col";

export const StyledGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  --grid-gap: var(--padding-medium);
`;

const PageGrid: FC<Grid> = ({ rows = [], campaignDataSlots }) => {
  if (!rows) {
    return <Alert message={"Error: PageGrid has no rows."} />;
  }

  return (
    <>
      {rows.map((row, rowindex) => (
        <Row {...row} key={rowindex}>
          {row.cols?.map((placement) => {
            // header and footer are already rendered by SiteContextProvider
            if (
              placement.name === "header" ||
              placement.name === "ticker" ||
              placement.name === "footer-navigation" ||
              placement.name === "footer"
            ) {
              return null;
            } else {
              return (
                <>
                  <Col key={placement.name} col={placement} campaignDataSlots={campaignDataSlots} />
                </>
              );
            }
          })}
        </Row>
      ))}
    </>
  );
};

export default PageGrid;
