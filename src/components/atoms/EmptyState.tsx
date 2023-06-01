import { FC } from "react";

interface IEmptyStateProps {
  message: string;
}

const EmptyState: FC<IEmptyStateProps> = ({ message = "Nothing to show" }) => {
  return (
    <div className="flex flex-1 items-center justify-center w-full h-full">
      <span className="text-gray-600 bg-gray-50 rounded-full px-3 py-1 border">
        {message}
      </span>
    </div>
  );
};

export default EmptyState;
