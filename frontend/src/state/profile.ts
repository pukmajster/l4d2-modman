import { atom } from "recoil";

type ModId = string;
type Preset = ModId[];

interface Profile {
  name: string;
  defaultPreset: Preset;
  customPresets: {
    [key: string]: Preset;
  };
}

export const profileDataAtom = atom({
  key: "profileDataAtom",
  default: "",
});
