import { Message } from "@/types/chat";
import http from "../services/http.service";

export const messagesAPI = {
  getAll: async (chatId: string, limit: number, offset: number) => {
    return http.get<Message[]>(`/chats/${chatId}/messages/`, {
      params: {
        limit,
        offset,
      },
    });
  },
  sendMessage: async (chatId: string, data: { text: string }) => {
    return http.post(`/chats/${chatId}/messages/`, data);
  },
};
