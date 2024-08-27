import { ReactNode } from "react";
import "./bounding.style.css"

export const ASecondBounce = ({
  children, boxStyle = {}, wrapperStyle = {}
}: {
  children: ReactNode;
  wrapperStyle?: any;
  boxStyle?: any;
}) => {
  return (
    <div className="stage" style={wrapperStyle}>
      <div className="box bounce-5" style={boxStyle}>
        {children}
      </div>
    </div>
  )
}