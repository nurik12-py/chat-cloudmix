import { CloudIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-light border-b border-gray-300 h-20 flex items-center justify-between py-3 px-4">
      <a
        className="text-lg font-medium flex items-center gap-1"
        href="#"
        style={{ fontFamily: "Inter" }}
      >
        <CloudIcon className="w-8 h-8 text-indigo-500" />
        <div>
          <span className="font-medium">Cloud</span>
          <span className="font-medium text-indigo-500">Mix</span>
        </div>
      </a>
      <div className="flex flex-col items-end justify-end">
        <p className="font-medium">Nursultan Musiraliev</p>
        <Link href="/login" className="text-gray-400">
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
