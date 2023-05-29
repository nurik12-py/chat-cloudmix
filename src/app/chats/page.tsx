"use client";

import { FC, ReactElement } from "react";

const Chats: FC<{ children: ReactElement }> = ({ children }) => {
  if (!children) {
    return (
      <div className="md:block hidden w-full h-full">
        <div className="flex items-center justify-center w-full h-full">
          <span className="text-gray-600 bg-gray-50  rounded-full px-3 py-1 border">
            Select chat
          </span>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export default Chats;