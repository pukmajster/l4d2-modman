import { IConfigProperty } from "@/renderer";
import { useEffect } from "react";
import { RecoilState, useRecoilState } from "recoil";

export default function useConfigProperty(
  property: IConfigProperty,
  atom: RecoilState<string>
) {
  const state = useRecoilState(atom);
  const [rValue, setRValue] = state;

  useEffect(() => {
    window.configApi.set({
      property,
      value: rValue,
    });
  }, [rValue]);

  return state;
}