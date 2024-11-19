import TypewriterEffect, { TypewriterClass } from 'typewriter-effect';

export interface ITypewriterProps {
  strings?: string[];
  content?: string;
  id?: string; // Unique id for the TypewriterEffect component.
  className?: string; // Additional CSS class for the TypewriterEffect component.
  delay?: number; // Delay in milliseconds between each string. Default is 250.
  options?: any; // TypewriterEffect options, see https://github.com/typewriterjs/typewriter-effect#options-object for details.
  onInit?: (typewriter: TypewriterClass) => void;
}

export const Typewriter = ({
  strings,
  options = {},
  content,
  delay = 250,
  onInit,
  className,
  id
}: ITypewriterProps) => {

  return (
    <div className={className} id={`type-writer-${id}`}>
      <TypewriterEffect
        options={{
          strings: strings,
          autoStart: true,
          loop: true,
          ...options
        }}
        onInit={onInit || ((typewriter) => {
          typewriter.typeString(content || "")
            .callFunction(() => {})
            .pauseFor(delay)
            // .deleteAll()
            // .callFunction(() => { })
            .start();
        })}
      />
    </div>
  )
}