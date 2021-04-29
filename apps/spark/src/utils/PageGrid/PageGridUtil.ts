import { Col, Grid } from "../../models/Grid/Grid";

export const colByName = (grid: Grid | undefined | null, colName: string): Col | undefined => {
  let colByName = undefined;
  if (grid) {
    grid.rows?.forEach((row) => {
      row.cols?.forEach((placement) => {
        if (placement.name === colName) {
          colByName = placement;
          return;
        }
      });
    });
  }
  return colByName;
};
