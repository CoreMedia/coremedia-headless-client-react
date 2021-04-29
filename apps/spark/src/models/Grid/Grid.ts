import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import PreviewMetadataProps from "../../utils/Preview/MetaData";
import { PageGrid } from "../../queries/fragments/__generated__/PageGrid";

/**
 * @category ViewModels
 */
export interface Col extends Dispatchable, PreviewMetadataProps {
  name: string;
  items: Array<Dispatchable>;
}

/**
 * @category ViewModels
 */
export interface Row extends PreviewMetadataProps {
  rowId: number;
  cols: Array<Col> | null;
}

/**
 * @category ViewModels
 */
export interface Grid extends PreviewMetadataProps {
  rows: Array<Row> | null;
}

/**
 * Returns a [[Grid]] object based on the GraphQL [[PageGrid]]
 * @param grid
 */
export const initializeGrid = (grid: PageGrid | null): Grid => {
  return {
    metadata: { root: (grid && grid.id) || undefined },
    rows:
      grid &&
      grid.rows &&
      grid.rows?.map(
        (row): Row => {
          return {
            ...row,
            cols:
              row.placements &&
              row.placements.map(
                (placement): Col => {
                  return {
                    ...placement,
                  };
                }
              ),
          };
        }
      ),
  };
};
