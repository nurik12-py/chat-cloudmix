import { FC } from "react";

interface IProps {
  name: string;
  message: string;
  time: string;
}

export const ChatCard: FC<IProps> = ({ name, message, time }) => {
  return (
    <div className="px-6 py-5 border-b border-gray-300">
      <span className="font-medium">{name}</span>
      <div className="flex items-center justify-between">
        <span className="font-light text-gray-500">{message}</span>
        <span className="font-light text-gray-500">{time}</span>
      </div>
    </div>
  );
};
