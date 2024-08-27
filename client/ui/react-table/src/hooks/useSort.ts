import { useState } from "react";
import { ESortDirection, ISortProps, ISortResult, ISortState, ISortValue } from "../interfaces";

export const useSort = ({
  columnNames,
  defaultSortField,
  defaultValue = ESortDirection.ASC,
  onChange,
  multipleSort,
}: ISortProps): ISortResult => {
  const [currentState, setCurrentState] = useState<ISortState>({
    [defaultSortField || columnNames?.at(0) || "missingKey"]: {
      priority: 0,
      value: defaultValue,
      name: defaultSortField || columnNames?.at(0) || "missingKey"
    },
  });

  const getSorts = (newSorts?: ISortState) => {
    const currentSort = newSorts || currentState;
    return Object.keys(currentSort)
      .map((key) => currentSort[key])
      .sort((a, b) => a!.priority - b!.priority)
      .filter((item) => !!item)
      .map((item?: ISortValue) => `${item!.name}:${item!.value}`);
  };

  const getNextValue = (currentValue?: ESortDirection): ESortDirection => {
    switch (currentValue) {
      case ESortDirection.ALL:
        return ESortDirection.ASC;
      case ESortDirection.ASC:
        return ESortDirection.DESC;
      case ESortDirection.DESC:
        return ESortDirection.ALL;
      default:
        return ESortDirection.ALL;
    }
  };

  const repriority = (changedSorts: ISortState) => {
    const newSorts = { ...changedSorts };
    Object.keys(newSorts).forEach((key: string) => {
      if (newSorts[key]) {
        newSorts[key]!.priority = newSorts[key]!.priority + 1
      }
    })
    return newSorts
  }

  const sorting = (key: string) => {
    setCurrentState((prevSorts) => {
      let newSorts = { ...prevSorts };
      if (multipleSort) {
        if (newSorts[key]) {
          newSorts[key] = {
            priority: -1,
            name: key,
            value: getNextValue(newSorts[key]?.value),
          };
        } else {
          newSorts[key] = {
            priority: -1,
            name: key,
            value: ESortDirection.ASC,
          };
        }
      } else {
        newSorts = {
          [key]: {
            priority: 0,
            name: key,
            value: getNextValue(prevSorts[key]?.value)
          }
        }
      }
      onChange && onChange(getSorts(newSorts));
      return repriority(newSorts);
    });
  };

  return {
    sorts: getSorts,
    sort: currentState,
    sorting,
  };
};
