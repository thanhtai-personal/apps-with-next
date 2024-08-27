import { TimelineMax, Linear, Power1 } from "gsap";
import { useEffect } from 'react';
import "./glowingJump.style.css"

export const GlowingJump = ({ id }: { id: string }) => {
  useEffect(() => {
    if (!id) return;
    /**
     * Set the filter property for an element, accounting for both
     * 'webkitFilter' and 'filter'
     *
     * example: setFilter('url("/svg/filters/gooey-effects.svg#goo")', menuContainerElem);
     */
    let setFilter = function setFilter(path: string, elem: HTMLElement) {
      elem.style.filter = path;
      elem.style.webkitFilter = path;
    };
    // let loaderContainer = document.querySelector(`#${id}.anim-container`),
    let loaderSVG = document.querySelector(`#${id} .loader`) as HTMLElement,
      circleL = document.querySelector(`#${id} .circleL`) as HTMLElement,
      circleR = document.querySelector(`#${id} .circleR`) as HTMLElement,
      jumpArc = document.querySelector(`#${id} .jump`) as HTMLElement,
      BASE_DURATION_MULTIPLIER = 1.0;
    if (!jumpArc) return;
    let jumpArcReflection = jumpArc.cloneNode() as HTMLElement;

    jumpArcReflection.setAttribute('class', 'reflection'); // setAttribute needs to be used for classing SVG in JS
    loaderSVG.appendChild(jumpArcReflection);

    setFilter('url("#strokeGlow")', jumpArc);
    setFilter('url("#strokeGlow")', jumpArcReflection);

    let masterTL = new TimelineMax({
      repeat: -1,
    });

    function jump() {
      let jumpTL = new TimelineMax();

      jumpTL
        .set([jumpArc, jumpArcReflection], {
          drawSVG: '0% 0%',
        })
        .set([circleL, circleR], {
          attr: {
            rx: 0,
            ry: 0,
          },
        })
        .to([jumpArc, jumpArcReflection], BASE_DURATION_MULTIPLIER * 0.4, {
          drawSVG: '0% 30%',
          ease: Linear.easeNone,
        })

        // scale up the ripple ovals (with x scaling a bit more since, you know, it's a horizontal oval :-) )
        .to(
          circleL,
          BASE_DURATION_MULTIPLIER * 2,
          {
            attr: {
              rx: '+=30',
              ry: '+=10',
            },
            opacity: 0, // ripple, then fade out
            ease: Power1.easeOut,
          },
          '-=0.1'
        )

        .to(
          [jumpArc, jumpArcReflection],
          BASE_DURATION_MULTIPLIER * 1.0,
          {
            drawSVG: '50% 80%',
            ease: Linear.easeNone,
          },
          '-=1.9'
        )

        .to(
          [jumpArc, jumpArcReflection],
          BASE_DURATION_MULTIPLIER * 0.7,
          {
            drawSVG: '100% 100%',
            ease: Linear.easeNone,
          },
          '-=0.9'
        )

        // finish by animating the right circle ripple
        .to(
          circleR,
          BASE_DURATION_MULTIPLIER * 2,
          {
            attr: {
              rx: '+=30',
              ry: '+=10',
            },
            opacity: 0, // ripple, then fade out
            ease: Power1.easeOut,
          },
          '-=0.5'
        );

      jumpTL.timeScale(3);

      return jumpTL;
    }

    masterTL.add(jump());
  }, [id]);

  return (
    <div
      id={id}
      className='anim-container absolute bg-transparent z-50'
    >
      <div className='loader-container absolute top-[50%] left-[50%] ml-[-125px] mt[-100px]'>
        <svg className='w-0 h-0 absolute'>
          <defs>
            <filter id='strokeGlow' y='-10' x='-10' width='250' height='150'>
              <feOffset
                in='StrokePaint'
                dx='0'
                dy='0'
                result='centeredOffset'
              ></feOffset>

              <feGaussianBlur
                in='centeredOffset'
                stdDeviation='2'
                result='blur1'
              ></feGaussianBlur>
              <feGaussianBlur
                in='centeredOffset'
                stdDeviation='5'
                result='blur2'
              ></feGaussianBlur>
              <feGaussianBlur
                in='centeredOffset'
                stdDeviation='15'
                result='blur3'
              ></feGaussianBlur>

              <feMerge>
                <feMergeNode in='blur1'></feMergeNode>
                <feMergeNode in='blur2'></feMergeNode>
                <feMergeNode in='blur3'></feMergeNode>

                <feMergeNode in='SourceGraphic'></feMergeNode>
              </feMerge>
            </filter>
          </defs>
        </svg>
        <svg
          className='loader'
          xmlns='http://www.w3.org/2000/svg'
          width='250px'
          height='200px'
          viewBox='0 0 250 200'
        >
          <svg style={{ overflow: 'visible' }}>
            <path
              className='jump'
              fill='none'
              stroke='#33FFFF'
              strokeWidth='10'
              stroke-linecap='round'
              strokeMiterlimit='10'
              d='M55.5 98.5c0-35.3 31.3-64 70-64s70 28.7 70 64'
            ></path>
          </svg>

          <g
            fill='none'
            strokeWidth='1'
            stroke='#33FFFF'
            strokeLinecap='round'
            strokeMiterlimit='10'
          >
            <ellipse
              className='circleL'
              cx='55.2'
              cy='102.5'
              rx='21.7'
              ry='5.5'
            ></ellipse>
            <ellipse
              className='circleR'
              cx='195.2'
              cy='103.5'
              rx='21.7'
              ry='5.5'
            ></ellipse>
          </g>
        </svg>
      </div>
    </div>
  );
};
