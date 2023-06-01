import { Chat } from "@/types/chat";
import { atom, selector } from "recoil";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
const defaultValue: Chat[] = [];

export const currentChatIDState = atom({
  key: "CurrentChatID",
  default: "",
});

export const chatsState = atom<Chat[]>({
  key: "Chats",
  default: defaultValue,
  effects_UNSTABLE: [persistAtom],
});

export const selectedChatState = selector<Chat | undefined>({
  key: "selectedChat",
  get: ({ get }) => {
    const chats = get(chatsState);
    const chatId = get(currentChatIDState);
    const selectedChat = chats.find((chat) => chat._id === chatId);
    return selectedChat;
  },
});

export function useChatsState() {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState<Chat[]>(chatsState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultValue : value, setValue] as const;
}
