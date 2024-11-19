import { CSSProperties, ReactNode } from "react"
import "./animateBorders.style.css"

const AnimateBorderWrapper = ({
  children,
  styles = {},
  active
}: {
  children: ReactNode;
  active?: boolean;
  styles?: {
    container?: CSSProperties;
    card?: CSSProperties;
  }
}) => {
  return <main className="container" style={styles.container || {}}>
    <div className={`card ${active && "animated"}`} style={styles.container || {}}>
      {children}
    </div>
  </main>
}

export default AnimateBorderWrapper;