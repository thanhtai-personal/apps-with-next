import { observer } from "@core-ui/react-mobx-state";
import { Flex, OutlinedButton, Colors } from "@core-ui/react-mui-core";
import caretLeft from "@/assets/icons/caret-left.svg"
import searchIcon from "@/assets/icons/search.svg"
import closeIcon from "@/assets/icons/close.svg"
import { Link } from "@core-ui/react-core";

export const Navigator = observer(({
  back,
  search,
  close,
  onBack,
  onClose,
  onSearch
}: {
  back?: string;
  search?: string;
  close?: string;
  onBack?: () => void;
  onClose?: () => void;
  onSearch?: () => void;
}) => {

  return (
    <Flex fullWidth mx={2} justifyContent={"space-between"} centerY>
      <Flex>
        {back && <Link to={back}>
          <OutlinedButton
            style={{
              border: "none",
              background: "#305AE8",
              color: Colors.white,
              borderRadius: "16px",
            }}
          >
            <img src={caretLeft} style={{ width: 16 }} />
          </OutlinedButton></Link>}
        {onBack &&
          <OutlinedButton
            style={{
              border: "none",
              background: "#305AE8",
              color: Colors.white,
              borderRadius: "16px",
            }}
            onClick={() => {
              onBack && onBack();
            }}
          >
            <img src={caretLeft} style={{ width: 16 }} />
          </OutlinedButton>}
      </Flex>
      {close && <Link to={close}>
        <OutlinedButton
          style={{
            border: "none",
            background: "#305AE8",
            color: Colors.white,
            borderRadius: "16px",
          }}
        >
          <img src={closeIcon} style={{ width: 16 }} />
        </OutlinedButton></Link>}
      <Flex>
        {onClose && <OutlinedButton
          style={{
            border: "none",
            background: "#305AE8",
            color: Colors.white,
            borderRadius: "16px",
          }}
          onClick={onClose}
        >
          <img src={closeIcon} style={{ width: 16 }} />
        </OutlinedButton>}
        {search && <Link to={search}>
          <OutlinedButton
            style={{
              border: "none",
              background: "#305AE8",
              color: Colors.white,
              borderRadius: "16px",
            }}
          >
            <img src={searchIcon} style={{ width: 16 }} />
          </OutlinedButton></Link>}
        {onSearch &&
          <OutlinedButton
            style={{
              border: "none",
              background: "#305AE8",
              color: Colors.white,
              borderRadius: "16px",
            }}
            onClick={onSearch}
          >
            <img src={searchIcon} style={{ width: 16 }} />
          </OutlinedButton>}
      </Flex>
    </Flex>
  )
})