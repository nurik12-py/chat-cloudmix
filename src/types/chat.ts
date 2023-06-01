export type Message = {
  id: string;
  sender: string;
  date: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type Chat = {
  _id: string;
  botName: string;
  messages: Message[];
};
