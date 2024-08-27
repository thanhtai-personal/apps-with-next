
import Flex from "./Flex"
import Text from "./Text";
import ErrorIcon from '@mui/icons-material/Error';
import { Colors } from "../colors";

export const ErrorComponent = (props) => {

  return <Flex {...props} column>
    <ErrorIcon style={{ width: "24px", height: "24px" }} />
    <Text>Oops!!! Some thing went wrong!</Text>
    {process.env.NODE_ENV === "development" && props.error?.message && <Text fontSize={12} color={Colors.gray}>{props.error?.message}</Text>}
  </Flex>
}