export type Chat = {
  id: string;
  botName: string;
  messages: {
    id: string;
    date: string;
    text: string;
    isRead: boolean;
  }[];
};
