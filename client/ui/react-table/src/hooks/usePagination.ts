import { useState } from "react";
import { IPaginationProps, IPaginationResult, IPagingState } from "../interfaces";

export const usePagination = ({
  offset = 0,
  limit = 20,
  total = 0,
  onChange,
}: IPaginationProps): IPaginationResult => {
  const [paging, setPaging] = useState<IPagingState>({
    offset,
    limit,
    total,
  });

  const validate = (): true | string => {
    if (paging.total && paging.total < 0) {
      return "Total less than 0";
    }
    if (paging.total && paging.total < 0) {
      return "Skip less than 0";
    }
    if (paging.limit && paging.limit <= 0) {
      return "Size less than or equal to 0";
    }
    return true;
  };

  const prev = (): void | string => {
    const validateMessage = validate();
    if (validateMessage !== true) return validateMessage;
    if (paging.offset && paging.offset > 0) {
      const newSkip = paging.offset - (paging.limit || 10);
      setPaging((prev) => {
        const newPaging = {
          ...prev,
          offset: newSkip > 0 ? newSkip : 0,
        }
        onChange && onChange(newPaging);
        return newPaging
      });
    }
  };

  const next = (): void | string => {
    const validateMessage = validate();
    if (validateMessage !== true) return validateMessage;
    if (paging.offset && paging.offset >= 0) {
      const newSkip = paging.offset + (paging.limit || 10);
      setPaging((prev) => {
        const newPaging = {
          ...prev,
          offset: newSkip < total ? newSkip : total,
        }
        onChange && onChange(newPaging);
        return newPaging
      });
    }
  };

  const first = (): void | string => {
    const validateMessage = validate();
    if (validateMessage !== true) return validateMessage;
    setPaging((prev) => {
      const newPaging = {
        ...prev,
        offset: 0,
      }
      onChange && onChange(newPaging);
      return newPaging
    });
  };

  const last = (): void | string => {
    const validateMessage = validate();
    if (validateMessage !== true) return validateMessage;
    if (paging.total && paging.total > 0 && (paging.limit || 10) > 0) {
      const pageValueStr = (paging.total / (paging.limit || 10)).toString();
      const intValue = parseInt(pageValueStr);
      const floatValue = parseFloat(pageValueStr);
      const newSkip =
        (intValue < floatValue ? intValue : intValue > 0 ? intValue - 1 : 0) *
        (paging.limit || 10);
      setPaging((prev) => {
        const newPaging = {
          ...prev,
          offset: newSkip,
        }
        onChange && onChange(newPaging);
        return newPaging
      });
    }
  };

  const page = (newPage?: number, triggerOnChange?: boolean): number | void | string => {
    const validateMessage = validate();
    if (validateMessage !== true) return validateMessage;
    if (newPage) {
      setPaging((prev) => {
        const newPaging = {
          ...prev,
          offset: (newPage - 1) * (paging.limit || 10),
        }
        triggerOnChange && onChange && onChange(newPaging);
        return newPaging
      });
    } else {
      return paging.offset ? (paging.offset / (paging.limit || 10)) + 1 : 1;
    }
  };

  const size = (newSize?: number, triggerOnChange?: boolean): number | void => {
    if (newSize || newSize === 0) {
      setPaging((prev) => {
        const newPaging = {
          ...prev,
          offset: newSize,
        }
        triggerOnChange && onChange && onChange(newPaging);
        return newPaging
      });
    } else {
      return paging.limit;
    }
  };

  return {
    prev,
    next,
    first,
    last,
    size,
    page,
  };
};