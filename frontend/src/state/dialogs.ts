import { atom } from "recoil";

export const showModmanConfigDialogAtom = atom({
  key: "showModmanConfigDialogAtom",
  default: false,
});

export const showPresetsDialogAtom = atom({
  key: "showPresetsDialogAtom",
  default: false,
});
