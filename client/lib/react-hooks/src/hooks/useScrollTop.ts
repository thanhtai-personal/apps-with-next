import { useEffect } from "react";

export default function useScrollTop(query, ...dependencies): any {
  useEffect(() => {
    if (query && document.querySelector(query))
      document.querySelector(query).scrollTo({ top: 0, behavior: "smooth"});
  }, [...dependencies])
}
