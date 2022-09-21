import { atom } from "recoil";

type ModId = string;

export interface Preset {
  enabledMods: ModId[];
}

export interface Presets {
  [key: string]: Preset;
}

export const profileSelectedPresetIdAtom = atom({
  key: "profileSelectedPresetIdAtom",
  default: window.profileApi.get({
    property: "selectedPreset",
    fallback: "default",
  }),
});

export const profilePresetsAtom = atom({
  key: "profilePresetsAtom",
  default: {} as Presets,
});

export const profileSelectedPresetAtom = atom({
  key: "profileSelectedPresetAtom",
  default: {} as Preset,
});
