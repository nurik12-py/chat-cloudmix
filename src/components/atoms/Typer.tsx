import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Button } from "antd";
import { FC, useState } from "react";

interface ITyperProps {
  isLoading?: boolean;
  onSend: (value: string) => void;
}

const Typer: FC<ITyperProps> = ({ onSend, isLoading }) => {
  const [value, setValue] = useState("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    onSend(value);
    setValue("");
  };

  return (
    <div className="relative w-full">
      <input
        value={value}
        onKeyDown={handleKeyPress}
        onChange={(e) => setValue(e.target.value)}
        className="w-full text-md text-gray-500 border-0 border-t py-6 px-6 pr-12 focus:outline-none "
        placeholder="Write a message ..."
      />
      <Button
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 ${
          value ? "text-indigo-500" : "text-gray-500"
        } `}
        disabled={!value || isLoading}
        type="text"
      >
        <PaperAirplaneIcon
          className="h-6 w-6 text-current"
          onClick={handleSend}
        />
      </Button>
    </div>
  );
};

export default Typer;
