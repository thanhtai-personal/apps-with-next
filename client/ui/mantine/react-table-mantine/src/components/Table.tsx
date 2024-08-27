import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconCaretUpDownFilled,
  IconDatabaseSearch,
  Pagination,
  PaginationProps,
  Skeleton,
  Table,
  TableProps,
  Text,
} from "@core-ui/react-mantine-core";
import {
  IColumn,
  useTableData,
  IRecord,
  IPagingState,
  ISortProps,
  ESortDirection,
} from "@core-ui/react-table";
import { ReactNode, useMemo } from "react";

export interface IMantineTableProps<RecordType> {
  records: RecordType[];
  onFilter: (filterParams: {
    sortValues?: string[];
    pagination?: IPagingState;
  }) => void;
  total?: number;
  columns: IColumn<RecordType>[];
  classes?: {
    container?: string;
    header?: string;
    body?: string;
    headerCell?: string;
    cell?: string;
    row?: string;
  };
  pageProps?: Partial<PaginationProps>;
  tableProps?: Partial<TableProps>;
  sort?: Partial<ISortProps>;
  loading?: boolean;
  skeletonRows?: number;
  onRowClick?: (record?: RecordType) => () => void;
}

export const MantineTable = <RecordType extends IRecord>({
  records,
  columns,
  classes,
  pageProps,
  tableProps,
  sort,
  total,
  onFilter,
  loading,
  skeletonRows = 7,
  onRowClick,
}: IMantineTableProps<RecordType>) => {
  const { sorting, paging, currentState } = useTableData<RecordType>({
    records,
    columns,
    onFilter,
    sort,
  });

  const tableHeader = useMemo(() => {
    return columns.map((column) => {
      const currentSort =
        currentState.sortValues.find((sortString) =>
          sortString.includes(column.name),
        ) || "";
      const direction = currentSort
        ? currentSort.split(":")?.at(1) || ESortDirection.ALL
        : ESortDirection.ALL;

      return (
        <Table.Th key={column.name}>
          <div
            className={`flex flex-row justify-start items-center${classes?.headerCell}`}
          >
            <div>{column.label}</div>
            {sort?.columnNames?.includes(column.name) && (
              <div
                className="mx-2 mt-1 flex flex-col h-full justify-center items-end cursor-pointer scale-110 hover:scale-125"
                onClick={() => {
                  sorting.sorting(column.name);
                  paging.page(1);
                }}
              >
                {direction === ESortDirection.ALL && (
                  <IconCaretUpDownFilled size={14} />
                )}
                {direction === ESortDirection.DESC && (
                  <IconCaretUpFilled size={14} />
                )}
                {direction === ESortDirection.ASC && (
                  <IconCaretDownFilled size={14} />
                )}
              </div>
            )}
          </div>
        </Table.Th>
      );
    });
  }, [columns, sorting, currentState.sortValues]);

  const tableRows = useMemo(() => {
    if (loading) {
      const skeletonElement: ReactNode[] = [];
      for (let i = 0; i < skeletonRows; i++) {
        skeletonElement.push(
          <Table.Tr key={`skeleton-row-${i}`} className={classes?.cell}>
            {columns.map((column) => (
              <Table.Td key={`skeleton-row-${i}-${column.name}`}>
                <Skeleton height={20} radius={"xl"} m="sm" width={"85%"} />
              </Table.Td>
            ))}
          </Table.Tr>,
        );
      }
      return skeletonElement;
    }

    if (!records || records?.length === 0) {
      return (
        <Table.Tr key={"empty-row"} className={classes?.cell}>
          <Table.Td key={`empty cell`} rowSpan={5} colSpan={columns.length}>
            <div className="w-full h-full justify-center items-center flex flex-col min-h-40">
              <IconDatabaseSearch stroke={2} />
              <Text>No data</Text>
            </div>
          </Table.Td>
        </Table.Tr>
      );
    }

    return records.map((record: RecordType) => {
      return (
        <Table.Tr
          onClick={onRowClick ? onRowClick(record) : () => { }}
          key={record.id}
          className={`${!!onRowClick && "cursor-pointer"} ${classes?.row}`}
        >
          {columns.map((column) => (
            <Table.Td key={`${record.id}-${column.name}`} className={`${classes?.cell}`}>
              {column.render(record)}
            </Table.Td>
          ))}
        </Table.Tr>
      );
    });
  }, [records, columns, loading]);

  const page = useMemo(() => paging.page(), [paging]);
  const size = useMemo(() => paging.size(), [paging]);
  const totalPage = useMemo(
    () => (total ? parseInt((total / (size as number)).toString()) + 1 : 1),
    [total, paging],
  );

  return (
    <div className={`w-full h-full ${classes?.container}`}>
      <Table {...tableProps}>
        <Table.Thead className={classes?.header}>
          <Table.Tr>{tableHeader}</Table.Tr>
        </Table.Thead>
        <Table.Tbody className={classes?.body}>{tableRows}</Table.Tbody>
      </Table>
      <div className="flex w-full flex-row justify-end">
        <Pagination
          total={totalPage}
          value={typeof page === "number" ? page : 1}
          onChange={(_page: number) => {
            paging.page(_page, true);
          }}
          mt="sm"
          {...(pageProps || {})}
        />
      </div>
    </div>
  );
};
