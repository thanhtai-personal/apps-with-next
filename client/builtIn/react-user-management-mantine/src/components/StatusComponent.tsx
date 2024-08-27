export interface IStatusComponentProps {
  className?: string;
  value?: string;
}

export const StatusComponent = ({
  className,
  value,
}: IStatusComponentProps) => {
  return (
    <div
      className={` rounded-md p-1 ${
        value?.toLowerCase() === "active"
          ? "bg=green-400"
          : value?.toLowerCase() === "invited"
            ? "bg-blue-400"
            : value?.toLowerCase() === "registered" ? "bg-orange-400" : ""
      } text-white  ${className} `}
    >
      {`${value?.charAt(0).toUpperCase()}${value?.substring(1, value.length)}`}
    </div>
  );
};
