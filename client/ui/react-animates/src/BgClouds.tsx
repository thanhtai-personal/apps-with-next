export const BgClouds = ({
  height = "100%",
  cloudsImageUrl = [
    "https://firebasestorage.googleapis.com/v0/b/goattap.appspot.com/o/clouds_2.png?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/goattap.appspot.com/o/clouds_1.png?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/goattap.appspot.com/o/clouds_3.png?alt=media"
  ]
}: {
  height?: number | string,
  cloudsImageUrl?: string[]
}) => {

  return (
    <div className="bgclouds-container" style={{ pointerEvents: "none" }}>
      <div className='clouds'>
        {cloudsImageUrl?.[0] &&<div className='clouds-1'
          style={{
            height,
            backgroundImage: `url(${cloudsImageUrl?.[0]})`,
          }}
        >
        </div>}
        {cloudsImageUrl?.[1] &&<div className='clouds-2'
          style={{
            height,
            backgroundImage: `url(${cloudsImageUrl?.[1]})`,
          }}>

        </div>}
        {cloudsImageUrl?.[2] &&<div className='clouds-3'
          style={{
            height,
            backgroundImage: `url(${cloudsImageUrl?.[2]})`,
          }}
        >
        </div>}
      </div>
    </div>
  )
}