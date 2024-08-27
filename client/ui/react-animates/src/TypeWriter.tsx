import "./typeWriter.style.css"

export const TypeWriter = ({ content, id, className }: { content: string, id: string, className?: string }) => {

  return (<div id={`type-writer-${id}`} className={`typeWriter ${className}`}>
    <div className="content">{content}</div>
  </div>)
}