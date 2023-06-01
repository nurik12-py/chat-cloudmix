import { Message } from "@/types/chat";
import { FC } from "react";

interface IChatMessageProps {
  message: Message;
}

const ChatMessage: FC<IChatMessageProps> = ({ message }) => {
  return (
    <span
      className={`rounded-2xl inline-block px-6 py-4 max-w-[85%] border  ${
        message.sender === "bot"
          ? "self-start bg-white border-gray-300"
          : "self-end bg-indigo-400 text-white border-indigo-400"
      }`}
      style={{ whiteSpace: "pre-line" }}
    >
      {message.text}
    </span>
  );
};

export default ChatMessage;
