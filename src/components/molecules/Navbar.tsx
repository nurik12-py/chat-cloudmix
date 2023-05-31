import { ChatsState } from "@/context/chats";
import { UserState } from "@/context/user";
import { User } from "@/types/user";
import { CloudIcon } from "@heroicons/react/24/solid";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useResetRecoilState } from "recoil";

interface INavbarProps {
  user: User;
}

const Navbar: FC<INavbarProps> = ({ user }) => {
  const router = useRouter();
  const resetUserState = useResetRecoilState(UserState);
  const resetChatsState = useResetRecoilState(ChatsState);

  const handleLogout = () => {
    resetUserState();
    resetChatsState();
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

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
        <p className="font-medium">
          {user.firstname} {user.lastname}
        </p>
        <Button
          type="text"
          onClick={handleLogout}
          className="text-gray-400 p-0"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
