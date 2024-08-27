import { ReactNode, useEffect, useRef, useState } from 'react';

export const LoadMoreButtonWrapper = ({
  fetchData,
  onScrollIntoView,
  children,
}: {
  fetchData?: () => Promise<void>;
  onScrollIntoView?: () => void;
  children?: ReactNode;
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleFetchData = async () => {
    if (fetchData) {
      setIsFetching(true);
      await fetchData();
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          handleFetchData();
          onScrollIntoView && onScrollIntoView();
        }
      },
      { threshold: 1 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [isFetching]);

  return (
    <div ref={componentRef}>
      {children}
    </div>
  );
};
