import { User } from "@/types/user";
import { CloudIcon } from "@heroicons/react/24/solid";
import { Button } from "antd";
import Link from "next/link";
import { FC } from "react";

interface INavbarProps {
  user: User;
  onLogoutClick: () => void;
}

const Navbar: FC<INavbarProps> = ({ user, onLogoutClick }) => {
  return (
    <nav className="bg-light border-b border-gray-300 h-20 flex items-center justify-between py-3 px-4">
      <Link
        className="text-lg font-medium flex items-center gap-1"
        href="/chats"
      >
        <CloudIcon className="w-8 h-8 text-indigo-500" />
        <div>
          <span className="font-medium">Cloud</span>
          <span className="font-medium text-indigo-500">Mix</span>
        </div>
      </Link>
      <div className="flex flex-col items-end justify-end">
        <p className="font-medium text-base">
          {user.firstname} {user.lastname}
        </p>
        <Button
          type="text"
          onClick={onLogoutClick}
          className="text-gray-400 p-0 h-6"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
