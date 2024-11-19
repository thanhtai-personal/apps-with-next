import { useEffect, useState } from "react";
import "./smoke.style.css"

export interface ISmokeProps {
  id: string;
  wind?: number;
  blur?: number;
  style?: React.CSSProperties;
}

export const Smoke = ({
  id,
  wind = 0,
  blur = 2,
  style = {}
}: ISmokeProps) => {

  return (
    <div className='smoke' id={`smoke-${id}`}
      style={{
        "--wind": `${wind}`,
        "--blur": `${blur}`,
        pointerEvents: "none",
        ...style
      } as React.CSSProperties}
    >
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
      <div className='smoke-particle'></div>
    </div>
  )
}