import { TrashIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "antd";
import Link from "next/link";
import { FC } from "react";

interface IChatNavbarProps {
  name: string;
  isTyping?: boolean;
  onDeleteClick?: () => void;
}

enum Status {
  IDLE = "Online",
  TYPING = "Typing...",
}

const ChatNavbar: FC<IChatNavbarProps> = ({
  name,
  isTyping,
  onDeleteClick,
}) => {
  return (
    <nav className="border-b h-20 flex items-center justify-between gap-4 bg-white w-full border-gray-300 px-6 py-5">
      <div className="flex items-center gap-4">
        <Link href="/chats">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div>
          <p className="font-medium">{name}</p>
          <div className="flex items-center gap-2">
            {isTyping && (
              <span className="animate-ping w-2 h-2 inline-flex rounded-full bg-indigo-400 opacity-75"></span>
            )}
            <span className="text-gray-500">
              {isTyping ? Status.TYPING : Status.IDLE}
            </span>
          </div>
        </div>
      </div>
      <div>
        <Button
          type="ghost"
          className="text-gray-500"
          onClick={onDeleteClick}
          icon={<TrashIcon className="text-current w-5 h-5" />}
        />
      </div>
    </nav>
  );
};

export default ChatNavbar;
