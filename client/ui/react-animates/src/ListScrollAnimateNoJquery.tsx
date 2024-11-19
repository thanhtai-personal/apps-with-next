// This animation was not work properly

import { ReactNode, useEffect, useRef } from "react";
import "./listScrollAnimate.style.css";

export const ListScrollAnimate = ({ items, id }: { items: ReactNode[], id: string }) => {
  const scrollListRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const Scrollbar = (window as any).Scrollbar;
    Scrollbar.use((window as any).OverscrollPlugin);

    const customScroll = Scrollbar.init(scrollListRef.current!, {
      plugins: {
        overscroll: true,
      },
    });

    const listItems = contentRef.current!.children;

    // Set initial focus and next item
    if (listItems.length > 0) {
      (listItems[0] as HTMLElement).classList.add("item-focus");
      if (listItems[1]) {
        (listItems[1] as HTMLElement).classList.add("item-next");
      }
    }

    customScroll.addListener((status) => {
      const viewportHeight = contentRef.current!.clientHeight;
      const top = status.offset.y;
      const parentTop = 1;

      for (let i = 0; i < listItems.length; i++) {
        const li = listItems[i] as HTMLElement;
        const liTop = li.getBoundingClientRect().top - contentRef.current!.getBoundingClientRect().top;
        const liRelTop = liTop - parentTop;

        if (liRelTop > top) {
          if (!li.classList.contains("item-focus")) {
            if (i > 0) {
              const prevLi = listItems[i - 1] as HTMLElement;
              prevLi.classList.add("item-hide");
            }
            for (let j = 0; j < listItems.length; j++) {
              const item = listItems[j] as HTMLElement;
              item.classList.remove("item-focus", "item-next");
            }
          }

          li.classList.remove("item-hide");
          li.classList.add("item-focus");

          if (i < listItems.length - 1) {
            const nextLi = listItems[i + 1] as HTMLElement;
            nextLi.classList.add("item-next");
          }
          break;
        }
      }
    });
  }, [id]); // Include id in dependency array to ensure effect runs again if id changes

  return (
    <div className="wrapper" id={`animate-scroll-list-${id}`}>
      <div className="scroll-list" ref={scrollListRef}>
        <div className={`scroll-list__wrp js-scroll-content`} ref={contentRef}>
          {items.map((item, index) => (
            <div className={`scroll-list__item js-scroll-list-item`} key={`list-item-${index}`}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
