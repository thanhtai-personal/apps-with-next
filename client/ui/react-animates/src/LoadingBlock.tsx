import "./loadingBlock.style.css"

export interface ILoadingBlock {
  className?: string;
}

export const LoadingBlock = ({ className }: ILoadingBlock) => {
  return (
    <div className={`loading-block w-12 h-12  ${className}`}>
      <div className={`grid bg-transparent grid-cols-2 gap-1 w-full h-full`}>
        <div className="bg-red-400"></div>
        <div className="bg-green-400"></div>
        <div className="bg-orange-500"></div>
        <div className="bg-blue-400"></div>
      </div>
    </div>
  );
};
