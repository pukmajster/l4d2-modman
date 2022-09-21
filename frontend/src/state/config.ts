import { atom } from "recoil";

export const gameDirAtom = atom({
  key: "gameDirAtom",
  default: window.configApi.get({
    property: "gameDir",
    fallback: "default game dir",
  }),
});
