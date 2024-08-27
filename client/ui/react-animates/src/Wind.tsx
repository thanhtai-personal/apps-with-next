import "./wind.style.css"

export const Wind = ({
  id, width, height, style = {}, windColor = "#fff"
}: {
  id: string;
  width: string | number;
  height: string | number;
  style: any;
  windColor?: string;
}) => {

  return (
    <div className="wind-frame"
      id={id}
      style={{
        ...style,
        width: width,
        height: height,
      }}
    >
      <div className="circle"></div>
      <div className="center">
        <svg stroke={windColor} width={width} height={height} viewBox="0 0 400 400" version="1.1" className="line">
          <path className="st0" d="M-34.8,166.8c51.6,1.9,70.9,16.4,78.4,30.3c10.9,20.1-3.6,37.5,6.9,75c3.9,14,11.8,42.2,33.7,50.9
	c25.7,10.2,65.3-8.7,76.4-36.5c13.8-34.4-26.4-57.5-19.3-110.1c3.3-24.1,17.1-58.7,44.7-67.4c34.9-10.9,84.3,21.7,90.8,65.4
	c5.3,36-20.6,66.1-42.6,79.8c-39.5,24.5-95.7,14.9-108-7.6c-0.5-0.9-7.9-14.7-2.1-22.7c3.7-5,10.9-5.4,13.1-5.5
	c15.4-0.8,28.1,12.1,33,17.2c46.5,48.5,53.9,63.9,72.2,75.7c24.1,15.6,66.1,24.2,90.8,6.9c36.4-25.5,7.6-88,49.5-130.7
	c17.6-17.9,40-24.6,56.4-27.5"/>
        </svg>
      </div>
    </div>
  )
}