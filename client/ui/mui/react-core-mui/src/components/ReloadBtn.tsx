import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from "@mui/material";
import { observer } from "@core-utils/react-mobx-state";
import useResponsive from "../hooks/useResponsive";
import { Colors } from '../colors';

interface ReloadBtnProps {
    onClick: any;
    forcedShow?: boolean;
}

export const ReloadBtn = (props: ReloadBtnProps) => {
    const tabletSizeDown = useResponsive();
    if (!tabletSizeDown && !props.forcedShow) {
        return null
    }

    return <IconButton onClick={props.onClick} style={{ borderRadius: 25, backgroundColor: Colors.white }}>
        <RefreshIcon style={{ fill: "#305AE8" }} />
    </IconButton>
};

export default observer(ReloadBtn);
