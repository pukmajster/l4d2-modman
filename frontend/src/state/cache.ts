import { ModCache } from "@/constants/interfaces";
import { atom } from "recoil";

export const cacheAtom = atom({
  key: "cacheAtom",
  default: {} as ModCache,
});
