import { CloudIcon, FireIcon } from "@heroicons/react/24/solid";
import { Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      router.push("/chats");
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <main className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <CloudIcon className="w-10 h-10 text-indigo-500" />
      <a
        className="text-lg font-medium"
        href="#"
        style={{ fontFamily: "Inter" }}
      >
        <span className="font-medium">Cloud</span>
        <span className="font-medium text-indigo-500">Mix</span>
      </a>
      <Spin className="mt-2" />
    </main>
  );
}
