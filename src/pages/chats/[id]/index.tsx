import Messages from "@/components/molecules/Messages";
import ChatsPage from "..";
import { useRouter } from "next/router";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { messagesAPI } from "@/api/messagesAPI";
import { useRecoilValue } from "recoil";
import { ChatsState } from "@/context/chats";
import { Modal } from "antd";
import { chatsAPI } from "@/api/chatsAPI";
import showErrorMessage from "@/utils/showErrorMessage";
import ChatNavbar from "@/components/atoms/ChatNavbar";
import Typer from "@/components/atoms/Typer";

const Chat = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const chats = useRecoilValue(ChatsState);
  const chatId = router.query.id as string;
  const chat = chats.find((chat) => chat._id === chatId);

  const { data: messages, isLoading } = useInfiniteQuery(
    ["chats", chatId, "messages"],
    ({ pageParam }) =>
      messagesAPI.getAll(chatId, 25, pageParam).then((res) => res.data),
    {
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
      onSuccess: (data) => {
        console.log(data);
      },
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
      />
      <Messages messages={messages?.pages.flat() || []} isLoading={isLoading} />
      <Typer onSend={(value) => sendMessageMutaion.mutate(value)} />
    </div>
  );
};

Chat.Layout = ChatsPage;

export default Chat;
