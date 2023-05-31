import { Chat } from "@/types/chat";
import http from "../services/http.service";

export const chatsAPI = {
  getAll: async () => {
    return http.get<Chat[]>("/chats/");
  },
  getOne: async (id: string) => {
    return http.get<Chat>(`/chats/${id}`);
  },
  createChat: async () => {
    return http.post("/chats/");
  },
  delete: async (id: string) => {
    return http.delete(`/chats/${id}`);
  },
};
