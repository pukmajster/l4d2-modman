import { IProfileProperty } from "@/renderer";
import { useEffect } from "react";
import { RecoilState, useRecoilState } from "recoil";

export default function useProfileProperty(
  property: IProfileProperty,
  atom: RecoilState<any>
) {
  const state = useRecoilState(atom);

  useEffect(() => {
    window.profileApi.set({
      property,
      value: state[0],
    });
  }, [state[0]]);

  return state;
}
