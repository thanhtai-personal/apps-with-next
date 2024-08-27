import { Pagination } from "@mui/material";
import Flex from "../Flex";


export interface ITableFooterComponentProps {
  colSpan: number;
  paging: any;
  setPaging: any;
  absolute?: boolean;
  size?: "small" | "large" | "medium";
  siblingCount?: number;
  boundaryCount?: number;
}

export function TableFooterComponent(props: ITableFooterComponentProps) {
  const { size, paging, setPaging, absolute, siblingCount, boundaryCount } = props;

  return (
    <Flex fullWidth py={2} center style={absolute ? { position: "absolute", bottom: 16 } : {}}>
      <Pagination
        page={paging?.current || 1}
        count={parseInt((paging?.total / paging?.size).toString()) + 1}
        onChange={(_e, page) => {
          setPaging &&
            setPaging({
              current: page || 1,
            });
        }}
        boundaryCount={boundaryCount || 0}
        siblingCount={siblingCount || 3}
        color="primary"
        showFirstButton
        showLastButton
        size={size || "large"}
        variant="outlined"
      />
    </Flex>
  );
}

export default TableFooterComponent;
