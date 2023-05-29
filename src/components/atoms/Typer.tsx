import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export const Typer = () => {
  return (
    <div className="relative w-full">
      <input
        className="w-full text-md text-gray-500 border-0 border-t py-6 px-6 pr-12 focus:outline-none "
        placeholder="Write a message ..."
      />
      <PaperAirplaneIcon className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-6 w-6 text-gray-500" />
    </div>
  );
};
