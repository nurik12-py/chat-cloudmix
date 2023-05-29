"use client";

import { ChatCard } from "@/components/atoms/ChatCard";
import { MessageCounter } from "@/components/atoms/MessageCounter";
import Navbar from "@/components/molecules/navbar/component";
import { ChatsState } from "@/context/chats";
import Link from "next/link";
import { useParams } from "next/navigation";

import { FC, ReactElement } from "react";
import { useRecoilState } from "recoil";

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  const { id: chatId } = useParams();

  const [chats, setChats] = useRecoilState(ChatsState);

  return (
    <div className="relative flex flex-col w-full h-full">
      <Navbar />

      <main
        style={{ maxHeight: "calc(100% - 5rem)" }}
        className="w-full flex-grow flex relative max-w-full max-h-full"
      >
        <div
          className={`${
            chatId ? "hidden" : "block"
          } md:block border-r-0 md:border-r border-gray-300 w-full h-full max-h-full max-w-md`}
        >
          <MessageCounter count={chats.length} />
          <div
            className="flex flex-col overflow-y-scroll max-h-full"
            style={{ height: "calc(100% - 5rem)" }}
          >
            {chats.map((chat, key) => (
              <Link key={key} href="/chats/d">
                <ChatCard
                  name="Aslan"
                  message="Hi, how are you doing?"
                  time="14:32"
                />
              </Link>
            ))}
          </div>
        </div>

        {children}
      </main>
    </div>
  );
};

export default Layout;
