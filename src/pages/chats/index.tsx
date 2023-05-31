import { chatsAPI } from "@/api/chatsAPI";
import { SelectChat } from "@/components/atoms/SelectChat";
import { Chats } from "@/components/molecules/Chats";
import Navbar from "@/components/molecules/Navbar";
import { ChatsState } from "@/context/chats";
import { UserState } from "@/context/user";
import { useRouter } from "next/router";
import { FC, ReactElement } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";

const ChatsPage: FC<{ children: ReactElement }> = ({ children }) => {
  const [chats, setChats] = useRecoilState(ChatsState);
  const user = useRecoilValue(UserState);
  const router = useRouter();
  const chatId = router.query.id;

  const { isLoading } = useQuery(
    ["chats"],
    () => chatsAPI.getAll().then((res) => res.data),
    {
      onSuccess: (data) => {
        setChats(data);
        console.log(data);
      },
    }
  );

  return (
    <div className="relative flex flex-col w-full h-full">
      <Navbar user={user} />
      <main
        style={{ maxHeight: "calc(100% - 5rem)" }}
        className="w-full flex-grow flex relative max-w-full max-h-full"
      >
        <Chats hidden={!!chatId} chats={chats || []} isLoading={isLoading} />
        {children || <SelectChat />}
      </main>
    </div>
  );
};

export default ChatsPage;
