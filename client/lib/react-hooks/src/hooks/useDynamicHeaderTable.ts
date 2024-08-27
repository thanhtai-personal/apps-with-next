import { useEffect } from "react";

const useDynamicHeader = ({
  tabletSizeDown,
  scrollHeightElementId,
  tableHeaderId,
}) => {

  const handleScrollHeightTable = (_e) => {
    const scrollHeightElem = document.getElementById(scrollHeightElementId);
    const tableHeader = document.getElementById(tableHeaderId);
    if (scrollHeightElem && tableHeader) {
      tableHeader.style.transform = `translateY(${scrollHeightElem.scrollTop}px)`;
    }
  }

  useEffect(() => {
    if (tabletSizeDown) {
      const scrollHeight = document.getElementById(scrollHeightElementId);
      if (scrollHeight) {
        scrollHeight.addEventListener("scroll", handleScrollHeightTable);
        return () => {
          scrollHeight.removeEventListener("scroll", handleScrollHeightTable);
        }
      }
    }
  }, [tabletSizeDown])
}

export default useDynamicHeader