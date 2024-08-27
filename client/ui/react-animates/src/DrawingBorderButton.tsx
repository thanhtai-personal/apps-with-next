import { ReactNode } from "react"
import "./drawingBorderButton.style.css"

export const DrawingBorderButton = ({ children, className, onClick, style = {} }: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: any;
}) => {

  return (
    <button onClick={onClick} className={`drawingBtn draw-border ${className}`} style={{ ...style }}>{
      children
    }</button>
  )
}