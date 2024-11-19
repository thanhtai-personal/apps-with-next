import { CSSProperties } from "react";
import "./WaterMeteor.style.css"

const WaterMeteor = ({
  id,
  style = {}
}: {
  id: string;
  style?: CSSProperties;
}) => {

  return (
    <div className="water-meteor" id={`water-meteor-${id}`} style={style}>
      <span className="particle small"></span>
      <span className="particle"></span>
      <span className="particle small"></span>
      <span className="particle"></span>
      <span className="particle small"></span>
      <span className="particle"></span>
      <span className="particle small"></span>
      <span className="particle"></span>
      <span className="particle small"></span>
      <span className="particle"></span>
      <span className="particle small"></span>
      <span className="particle"></span>
      <span className="particle small"></span>
      <span className="particle"></span>
      <span className="particle small"></span>
      <span className="particle"></span>
      <span className="particle small"></span>
      <span className="particle"></span>
      <span className="particle small"></span>
      <span className="particle"></span>
    </div>
  )
}

export default WaterMeteor