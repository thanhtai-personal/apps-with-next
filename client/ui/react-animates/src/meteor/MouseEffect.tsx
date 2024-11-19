import { CSSProperties, useEffect } from "react";
import { MeteorRain } from "./MeteorRain";

export const MeteorMouseEffect = ({
  id, style = {}
}: {
  id: string;
  style?: CSSProperties;
  }) => {
  
  useEffect(() => {
    const canvas: any = document.getElementById(`meteor-mouse-${id}`);
    if (canvas) {
      new MeteorRain(canvas)
    }
  }, [id])

  return <canvas id={`meteor-mouse-${id}`} className="meteor-mouse-animation" style={{
    ...style
  }}>

  </canvas>
}