import { Collapse } from '@mui/material';
import { useEffect } from 'react';
import { useLocalObservable, observer } from "@core-ui/react-mobx-state"
import Flex from './Flex';

export const DelayTooltip = observer(props => {
  const state = useLocalObservable(() => ({
    mouseIn: false,
    openTooltip: false,
  }));

  useEffect(() => {
    if (state.mouseIn) {
      setTimeout(() => {
        if (state.mouseIn) {
          state.openTooltip = true;
        }
      }, props.delayTime || 1000);
    } else {
      state.openTooltip = false;
    }
  }, [state.mouseIn]);

  return (
    <Flex
      position={'relative'}
      onMouseOver={() => {
        state.mouseIn = true;
      }}
      onMouseLeave={() => {
        state.mouseIn = false;
      }}
    >
      {props.children}
      <Flex
        position={'absolute'}
        top={props.top || '35%'}
        left={props.left || '25%'}
        bgcolor={props.bgcolor}
      >
        <Collapse in={state.openTooltip}>
          {props.renderTooltip && props.renderTooltip(state.openTooltip)}
        </Collapse>
      </Flex>
    </Flex>
  );
});