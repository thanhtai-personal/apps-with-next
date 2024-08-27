import { useInterval } from "@core-utils/utils-helpers";
import { useStore } from "../store";

export const useClipboardContext = () => {
  const { uiStore } = useStore();

  useInterval(async () => {
    try {
      uiStore.clipboardText = await window.navigator.clipboard.readText();
    } catch (error) { }
  }, 1000);
}