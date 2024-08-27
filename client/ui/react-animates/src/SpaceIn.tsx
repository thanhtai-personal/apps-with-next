import { ReactNode, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "./spaceIn.style.css"

export const SpaceIn = ({
  className,
  id,
  children,
  classes,
  startOnMount = true
  , useDisappear = false
  , stiffness = 250
  , duration = 0.25
  , delay = 0
  , disappearDelay = 0
  , color = "#000"
  , fullSize = false
  , style = {}
}: {
  id: string;
  children?: ReactNode;
  className?: string;
  startOnMount?: boolean;
  useDisappear?: boolean;
  fullSize?: boolean;
  stiffness?: number;
  duration?: number;
  delay?: number;
  disappearDelay?: number;
  classes?: {
    space?: string;
  }
  color?: string;
  style?: any;
}) => {

  const wrapperRef = useRef<any>();
  const hasAnimated = useRef<any>(false);
  const controls = useAnimation();

  useEffect(() => {
    if (wrapperRef.current && startOnMount && !hasAnimated.current) {
      controls.start({
        opacity: 1,
        transition: { stiffness, duration, delay },
      }).then(() => {
        if (!useDisappear) return;
        controls.start({
          opacity: 0,
          // display: "none",
          transition: { stiffness, duration: 0.25, delay: disappearDelay },
        })
      });
      hasAnimated.current = true;
    }
  }, [wrapperRef.current, startOnMount])

  return <motion.div
    ref={wrapperRef}
    animate={controls}
    initial={{ opacity: 0 }}
    style={{
      width: "100%",
      height: "100%",
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      ...style
    }}
  >
    <div id={`spacein-${id}`} className={`${className}`}>
      <div className="relative ">
        <div className="absolute top-0 left-0 w-full h-[70%] bg-transparent z-[60] rounded-full">
          <div className="flex w-full h-full justify-center items-center pb-10 bg-transparent rounded-full">
            <div className="animate-slide_up">
              {children && children}
            </div>
          </div>
        </div>
        <div className="flex w-full h-full justify-center items-end">
          <div className={`space-rotate-x  bg-transparent flex items-center justify-center w-28 h-28 transition-[rotateZ(80deg)] duration-0 ${classes?.space}`}>
            <div style={{ borderColor: color }} className="duration-0 w-[90%] h-[90%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
              <div style={{ borderColor: color }} className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                <div style={{ borderColor: color }} className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                  <div style={{ borderColor: color }} className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                    {fullSize && <div style={{ borderColor: color }} className="duration-0 w-[90%] h-[90%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                      <div style={{ borderColor: color }} className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                        <div style={{ borderColor: color }} className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                          <div style={{ borderColor: color }} className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                            <div style={{ borderColor: color }} className="duration-0 w-[90%] h-[90%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                              <div style={{ borderColor: color }} className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                                <div style={{ borderColor: color }} className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                                  <div style={{ borderColor: color }} className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                                    <div style={{ borderColor: color }} className="duration-0 w-[90%] h-[90%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                                      <div style={{ borderColor: color }} className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                                        <div style={{ borderColor: color }} className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                                          <div style={{ borderColor: color }} className="duration-0 w-[95%] h-[95%] animate-spin bg-transparent flex items-center justify-center border-solid border-2 border-b-0 border-t-0  border-[#000] rounded-full shadow-inner">
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
}