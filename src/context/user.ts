import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const defaultValue: User = {
  id: "",
  email: "",
  firstname: "",
  lastname: "",
};

const { persistAtom } = recoilPersist();

export const UserState = atom({
  key: "User",
  default: defaultValue,
  effects_UNSTABLE: [persistAtom],
});

export function useUserState() {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState<User>(UserState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultValue : value, setValue] as const;
}
