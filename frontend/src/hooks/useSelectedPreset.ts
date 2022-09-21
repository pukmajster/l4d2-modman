import {
  Preset,
  profileSelectedPresetAtom,
  profileSelectedPresetIdAtom,
} from "@/state/profile";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useProfileProperty from "./useProfileProperty";

type UseSelectedPresetReturn = [Preset, (newPreset: Preset) => void];

export default function useSelectedPreset() {
  const [selectedPresetId] = useProfileProperty(
    "selectedPreset",
    profileSelectedPresetIdAtom
  );

  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const [getPresetState, setPresetState] = useRecoilState<Preset>(
    profileSelectedPresetAtom
  );

  async function loadPreset() {
    let newPreset = (await window.profileApi.get({
      property: `presets.${selectedPresetId}`,
      fallback: {},
    })) as Preset;

    setPresetState(newPreset);

    console.log("Loaded preset", newPreset);

    setInitialLoadDone(true);
  }

  useEffect(() => {
    loadPreset();
  }, [selectedPresetId]);

  useEffect(() => {
    if (initialLoadDone) {
      window.profileApi.set({
        property: `presets.${selectedPresetId}`,
        value: getPresetState,
      });

      console.log("writing preset");
    }
  }, [getPresetState]);

  return [getPresetState, setPresetState] as UseSelectedPresetReturn;
}
