import Messages from "@/components/molecules/Messages";
import ChatsPage from "..";
import { useRouter } from "next/router";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { messagesAPI } from "@/api/messagesAPI";
import { selectedChatState, useChatsState } from "@/context/chats";
import { Modal } from "antd";
import { chatsAPI } from "@/api/chatsAPI";
import showErrorMessage from "@/utils/showErrorMessage";
import ChatNavbar from "@/components/atoms/ChatNavbar";
import Typer from "@/components/atoms/Typer";
import { useRecoilValue } from "recoil";
import { use, useEffect, useRef } from "react";

const Chat = () => {
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const chat = useRecoilValue(selectedChatState);
  const [_chats, setChats] = useChatsState();
  const chatId = router.query.id as string;

  const { isLoading } = useQuery(
    ["chats", chatId, "messages"],
    () => messagesAPI.getAll(chatId, 25, 0).then((res) => res.data),
    {
      onSuccess: (data) => {
        const messages = data;
        setChats((prev) => {
          const prevChat = prev.find((chat) => chat._id === chatId);
          if (prevChat) {
            return prev.map((chat) =>
              chat._id === chatId ? { ...chat, messages } : chat
            );
          }
          return prev;
        });
      },
      getNextPageParam: (lastPage) => {
        const lastMessage = lastPage.length;
        return lastMessage;
      },
      refetchInterval: 2000,
    }
  );

  useEffect(() => {
    handlescrollToChatBottom();
  }, [chatId]);

  const handlescrollToChatBottom = () => {
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 500);
  };

  const sendMessageMutaion = useMutation(
    (text: string) => messagesAPI.sendMessage(chatId, { text }),
    {
      onSuccess: () => {},
      onError: (error) => {
        showErrorMessage(error, "Failed to send message");
        queryClient.invalidateQueries({
          queryKey: ["chats", chatId, "messages"],
        });
      },
    }
  );

  const deleteChatMutation = useMutation(() => chatsAPI.delete(chatId), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
      router.push("/chats");
    },
    onError: (error) => {
      showErrorMessage(error, "Failed to delete chat");
    },
  });

  const handleChatDelete = () => {
    Modal.confirm({
      title: "Do you want to delete this chat?",
      okType: "danger",
      onOk() {
        deleteChatMutation.mutate();
      },
    });
  };

  const handleSendMessage = (value: string) => {
    handlescrollToChatBottom();
    sendMessageMutaion.mutate(value);
  };

  return (
    <div className="relative flex flex-col w-full h-full">
      <ChatNavbar
        name={chat?.botName || "No name"}
        onDeleteClick={handleChatDelete}
        isTyping={sendMessageMutaion.isLoading}
      />
      <div className="bg-gray-100 flex-auto flex flex-col gap-6 w-full h-full px-4 py-10 overflow-y-auto">
        <Messages messages={chat?.messages || []} isLoading={isLoading} />
        <div ref={chatBottomRef}></div>
      </div>
      <Typer onSend={handleSendMessage} />
    </div>
  );
};

Chat.Layout = ChatsPage;

export default Chat;
