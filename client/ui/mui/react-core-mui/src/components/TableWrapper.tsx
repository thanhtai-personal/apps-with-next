import { makeStyles } from "@mui/styles";
import {
  Paper, Table, TableBody,
  TableCell, TableContainer,
  TableHead, TableRow
} from "@mui/material"
import Text from "./Text";
import Flex from "./Flex";
import { Colors } from "../colors";
import { ReactNode } from "react";

const useStyles = makeStyles({
  root: {
    width: "100%",
    borderRadius: 10,
    display: "flex",
    minHeight: 500,
    overflow: "auto",
    background: "transparent",
  },
  container: {
    borderRadius: 10,
    minHeight: 0,
    overflow: "auto",
  },
  tableHeaderRow: {
    background: "transparent",
    borderBottom: 'solid 1px',
    borderColor: Colors.appBorderColor
  },
  tableRow: {
    backgroundColor: "transparent",
    "&:nth-child(odd)": {
      background: "transparent",
    },
  },
});

export interface TableWrapperColumn {
  dataKey: string;
  label?: string | Function;
  cellRenderer: (value: any, row: any) => any;
}

export type TableWrapperProps = {
  data: any[];
  columns: TableWrapperColumn[];
  loading?: boolean;
  minWidth?: number;
  minHeight?: number;
  loadingIcon?: ReactNode;
  pagination?: {
    limit?: number;
    page?: number;
    total?: number;
    set: (key: "limit" | "page" | "total", value: number) => void;
  };
};

export function MuiTableWrapper(props: TableWrapperProps) {
  const classes = useStyles();
  const { data, columns, pagination, loading, minWidth, minHeight, loadingIcon } = props;

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container} style={{
        width: "100%", position: "relative", paddingBottom: pagination ? 86 : 16
      }}>
        <Table sx={{ minWidth: minWidth, minHeight: minHeight }} aria-label="sticky table" stickyHeader>
          <TableHead
            style={{
              backgroundColor: Colors.tableHeaderBg,
            }}
          >
            <TableRow className={classes.tableHeaderRow}>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  style={{
                    backgroundColor: Colors.tableHeaderBg,
                    borderBottom: 'solid 1px',
                    borderColor: Colors.appBorderColor
                  }}
                >
                  {typeof column.label === "string" ? (
                    <Text color="#86889A" variant="bold">
                      {column.label}
                    </Text>
                  ) : (
                    column?.label?.()
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ height: "100%" }}>
            {loading ?
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Flex center fullSize minHeight={600}>
                    {loadingIcon ? loadingIcon : ""}
                  </Flex>
                </TableCell>
              </TableRow>
              : data.map((row, rowIndex) => {
                return (
                  <TableRow
                    role="checkbox"
                    tabIndex={-1}
                    key={rowIndex}
                    className={classes.tableRow}
                  >
                    {columns.map((column, columnIndex) => {
                      const value = row[column.dataKey];
                      return (
                        <TableCell key={columnIndex}>
                          {column.cellRenderer(value, row)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default MuiTableWrapper