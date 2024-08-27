import { Pagination } from "@mui/material";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material"
import { makeStyles } from "@mui/styles";
import { observer, useLocalObservable } from "@core-ui/react-mobx-state";
import Flex from "../Flex";
import TableHeaderRow from "./TableHeaderRow";
import TableLoading from "./TableLoading";
import TableRowContent from "./TableRow";

import { Colors } from "../../colors";
import useResponsive from "../../hooks/useResponsive";

export interface TableWrapperColumn {
  dataKey: string;
  dataSortKey: string;
  label?: string | Function;
  sort?: boolean;
  sortOptions?: Array<any>;
  switchable?: boolean;
  switchableData?: Array<any>;
  width?: string | number;
  right?: boolean;
  minWidth?: string | number;
  renderLoading?: Function;
  cellRenderer: (value: any, row: any, switchableIndex?: number) => any;
}

export type TableWrapperProps = {
  data: any[];
  columns: TableWrapperColumn[];
  filter?: any;
  loading?: boolean;
  paging?: any;
  setPaging?: Function;
  setFilter?: Function;
  rowClick?: Function;
};

export const TableWrapper = observer((props: TableWrapperProps) => {
  const classes = useStyles();
  const { tabletSizeDown } = useResponsive();

  const {
    data,
    columns,
    filter,
    setFilter,
    rowClick,
    loading,
    paging,
    setPaging,
  } = props;
  const state = useLocalObservable(() => ({
    currentSortColumn: "",
    switchIndex: 0,
    anchorEl: null as null | HTMLElement,
  }));

  return (
    <Flex column center className={classes.root}>
      <TableContainer className={classes.container}>
        <Table aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableHeaderRow
              columns={columns}
              filter={filter}
              setFilter={setFilter}
              state={state}
            />
          </TableHead>
          <TableBody>
            {loading ? (
              <TableLoading columns={columns} size={paging.size} />
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div></div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => {
                return (
                  <TableRowContent
                    columns={columns}
                    rowClick={rowClick}
                    key={rowIndex}
                    rowIndex={rowIndex}
                    row={row}
                    switchIndex={state.switchIndex}
                  />
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Flex my={3}>
        <Pagination
          page={paging?.current || 1}
          count={parseInt((paging?.total / paging?.size).toString()) + 1}
          onChange={(_e, page) => {
            setPaging &&
              setPaging((prev) => {
                return {
                  ...prev,
                  current: page || 1,
                };
              });
          }}
          color="primary"
          size={tabletSizeDown ? "small" : "large"}
          variant="outlined"
        />
      </Flex>
    </Flex>
  );
})

const useStyles = makeStyles({
  root: {
    width: "100%",
    borderRadius: 10,
    display: "flex",
    flexGrow: 1,
    minHeight: 500,
    overflow: "auto",
  },
  container: {
    borderRadius: 10,
    flexGrow: 1,
    minHeight: 0,
    overflow: "auto",
  },
  tableHeaderRow: {},
  tableRow: {
    borderTop: `${Colors.border} !important`,
    cursor: "pointer",
    "&:hover": {
      background: `${Colors.rowHoverBg} !important`,
    },
  },
  headerCell: {
    background: `${Colors.tableHeaderBg} !important`,
    "&:hover": {
      color: `${Colors.gray200} !important`,
    },
  },
  headerCellSwitchable: {
    background: `${Colors.tableHeaderBg} !important`,
  },
  columnSwitchable: {
    paddingLeft: "20px",
    paddingRight: "20px",
    textAlign: "center",
    justifyContent: "center",
  },
  switchableLeft: {
    position: "absolute",
    left: "2px",
    cursor: "pointer",
    "&:hover": {
      color: `${Colors.gray200} !important`,
    },
  },
  switchableRight: {
    position: "absolute",
    right: "2px",
    cursor: "pointer",
    "&:hover": {
      color: `${Colors.gray200} !important`,
    },
  },
});

export default TableWrapper;
