

import { configure } from "mobx"

export const disabledStrictMode = () => {
  configure({
    enforceActions: "never",
  });
}