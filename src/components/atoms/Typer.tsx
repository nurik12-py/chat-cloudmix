import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Button } from "antd";
import { FC, useState } from "react";

interface ITyperProps {
  onSend: (value: string) => void;
}

export const Typer: FC<ITyperProps> = ({ onSend }) => {
  const [value, setValue] = useState("");

  return (
    <div className="relative w-full">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full text-md text-gray-500 border-0 border-t py-6 px-6 pr-12 focus:outline-none "
        placeholder="Write a message ..."
      />
      <Button
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 ${
          value ? "text-indigo-500" : "text-gray-500"
        } `}
        disabled={!value}
        type="text"
      >
        <PaperAirplaneIcon
          className="h-6 w-6 text-current"
          onClick={() => {
            onSend(value);
            setValue("");
          }}
        />
      </Button>
    </div>
  );
};
