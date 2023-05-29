import { CloudIcon, FireIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen min-w-screen flex flex-col items-center justify-center">
      <CloudIcon className="w-10 h-10 text-indigo-500" />
      <a
        className="text-lg font-medium"
        href="#"
        style={{ fontFamily: "Inter" }}
      >
        <span className="font-medium">Cloud</span>
        <span className="font-medium text-indigo-500">Mix</span>
      </a>
      <Link href="/chats">
        <button className="mt-4 px-3 py-2 flex gap-1 font-medium items-center justify-center border text-white bg-indigo-500 rounded-lg ">
          <FireIcon className="w-5 h-5" />
          <span>Start</span>
        </button>
      </Link>
    </main>
  );
}
