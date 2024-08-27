
declare global {
  interface Window {
    useStore: <StoreDataType>() => StoreDataType;
  }
}

export { }