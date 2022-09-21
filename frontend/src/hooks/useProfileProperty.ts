import { IProfileProperty } from "@/renderer";
import { useEffect } from "react";
import { RecoilState, useRecoilState } from "recoil";

export default function useProfileProperty(
  property: IProfileProperty,
  atom: RecoilState<string>
) {
  const state = useRecoilState(atom);
  const [rValue, setRValue] = state;

  useEffect(() => {
    window.profileApi.set({
      property,
      value: rValue,
    });
  }, [rValue]);

  return state;
}
