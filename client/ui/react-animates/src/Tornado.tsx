import "./tornado.style.css"

export const Tornado = ({
  id
}: {
  id: string
}) => {

  return (
    <div id={`tornado-circle-container-${id}`} className="tornado-circle-container">
      <div className="circle"></div>
      <div className="circle-two"></div>
      <div className="circle-three"></div>
      <div className="circle-four"></div>
      <div className="circle-five"></div>
      <div className="circle-six"></div>
      <div className="circle-seven"></div>
      <div className="circle-eight"></div>
      <div className="circle-nine"></div>
      <div className="circle-ten"></div>
      <div className="circle-eleven"></div>
    </div>
  )
}