import Link from "next/link";
import { Chat } from "@/types/chat";
import { FC } from "react";
import { Button, Skeleton, Spin } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import MessageCounter from "../atoms/MessageCounter";
import ChatCard from "../atoms/ChatCard";

interface IChatsProps {
  hidden: boolean;
  chats?: Chat[];
  isLoading: boolean;
  isCreatingNewChat: boolean;
  onCreateNewChatClick: () => void;
}

const Chats: FC<IChatsProps> = ({
  hidden,
  chats,
  isLoading,
  isCreatingNewChat,
  onCreateNewChatClick,
}) => {
  return (
    <div
      className={`${
        hidden ? "hidden" : "block"
      } md:block border-r-0 md:border-r border-gray-300 w-full h-full max-h-full max-w-md`}
    >
      <div className="px-6 py-4 border-b h-20 flex items-center justify-center">
        <Button
          icon={
            <PlusIcon strokeWidth={2} className="w-6 h-6 text-indigo-500" />
          }
          loading={isCreatingNewChat}
          disabled={isCreatingNewChat}
          onClick={onCreateNewChatClick}
          className="w-full text-indigo-500 font-medium flex items-center justify-center"
          type="ghost"
        >
          Start new conversation
        </Button>
      </div>
      <MessageCounter count={chats?.length || 0} />
      <div
        className="flex flex-col overflow-y-scroll max-h-full"
        style={{ height: "calc(100% - 10rem)" }}
      >
        {chats?.map((chat, key) => {
          const lastMessage = chat.messages[chat.messages.length - 1];

          return (
            <Link key={key} href={`/chats/${chat._id}`}>
              <ChatCard name={chat.botName} message={lastMessage} />
            </Link>
          );
        })}

        {isLoading &&
          chats === undefined &&
          [0, 1, 2].map((key) => (
            <div key={key} className="px-6 py-4 border-b">
              <Skeleton
                paragraph={{ rows: 1 }}
                title={{ width: "50%" }}
                avatar={false}
                round
                active
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Chats;
