import { IConfigProperty } from "@/renderer";
import { useEffect } from "react";
import { RecoilState, useRecoilState } from "recoil";

export default function useConfigProperty<T>(
  property: IConfigProperty,
  atom: RecoilState<T>
) {
  const state = useRecoilState<T>(atom);
  const [rValue, setRValue] = state;

  useEffect(() => {
    window.configApi.set({
      property,
      value: rValue,
    });
  }, [rValue]);

  return state;
}
