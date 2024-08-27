import { ReactApplicationManager } from "@core-ui/react-core";
// import { goatTapMuiInjecter } from "./goatTapMui";


const injectors: ((reactApp: ReactApplicationManager) => ReactApplicationManager)[] = [
  // goatTapMuiInjecter
];

export default injectors