export type Message = {
  id: string;
  sender: string;
  date: string;
  text: string;
  isRead: boolean;
};

export type Chat = {
  _id: string;
  botName: string;
  messages: Message[];
};
