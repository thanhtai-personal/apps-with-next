import "./plasmaBall.style.css"

export const PlasmaBall = ({ id, className }: {
  id: string;
  className?: string;
}) => {

  return (
    <div id={`plasma-ball-${id}`} className={`plasmaBall ${className}`}>
      <div className="click">
        <input type="checkbox" className="switcher" checked />
        <div className="glassball">
          <div className="electrode"></div>
          <div className="rays">
            <div className="ray">
              <span></span><span></span><span></span>
            </div>
            <div className="ray bigwave"><span></span><span></span></div>
            <div className="ray"><span></span><span></span><span></span></div>
            <div className="ray bigwave"><span></span><span></span></div>
            <div className="ray"><span></span><span></span><span></span></div>
          </div>
          <div className="rays">
            <div className="ray bigwave"><span></span><span></span></div>
            <div className="ray"><span></span><span></span><span></span></div>
            <div className="ray bigwave"><span></span><span></span></div>
            <div className="ray"><span></span><span></span><span></span></div>
            <div className="ray bigwave"><span></span><span></span></div>
          </div>
          <div className="rays">
            <div className="ray"><span></span><span></span><span></span></div>
            <div className="ray bigwave"><span></span><span></span></div>
            <div className="ray"><span></span><span></span><span></span></div>
            <div className="ray bigwave"><span></span><span></span></div>
            <div className="ray"><span></span><span></span><span></span></div>
          </div>
          <div className="rays">
            <div className="ray bigwave"><span></span><span></span></div>
            <div className="ray"><span></span><span></span><span></span></div>
            <div className="ray bigwave"><span></span><span></span></div>
            <div className="ray"><span></span><span></span><span></span></div>
            <div className="ray bigwave"><span></span><span></span></div>
          </div>
          <div className="rays">
            <div className="ray"><span></span><span></span><span></span></div>
            <div className="ray"><span></span><span></span><span></span></div>
            <div className="ray"><span></span><span></span><span></span></div>
          </div>
          <div className="rays">
            <div className="ray"><span></span><span></span><span></span></div>
            <div className="ray"><span></span><span></span><span></span></div>
            <div className="ray"><span></span><span></span><span></span></div>
          </div>

        </div>

      </div>
    </div>
  )
}