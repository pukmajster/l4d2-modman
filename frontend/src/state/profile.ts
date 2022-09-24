import { atom } from "recoil";

type ModId = string;

let selectedPreset = window.profileApi.get({
  property: "selectedPreset",
  fallback: "default",
});

export interface Preset {
  enabledMods: ModId[];
}

export interface Presets {
  [key: string]: Preset;
}

export const profileSelectedPresetIdAtom = atom({
  key: "profileSelectedPresetIdAtom",
  default: selectedPreset,
});

export const profileAllPresetsAtom = atom({
  key: "profileAllPresetsAtom",
  default: {} as Presets,
});

export const profileSelectedPresetAtom = atom({
  key: "profileSelectedPresetAtom",
  default: window.profileApi.get({
    property: `presets.${selectedPreset}`,
    fallback: "default",
  }) as Preset,
});
