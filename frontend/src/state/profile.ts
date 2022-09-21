import { atom } from "recoil";

type ModId = string;
type Preset = ModId[];

export const profileSelectedPresetAtom = atom({
  key: "profileDataAtom",
  default: window.profileApi.get({
    property: "selectedPreset",
    fallback: "default",
  }),
});
