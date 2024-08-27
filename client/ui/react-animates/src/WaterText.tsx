import "./waterText.style.css"

export const WaterText = ({ content, className, textClass }
  : { content: string, className?: string, textClass?: string }) => {

  return (<section className={`waterText flex items-center justify-center ${className}`}>
    <div className="content text-center flex items-center justify-center">
      <span className={`font-eczar text-center whitespace-nowrap text-nowrap text-[2rem] ${textClass}`}>{content}</span>
      <span className={`font-eczar text-center whitespace-nowrap text-nowrap text-[2rem] ${textClass}`}>{content}</span>
    </div>
  </section>)
}