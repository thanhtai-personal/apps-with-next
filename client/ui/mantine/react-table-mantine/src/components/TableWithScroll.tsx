import { IRecord } from "@core-ui/react-table";
import { IMantineTableProps, MantineTable } from "./Table";
import { Table } from "@core-ui/react-mantine-core";

export interface IMantineTableWithScroll<RecordType> extends IMantineTableProps<RecordType> {
  type?: "native" | "scrollarea";
  minWidth: string | number;
  minHeight?: string | number;
}

export const MantineTableWithScroll = <RecordType extends IRecord>(
  props: IMantineTableWithScroll<RecordType>,
) => {
  const { minWidth, minHeight, type, ...nestedProps } = props;

  return (
    <Table.ScrollContainer mih={minHeight} minWidth={minWidth} type={type}>
      <MantineTable {...nestedProps} />
    </Table.ScrollContainer>
  );
};
