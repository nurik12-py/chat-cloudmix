import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const ChatNavbar = () => {
  return (
    <nav className="border-b h-20 flex items-center gap-4 bg-white w-full border-gray-300 px-6 py-5">
      <Link href="/chats">
        <ChevronLeftIcon className="w-6 h-6" />
      </Link>
      <div>
        <p className="font-medium">Aslan</p>
        <span className="text-gray-500">Online</span>
      </div>
    </nav>
  );
};
