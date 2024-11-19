"use client";
import { useEffect } from "react";

export interface IErrorProps {
  error: Error;
  reset: () => void;
}

const Error: React.FC<IErrorProps> = ({
  error,
  reset,
}: IErrorProps) => {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

export default Error