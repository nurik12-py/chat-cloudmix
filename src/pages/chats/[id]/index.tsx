import Messages from "@/components/molecules/Messages";
import ChatsPage from "..";
import { useRouter } from "next/router";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { messagesAPI } from "@/api/messagesAPI";
import { selectedChatState, useChatsState } from "@/context/chats";
import { Modal } from "antd";
import { chatsAPI } from "@/api/chatsAPI";
import showErrorMessage from "@/utils/showErrorMessage";
import ChatNavbar from "@/components/atoms/ChatNavbar";
import Typer from "@/components/atoms/Typer";
import { useRecoilValue } from "recoil";

const Chat = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const chat = useRecoilValue(selectedChatState);
  const [_chats, setChats] = useChatsState();
  const chatId = router.query.id as string;

  const { isLoading } = useInfiniteQuery(
    ["chats", chatId, "messages"],
    ({ pageParam }) =>
      messagesAPI.getAll(chatId, 25, pageParam).then((res) => res.data),
    {
      onSuccess: (data) => {
        const messages = data.pages.flatMap((page) => page);
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

  return (
    <div className="relative flex flex-col w-full h-full">
      <ChatNavbar
        name={chat?.botName || "No name"}
        onDeleteClick={handleChatDelete}
        isTyping={sendMessageMutaion.isLoading}
      />
      <Messages messages={chat?.messages || []} isLoading={isLoading} />
      <Typer onSend={(value) => sendMessageMutaion.mutate(value)} />
    </div>
  );
};

Chat.Layout = ChatsPage;

export default Chat;
