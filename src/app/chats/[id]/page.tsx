"use client";

import { ChatNavbar } from "@/components/atoms/ChatNavbar";
import { Typer } from "@/components/atoms/Typer";
import Messages from "@/components/molecules/Messages";
import { useParams } from "next/navigation";

const Chat = () => {
  return (
    <div className="relative flex flex-col w-full h-full">
      <ChatNavbar />
      <Messages />
      <Typer />
    </div>
  );
};

export default Chat;
