import { chatsAPI } from "@/api/chatsAPI";
import EmptyState from "@/components/atoms/EmptyState";

import Chats from "@/components/molecules/Chats";
import Navbar from "@/components/molecules/Navbar";
import { currentChatIDState, useChatsState } from "@/context/chats";

import { useUserState } from "@/context/user";
import showErrorMessage from "@/utils/showErrorMessage";
import { useRouter } from "next/router";
import { FC, ReactElement, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";

const ChatsPage: FC<{ children: ReactElement }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [chats, setChats] = useChatsState();
  const [_currentChatID, setCurrentChatIDState] =
    useRecoilState(currentChatIDState);
  const [user, setUser] = useUserState();
  const router = useRouter();
  const chatId = router.query.id;

  useEffect(() => {
    setCurrentChatIDState(chatId as string);
  }, [chatId]);

  const { isLoading } = useQuery(
    ["chats"],
    () => chatsAPI.getAll().then((res) => res.data),
    {
      onSuccess: (data) => {
        setChats((prevChats) => {
          if (prevChats.length !== data.length) {
            return data;
          }
          return prevChats;
        });
      },
    }
  );

  const createChatMutation = useMutation(chatsAPI.createChat, {
    onSuccess: () => {
      queryClient.invalidateQueries("chats");
    },
    onError: (error) => {
      showErrorMessage(error, "Failed to create a new chat");
    },
  });

  const handleNewChat = () => {
    createChatMutation.mutate();
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setChats([]);
    setUser({
      id: "",
      email: "",
      firstname: "",
      lastname: "",
    });
    router.push("/login");
  };

  return (
    <div className="relative flex flex-col w-full h-full">
      <Navbar user={user} onLogoutClick={handleLogout} />
      <main
        style={{ maxHeight: "calc(100% - 5rem)" }}
        className="w-full flex-grow flex relative max-w-full max-h-full"
      >
        <Chats
          onCreateNewChatClick={handleNewChat}
          hidden={!!chatId}
          chats={chats}
          isLoading={isLoading}
          isCreatingNewChat={createChatMutation.isLoading}
        />
        {children || (
          <div className="md:block hidden w-full h-full">
            <EmptyState message="Select a chat to start messaging" />
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatsPage;
