import { atom } from "recoil";

type FilterDefaultNull = "null";

export const searchTermAtom = atom({
  key: "searchTermAtom",
  default: "",
});

export const filterInfectedAtom = atom({
  key: "filterInfectedAtom",
  default: "" as string,
});

export const filterSurvivorAtom = atom({
  key: "filterSurvivorAtom",
  default: "" as string,
});

export const filterGunAtom = atom({
  key: "filterGunAtom",
  default: "" as string,
});

export const filterMiscAtom = atom({
  key: "filterMiscAtom",
  default: "" as string,
});

export const filterGrenadeAtom = atom({
  key: "filterGrenadeAtom",
  default: "" as string,
});

export const filterMeleeAtom = atom({
  key: "filterMeleeAtom",
  default: "" as string,
});

export const filterUtilsAtom = atom({
  key: "filterUtilsAtom",
  default: "" as string,
});
