import { Chat } from "@/types/chat";
import { atom } from "recoil";

export const ChatsState = atom({
  key: "Chats",
  default: [] as Chat[],
});
