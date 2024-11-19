import { createRef, ReactNode } from "react"
import { Parallax, ParallaxProvider, useParallax } from 'react-scroll-parallax';

export interface IParallaxScrollItem {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  animateConfig?: any;
  content?: ReactNode;
}

export interface IParallaxScrollListProps {
  items?: IParallaxScrollItem[];
  styles?: {
    container?: React.CSSProperties;
  };
  showScrollbar?: boolean;
}

export const ParallaxScrollList = ({
  items = [],
  styles = {
    container: {
      width: "100%",
      height: "auto"
    }
  },
  showScrollbar = false
}: IParallaxScrollListProps) => {
  const containerRef = createRef<HTMLDivElement>();

  return <div style={styles.container || {}}
    ref={containerRef}
  >
    <ParallaxProvider scrollContainer={showScrollbar ? containerRef.current || document.body : undefined}>
      {items.map((item, index) => (
        <ParallaxListItem item={item} key={`parallax-item-${index}`} />
      ))}
    </ParallaxProvider>
  </div>
}

const ParallaxListItem = ({ item }: { item: IParallaxScrollItem }) => {
  const parallax = useParallax<HTMLDivElement>(item.animateConfig || {
    translateY: [-100, 100, 'easeInQuint'],
  });

  return <div style={item.style || {}} className={`${item.className}`} ref={parallax.ref} >
    {item.content}
  </div>
  // return <Parallax style={item.style || {}} className={`${item.className}`} itemRef={itemRef} />
}