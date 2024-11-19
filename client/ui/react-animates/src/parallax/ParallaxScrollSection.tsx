import { ReactNode } from "react"
import "./parallaxScrollSection.style.css"

export interface IParallaxScrollSectionProps {
  items?: {
    id?: string;
    title?: string;
    titleElement?: ReactNode;
    bgContent?: string;
    bgContentElement?: ReactNode;
    contentElement?: ReactNode;
    content?: string;
    background?: string;
    styles?: {
      imageBg?: React.CSSProperties;
      section?: React.CSSProperties;
      description?: React.CSSProperties;
      content?: React.CSSProperties;
    }
  }[];
  styles?: {
    contentContainer?: React.CSSProperties;
    container?: React.CSSProperties;
  };
  showScrollbar?: boolean;
}

export const ParallaxScrollSection = ({
  items = [],
  styles = {},
  showScrollbar = false
}: IParallaxScrollSectionProps) => {


  return <div className={`parallax-wrapper ${!showScrollbar && "hide-scrollbar"}`} style={styles.container || {}}>
    {items.map((item, index) => (
      <>
        <div className="background"
          style={{
            backgroundImage: `url(${item.background})`,
            ...(item.styles?.imageBg || {})
          }}
        >
          {item.bgContentElement ? item.bgContentElement : item.bgContent ? <h2 className="title">{item.bgContent}</h2> : ""}
        </div>
        <section className="season-desc" key={item.id || `parallax-list-item-${index}`}
          style={item.styles?.section || {}}
        >
          <div className="desc-wrapper" style={item.styles?.description || {}}>
            {item.titleElement ? item.titleElement : item.title ? <h3 className="title">{item.title}</h3> : ""}
            <div className="season--about" style={item.styles?.content || {}}>
              {item.contentElement || item.content || ""}
            </div>
          </div>
        </section>
      </>
    ))}
  </div>
}