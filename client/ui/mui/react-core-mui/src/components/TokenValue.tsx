import Flex from "./Flex";
import { ReactNode } from "react";

import { observer } from '@core-utils/react-mobx-state';
import Text from './Text';
import { Colors } from '../colors';

interface TokenValueProps {
  token?: string;
  value: number | ReactNode;
  style?: any;
  color?: any;
  icon?: ReactNode;
  reverse?: boolean;
  fontSize?: number | string;
}

export const TokenValue = observer((props: TokenValueProps) => {
  const { value, icon, reverse, fontSize = 14, color, style } = props;

  return (
    <Flex width="fit-content" flexDirection={reverse ? "row-reverse" : 'row'} alignItems='center'>
      {icon ? icon : ""}
      <Text mr={reverse ? 0.5 : 0} ml={reverse ? 0 : 0.5} color={color || Colors.textWhite} whiteSpace="nowrap" style={{ fontWeight: 550, fontSize, ...style }}>
        {value}
      </Text>
    </Flex>
  );
});
