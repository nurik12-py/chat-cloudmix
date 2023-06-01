import { CloudIcon } from "@heroicons/react/24/solid";
import { Button, Spin } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <CloudIcon className="w-10 h-10 text-indigo-500" />
      <div className="text-lg font-medium">
        <span className="font-medium">Cloud</span>
        <span className="font-medium text-indigo-500">Mix</span>
      </div>

      <p className="text-gray-600 font-light">Your personal AI wikipedia</p>

      <Link className="mt-3" href="/login">
        <Button size="large" type="ghost" className="bg-indigo-500 text-white">
          Explore
        </Button>
      </Link>
    </main>
  );
}
