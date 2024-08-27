import { ReactNode } from "react"
import "./rippleButton.style.css"

export const RippleButton = ({ children, className, onClick, id, style }: {
  children: ReactNode;
  className?: string;
  id: string;
  style?: any;
  onClick?: () => void;
}) => {

  const handleClick = (e: any) => {
    const btnElement = document.querySelector(`#${id}`);
    if (!btnElement) return;
    // Create span element
    let ripple = document.createElement("span");

    // Add ripple class to span
    ripple.classList.add("ripple");

    // Add span to the button
    btnElement.appendChild(ripple);

    // Get position of X
    let x = e.clientX - e.currentTarget.offsetLeft;

    // Get position of Y
    let y = e.clientY - e.currentTarget.offsetTop;

    // Position the span element
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    onClick && onClick();
    // Remove span after 0.3s
    setTimeout(() => {
      ripple.remove();
    }, 300);
  }

  return (
    <button style={style || {}} onClick={handleClick} id={id} className={`ripleBtn border-solid border-[#64c8ff] cursor-pointer ${className}`}>{
      children
    }</button>
  )
}