import { Message } from "@/types/chat";
import moment from "moment";
import { FC } from "react";

interface IChatCardProps {
  name: string;
  message?: Message;
}

const ChatCard: FC<IChatCardProps> = ({ name, message }) => {
  return (
    <div className="px-6 py-4 h-24 flex flex-col items-start justify-center border-b border-gray-300">
      <span className="font-medium">{name}</span>
      <div className="w-full flex items-center gap-2 justify-between">
        <span className="font-light flex-auto text-gray-500 truncate w-full">
          {message?.text || "No messages yet"}
        </span>
        <span className="font-light text-gray-500">
          {message && moment(message.createdAt).format("HH:mm")}
        </span>
      </div>
    </div>
  );
};

export default ChatCard;
