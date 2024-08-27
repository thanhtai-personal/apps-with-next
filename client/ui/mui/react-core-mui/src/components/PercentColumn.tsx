import { Colors } from "../colors";
import Flex from "./Flex"


export interface IPercentColumnProps {
  colors?: string[];
  percents?: number[];
  style?: any;
  styles?: any[];
  contents?: any[];
  width?: number | string;
}

export const PercentColumn = ({
  percents = [],
  colors = [Colors.green, Colors.red],
  styles = [{ padding: '2px 0' }],
  style = {},
  width,
  contents
}: IPercentColumnProps) => {

  return (
    <Flex centerY overflow={"hidden"} width={width || 128} borderRadius={"8px"} style={style}>
      {percents.map((percent, index) => <Flex width={`${percent}%`} height={12}
        py={0.2} style={styles?.[index] || {}} bgcolor={colors?.[index]}
        justifyContent={contents?.at(index)?.justifyContent || "start"}
      >
        {contents?.at(index)?.element}
      </Flex>)}
    </Flex>
  )
}