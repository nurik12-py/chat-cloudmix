import { FC, useEffect, useRef, useState } from "react";
import { ChatMessage } from "../atoms/ChatMessage";
import { Message } from "@/types/chat";
import { Divider, Skeleton } from "antd";
import moment from "moment";

interface IProps {
  isLoading: boolean;
  isTyping: boolean;
  messages: Message[];
  scrollToChatBottom?: () => void;
}

const Messages: FC<IProps> = ({
  messages,
  isLoading,
  isTyping,
  scrollToChatBottom,
}) => {
  const chatBottomRef = useRef<HTMLDivElement>(null);
  let previousDate: any = null;
  const handlescrollToChatBottom = () => {
    chatBottomRef.current?.scrollIntoView({
      // behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  const formatDate = (date: number) => {
    const today = moment().startOf("day");
    const givenDate = moment(date);

    if (today.isSame(givenDate, "day")) {
      // Display time for today's date
      return givenDate.format("h:mm A"); // Example format: "1:30 PM"
    } else {
      // Display formatted date for non-today's date
      return givenDate.format("DD.MM.YYYY"); // Example format: "31.05.2023"
    }
  };

  return (
    <div className="bg-gray-100 flex-auto flex flex-col gap-6 w-full h-full px-4 py-10 overflow-y-auto">
      {isLoading && <Skeleton active paragraph={{ rows: 5 }} />}
      {messages.length === 0 && !isLoading && (
        <div className="flex-1 flex items-center justify-center w-full h-full">
          <span className="text-gray-600 bg-gray-50  rounded-full px-3 py-1 border">
            No messages yet
          </span>
        </div>
      )}
      {messages.map((message, key) => {
        const formattedDate = formatDate(+message.date);
        const showDateLine = previousDate !== formattedDate;
        previousDate = formattedDate;
        return (
          <>
            {showDateLine && (
              <Divider>
                <p className="text-gray-500">{formattedDate}</p>
              </Divider>
            )}
            <ChatMessage key={key} message={message} />
          </>
        );
      })}
      {isTyping && (
        <span className="inline-block self-start px-4 py-3 bg-slate-50 border rounded-xl animate-pulse">
          Typing...
        </span>
      )}
      <div ref={chatBottomRef}></div>
    </div>
  );
};

export default Messages;
