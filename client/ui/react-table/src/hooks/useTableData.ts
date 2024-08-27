import React, { ReactNode, useEffect, useState } from "react";
import { IPaginationProps, IPagingState, ISortProps } from "../interfaces";
import { usePagination } from "./usePagination";
import { useSort } from "./useSort";
// import { useFilter } from "./useFilter";

export interface IColumn<RecordType> {
  name: string;
  label: ReactNode | string;
  render: (record: RecordType) => React.ReactNode;
}

export interface ITableProps<RecordType> {
  // filter?: any; //TODO: add later
  pagination?: IPaginationProps;
  sort?: Partial<ISortProps>;
  records: RecordType[];
  columns: IColumn<RecordType>[];
  indexing?: {
    enabled?: boolean;
    start?: number;
  },
  onFilter: (filterParams: {
    sortValues?: string[];
    pagination?: IPagingState;
    // filterValues
  }) => void;

}

export interface ITableState<RecordType> {
  records: RecordType[],
  pagination?: IPagingState;
  sortValues: string[];
  // filter,
}

export interface IRecord {
  id: string;
}

export const useTableData = <RecordType extends IRecord>({
  // filter,
  pagination = {},
  sort = {
    columnNames: []
  },
  records = [],
  columns = [],
  onFilter
}: ITableProps<RecordType>) => {
  const [currentState, setCurrentState] = useState<ITableState<RecordType>>({
    records,
    pagination: {
      offset: 0,
      limit: 10,
    },
    sortValues: [],
    // filter,
  });

  const onSortChange = (sortValues: string[]) => {
    setCurrentState((prev) => {
      const newPaging = {
        ...prev.pagination,
        offset: 0,
      }
      onFilter && onFilter({
        sortValues,
        pagination: {
          offset: newPaging.offset || 0,
          limit: newPaging.limit || 10,
        }
      });
      return ({
        ...prev,
        sortValues,
        pagination: newPaging
      })
    });
  };

  const onPageChange = (pagination: IPagingState) => {
    onFilter && onFilter({ pagination, sortValues: currentState.sortValues });
    setCurrentState((prev) => ({
      ...prev,
      pagination
    }));
  };

  // const filterHandler = useFilter();

  const pagingHandler = usePagination({
    ...(currentState.pagination || {}),
    onChange: pagination.onChange || onPageChange
  });

  const sortingHandler = useSort({
    ...sort,
    columnNames: sort.columnNames || columns.map((col) => col.name),
    onChange: sort.onChange || onSortChange,
  });

  useEffect(() => {
    if (pagination) {
      setCurrentState((prev) => ({
        ...prev,
        pagination
      }))
    }
  }, [pagination.limit, pagination.offset])

  return {
    currentState,
    paging: pagingHandler,
    sorting: sortingHandler,
    // filter: filterHandler,
  };
};

