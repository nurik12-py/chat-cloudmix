import moment from "moment";
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
      <div className="flex items-center gap-2 justify-between">
        <span className="font-light flex-auto text-gray-500 truncate w-full">
          {message}
        </span>
        <span className="font-light text-gray-500">
          {moment(time).format("HH:MM")}
        </span>
      </div>
    </div>
  );
};
