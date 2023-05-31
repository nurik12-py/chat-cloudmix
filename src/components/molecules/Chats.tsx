import Link from "next/link";
import { MessageCounter } from "../atoms/MessageCounter";
import { ChatCard } from "../atoms/ChatCard";
import { Chat } from "@/types/chat";
import { FC, useRef } from "react";
import { Button, Skeleton } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { chatsAPI } from "@/api/chatsAPI";
import { useMutation, useQueryClient } from "react-query";

interface IProps {
  hidden: boolean;
  chats: Chat[];
  isLoading: boolean;
}

export const Chats: FC<IProps> = ({ hidden, chats, isLoading }) => {
  const queryClient = useQueryClient();
  const newChatMutation = useMutation(
    () => {
      return chatsAPI.createChat();
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: "chats" });
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleNewChat = () => {
    newChatMutation.mutate();
  };

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
          loading={newChatMutation.isLoading}
          disabled={newChatMutation.isLoading}
          onClick={handleNewChat}
          className="w-full text-indigo-500 font-medium flex items-center justify-center"
          type="ghost"
        >
          Start new conversation
        </Button>
      </div>
      <MessageCounter count={chats.length} />
      <div
        className="flex flex-col overflow-y-scroll max-h-full"
        style={{ height: "calc(100% - 10rem)" }}
      >
        {isLoading &&
          [0, 1, 2].map(() => (
            <div className="px-6 py-4 border-b">
              <Skeleton
                paragraph={{ rows: 1 }}
                title={{ width: "50%" }}
                avatar={false}
                round
                active
              />
            </div>
          ))}

        {chats.map((chat, key) => (
          <Link key={key} href={`/chats/${chat._id}`}>
            <ChatCard
              name={chat.botName}
              message={"New message"}
              time={"12.12.12"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
