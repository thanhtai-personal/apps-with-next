import { createAppTheme } from "@core-ui/react-mui-core";
import { Colors } from "./colors"
import { metrics } from "./metrics"
import { breakpoints } from "./breakpoints"
import { palette } from "./palette"
import { components } from "./components"

export const appTheme = createAppTheme({
  colors: Colors,
  metrics,
  breakpoints,
  defaultFont: "Kanit",
  palette,
  components,
});