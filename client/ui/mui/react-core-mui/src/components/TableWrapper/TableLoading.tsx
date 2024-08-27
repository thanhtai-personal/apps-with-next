import { TableCell, TableRow } from "@mui/material";
import { useMemo } from "react";
import Flex from "../Flex";
import Loading from "../Loading";
import { TableWrapperColumn } from ".";


export type TableLoadingProps = {
  columns: Array<TableWrapperColumn>;
  size?: number;
};

export const TableLoading = ({ columns, size = 25 }: TableLoadingProps) => {

  const LoadingRows = useMemo(() => {
    const rows: Array<any> = [];
    for (let i = 0; i < size; i++) {
      rows.push(
        <TableRow key={`loading-row-${i}`}>
          {columns.map((col, index) => (
            <TableCell
              key={`cell-loadind-${index}`}
              style={{
                width: col.minWidth || 20,
              }}
            >
              <Flex fullWidth>
                {col.renderLoading ? (
                  col.renderLoading(col)
                ) : (
                  // <Loading skeletons={1} noThumb r={2} width={30} height={30} x={-30} y={0} minHeight={60} />
                  <Loading />
                )}
              </Flex>
            </TableCell>
          ))}
        </TableRow>
      );
    }
    return rows;
  }, [size, columns]);

  return <>{LoadingRows}</>;
};

export default TableLoading;
