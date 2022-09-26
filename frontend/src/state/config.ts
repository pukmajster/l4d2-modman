import { atom, selector } from "recoil";

// The root game directory. We use this to look for mod packages, thumbnails and the addons list file.
export const gameDirAtom = atom({
  key: "gameDirAtom",
  default: window.configApi.get({
    property: "gameDir",
    fallback: "default game dir",
  }),
});

export const allowNetworkModFetchAtom = atom({
  key: "allowNetworkModFetchAtom",
  default: window.configApi.get({
    property: "allowNetworkModFetch",
    fallback: false,
  }),
});

// Game directories
export const workshopModsDirAtom = selector({
  key: "workshopModsDirAtom",
  get: ({ get }) => {
    const gameDir = get(gameDirAtom);
    if (!gameDir) return "";
    return gameDir + "/addons/workshop/";
  },
});

export const localModsDirAtom = selector({
  key: "workshopDirAtom",
  get: ({ get }) => {
    const gameDir = get(gameDirAtom);
    if (!gameDir) return "";
    return gameDir + "/addons/";
  },
});

export const addonsListDirAtom = selector({
  key: "workshopDirAtom",
  get: ({ get }) => {
    const gameDir = get(gameDirAtom);
    if (!gameDir) return "";
    return gameDir + "/addons.txt";
  },
});

export const cacheDir = selector({
  key: "workshopDirAtom",
  get: ({ get }) => {
    const gameDir = get(gameDirAtom);
    if (!gameDir) return "";
    return "";
  },
});
