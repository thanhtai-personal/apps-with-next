import { MenuItem, Select } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import Flex from "./Flex";
import Text from "./Text";

import { AppTheme } from "../theme";
import { observer } from "@core-utils/react-mobx-state";

export const MuiSelect = observer((props) => {
  const styles = useStyles(props);

  return (
    <Flex p={1} style={props.style || {}} className={styles.wrapper}>
      <Select
        className={styles.root}
        onChange={(e) => {
          props.onChange && props.onChange(e.target.value);
        }}
        defaultValue={props.options[0].value}
        variant="standard"
      >
        {props.options?.map((opt, index) => (
          <MenuItem
            key={opt.key || opt.id || index}
            value={opt.value}
            className={styles.option}
          >
            <Text>{opt.label}</Text>
          </MenuItem>
        ))}
      </Select>
    </Flex>
  );
});

const useStyles =
  makeStyles((_theme: AppTheme) =>
    createStyles({
      root: {
        minWidth: "150px",
        // padding: "3px 8px 3px 16px",
        // borderRadius: "8px",
        // border: `1px solid ${theme.colors.border}`,
        // background: "#23242E",
        // opacity: 1,
      },
      wrapper: {},
      option: {
        background: "rgb(0,0,0) !important",
        color: "rgb(255,255,255) !important",
        padding: ".5rem",
      },
    })
  );

export default MuiSelect;
