import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import PreviewMetadata, { initializeMetadata } from "../../utils/Preview/MetaData";
import { PageGrid } from "@coremedia-labs/graphql-layer";

/**
 * @category ViewModels
 */
export interface Col extends Dispatchable, PreviewMetadata {
  name: string;
  items: Array<Dispatchable>;
}

/**
 * @category ViewModels
 */
export interface Row extends PreviewMetadata {
  rowId: number;
  cols: Array<Col> | null;
}

/**
 * @category ViewModels
 */
export interface Grid extends PreviewMetadata {
  rows: Array<Row> | null;
}

/**
 * Returns a [[Grid]] object based on the GraphQL [[PageGrid]]
 * @param grid
 */
export const initializeGrid = (grid: PageGrid | null): Grid => {
  return {
    ...(grid && initializeMetadata(grid.id)),
    rows:
      grid &&
      grid.rows &&
      grid.rows?.map((row): Row => {
        return {
          ...row,
          cols:
            row.placements &&
            row.placements.map((placement): Col => {
              return {
                ...placement,
              };
            }),
        };
      }),
  };
};
