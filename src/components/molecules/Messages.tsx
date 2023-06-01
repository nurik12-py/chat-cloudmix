import React, { FC, useRef } from "react";
import { Divider, Skeleton } from "antd";
import formatDate from "@/utils/formatDate";
import ChatMessage from "../atoms/ChatMessage";
import EmptyState from "../atoms/EmptyState";
import { Message } from "@/types/chat";

interface IProps {
  isLoading: boolean;
  messages: Message[];
}

const Messages: FC<IProps> = ({ messages, isLoading }) => {
  let previousDate: string | null = null;

  const renderMessages = () => {
    if (messages.length === 0 && !isLoading) {
      return <EmptyState message="No messages yet" />;
    }

    return messages.map((message, key) => {
      const formattedDate = formatDate(+message.date);
      const showDateLine = previousDate !== formattedDate;
      previousDate = formattedDate;

      return (
        <React.Fragment key={`message-${key}`}>
          {showDateLine && renderDateLine(formattedDate)}
          <ChatMessage message={message} />
        </React.Fragment>
      );
    });
  };

  const renderDateLine = (formattedDate: string) => (
    <Divider>
      <p className="text-gray-500">{formattedDate}</p>
    </Divider>
  );

  return (
    <>
      {renderMessages()}
      {isLoading && <Skeleton active paragraph={{ rows: 5 }} />}
    </>
  );
};

export default Messages;
