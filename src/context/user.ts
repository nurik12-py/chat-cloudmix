import { User } from "@/types/user";
import { atom } from "recoil";

export const UserState = atom({
  key: "User",
  default: {
    id: "",
    email: "",
    firstname: "",
    lastname: "",
  } as User,
});
