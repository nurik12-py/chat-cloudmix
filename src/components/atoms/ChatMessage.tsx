import { Message } from "@/types/chat";
import { FC } from "react";
import { motion } from "framer-motion";

interface IChatMessageProps {
  message: Message;
}

const ChatMessage: FC<IChatMessageProps> = ({ message }) => {
  return (
    <motion.span
      className={`rounded-2xl inline-block px-6 py-4 max-w-[85%] border  ${
        message.sender === "bot"
          ? "self-start bg-white border-gray-300"
          : "self-end bg-indigo-400 text-white border-indigo-400"
      }`}
      style={{ whiteSpace: "pre-line" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {message.text}
    </motion.span>
  );
};

export default ChatMessage;
