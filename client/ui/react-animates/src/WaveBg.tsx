import "./wave.style.css"

export const WaveBg = () => {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      className="wave"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 
      58-18 88-18s
      58 18 88 18 
      58-18 88-18 
      58 18 88 18
      v44h-352z"
        />
      </defs>
      <g className="waves">
        <use
          xlinkHref="#gentle-wave"
          x="50"
          y="0"
          fill="#032525"
          fill-opacity=".2"
        />
        <use
          xlinkHref="#gentle-wave"
          x="50"
          y="3"
          fill="#032525"
          fill-opacity=".5"
        />
        <use
          xlinkHref="#gentle-wave"
          x="50"
          y="6"
          fill="#032525"
          fill-opacity=".9"
        />
      </g>
    </svg>

  )
}