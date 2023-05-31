import { TrashIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Button, Popconfirm } from "antd";
import Link from "next/link";
import { FC } from "react";

interface IChatNavbarProps {
  name: string;
  typing?: boolean;
  onDeleteClick?: () => void;
}

export const ChatNavbar: FC<IChatNavbarProps> = ({ name, onDeleteClick }) => {
  return (
    <nav className="border-b h-20 flex items-center justify-between gap-4 bg-white w-full border-gray-300 px-6 py-5">
      <div className="flex items-center gap-4">
        <Link href="/chats">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div>
          <p className="font-medium">{name}</p>
          <span className="text-gray-500">Online</span>
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
