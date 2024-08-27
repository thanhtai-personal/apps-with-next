import { makeStyles } from "@mui/styles";
import Flex from "../Flex";

import { TableCell, TableRow } from "@mui/material";
import { Colors } from "../../colors";

export function TableRowComponent(props: any) {
  const classes = useStyles();
  const {
    columns,
    rowClick,
    rowIndex,
    row,
    switchIndex,
  } = props;

  return (
    <TableRow
      role="checkbox"
      tabIndex={-1}
      key={rowIndex}
      onClick={(() => rowClick && rowClick(row)) || (() => { })}
      className={classes.tableRow}
    >
      {columns.map((column, columnIndex) => {
        const value = row[column.dataKey];
        if (column.switchable) {
          return (
            <TableCell
              style={{
                minWidth: column.minWidth || 0,
              }}
              key={columnIndex}
            >
              {column.cellRenderer(value, row, switchIndex)}
            </TableCell>
          );
        }
        return (
          <TableCell key={columnIndex}>
            <Flex>{column.cellRenderer(value, row)}</Flex>
          </TableCell>
        );
      })}
    </TableRow>
  );
}

const useStyles = makeStyles({
  tableRow: {
    borderTop: `${Colors.border}`,
    cursor: "pointer",
    "&:hover": {
    },
  },
});

export default TableRowComponent;
