import { MouseEventHandler, useEffect } from 'react';

export const useDragableElement = (id: string) => {

  const getElementMoving = () => document.querySelector(`#${id}.moving`);
  const getElement = () => document.querySelector(`#${id}`);

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    const container = getElementMoving() as HTMLElement;
    if (!container) return;
    container.style.left = `${clientX}px`;
    container.style.top = `${clientY}px`;
  };

  const onDrop = () => {
    const container = getElementMoving() as HTMLElement;
    if (!container) return;
    container.classList.remove('moving');
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', onDrop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', onDrop);
    };
  }, []);

  const onSelect: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const container = getElement() as HTMLElement;
    if (!container) return;
    container.classList.add('moving');
  };

  return { onSelect };
};
