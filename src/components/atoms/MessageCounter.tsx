import { FC } from "react";

interface IMessageCounterProps {
  count: number;
}

const MessageCounter: FC<IMessageCounterProps> = ({ count }) => (
  <div className="border-b h-20 flex items-center font-medium text-lg bg-gray-50 border-gray-300 px-6 py-5">
    Messages ({count})
  </div>
);

export default MessageCounter;
