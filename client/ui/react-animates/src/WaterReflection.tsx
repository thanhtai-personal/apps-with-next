import { useEffect } from "react"
import "./waterReflection.style.css"

export const WaterReflection = ({
  bgImage, ratio = 25,
  bgStyle = {}
}: {
  bgImage: string;
  ratio: number;
  bgStyle?: React.CSSProperties;
}) => {

  useEffect(() => {
    const bg: any = document.querySelector("#bg");
    const base: any = document.querySelector("#base");
    const reflect: any = document.querySelector("#reflect");
    const disp: any = document.querySelector("#result");
    let flg: any, flg_now: any;
    const root = document.documentElement;
    if (!disp || !base || !bg) return;
    flg = flg_now;
    disp.innerHTML = `${ratio}`;
    let css_ratio = 100 - ratio;
    root.style.setProperty("--ratio", css_ratio + "%");
    flg_now = true;
    base.style.setProperty(
      "background-position",
      "top calc(50% + ( var(--ratio) - 50% ) * 2) center"
    );
    reflect.style.setProperty("background-position", "center");
    if (flg != flg_now) {
      bg.style.setProperty("transform", "scale3d(1, -1, 1)");
    }
  }, [ratio, bgImage])

  return (
    <>
      <div id="bg"></div>
      <div id="reflect"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "100% 100%",
          ...bgStyle,
        }}
      ></div>
      <div id="base"></div>
      <div className="main-reflect">
        <section className="section-reflect">
          <div>
          </div>
        </section>
      </div>
      <svg className="reflect-svg">
        <filter id="filter" filterUnits="objectBoundingBox" x="0" y="0">
          <feTurbulence id="feturbulence" type="fractalNoise" baseFrequency="0.01 0.1" numOctaves="10" seed="1">
          </feTurbulence>
          <feDisplacementMap xChannelSelector="B" yChannelSelector="G" scale="100" in="SourceGraphic" result="result">
            <animate attributeName="scale" dur="5s" values="100;-100;100" repeatCount="indefinite" />
          </feDisplacementMap>
        </filter>
      </svg>
    </>
  )
}