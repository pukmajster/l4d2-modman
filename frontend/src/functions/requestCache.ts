import { ModCache } from "@/constants/interfaces";

export async function requestCache(
  forceNewBuild: boolean,
  onSuccess: (cache: ModCache) => void
) {
  try {
    let cache = await window.cacheApi.requestCache(forceNewBuild);

    onSuccess(cache);
    return cache;
  } catch (e) {
    console.log("failed to retrieve cache");
  }
}
