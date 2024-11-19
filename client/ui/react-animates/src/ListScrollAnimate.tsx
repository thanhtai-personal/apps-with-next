// This animation was not work properly

import { ReactNode, useEffect, useRef, useState } from "react";
import $ from "jquery";
import "./listScrollAnimate.style.css";
import { useScriptTag } from "@core-utils/react-hooks";

export const ListScrollAnimate = ({ items, id }: { items: ReactNode[], id: string }) => {
  const scrollListRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [retry, setRetry] = useState(0);

  useScriptTag("https://cdnjs.cloudflare.com/ajax/libs/smooth-scrollbar/8.3.1/smooth-scrollbar.js")
  useScriptTag("https://cdnjs.cloudflare.com/ajax/libs/smooth-scrollbar/8.3.1/plugins/overscroll.js")

  useEffect(() => {
    const Scrollbar = (window as any).Scrollbar
    const plugin = (window as any).OverscrollPlugin;
    if ((!Scrollbar || !plugin) && retry < 5) {
      setRetry((prev) => prev + 1);
      return;
    }

    Scrollbar?.use?.(plugin);
    const element = document.querySelector(".js-scroll-list");
    if (!element) return;
    var customScroll = Scrollbar.init(element as HTMLElement, {
      plugins: {
        overscroll: true
      }
    });

    var listItem = $(".js-scroll-list-item");

    listItem.eq(0).addClass("item-focus");
    listItem.eq(1).addClass("item-next");

    customScroll.addListener(function (status) {
      var $content = $(".js-scroll-content");

      var viewportScrollDistance = 0;

      viewportScrollDistance = status.offset.y;
      var viewportHeight = $content.height();
      var listHeight = 0;
      var clistItems = $content.find(".js-scroll-list-item");
      for (var i = 0; i < clistItems.length; i++) {
        const h = $(clistItems?.[i] as any)?.height?.()
        if (clistItems?.[i] && h) {
          listHeight += h;
        }
      }

      var top = status.offset.y;
      // console.log(top);
      var visibleCenterVertical = 0;
      visibleCenterVertical = top;

      var parentTop = 1;
      var clis = $(".js-scroll-list-item");
      var $focusLi;
      for (var i = 0; i < clis.length; i++) {
        if (clis?.[i]) {
          var cli = $(clis[i] as any);
          var liTop = cli.position().top;
          var liRelTop = liTop - parentTop;

          var distance = 0;
          var distance = Math.abs(top - liRelTop);
          const dt = $(".js-scroll-content")?.height?.() || 2;
          var maxDistance = dt / 2;
          var distancePercent = distance / (maxDistance / 100);

          if (cli?.parent?.()?.scrollTop?.() && (Number(cli?.parent?.()?.scrollTop?.()) > top - liRelTop)) {
            if (!cli.hasClass("item-focus")) {
              cli.prev().addClass("item-hide");
              clis.removeClass("item-focus");
              clis.removeClass("item-next");
            }
            cli.removeClass("item-hide");
            cli.addClass("item-focus");
            cli.next().addClass("item-next");
            break;
          }
        }
      }
    });
  }, [id, retry]); // Include id in dependency array to ensure effect runs again if id changes

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
