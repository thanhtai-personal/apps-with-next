export const useDeviceDetection = () => {
  return {
    isIOS: window.navigator.userAgent?.includes("iPhone"),
    isAndroid: window.navigator.userAgent?.includes("Android"),
    isWindow: window.navigator.userAgent?.includes("Windows"),
    isChrome: window.navigator.userAgent?.includes("Chrome"),
  }
}