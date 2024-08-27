import React from "react"

export function Import({
  touch,
  desktop
}: {
  touch: React.LazyExoticComponent<React.MemoExoticComponent<() => React.ReactNode>>;
  desktop: React.LazyExoticComponent<React.MemoExoticComponent<() => React.ReactNode>>;
}) {
  return window.matchMedia('(pointer: coarse) and (hover: none)').matches ? touch : desktop;
}
