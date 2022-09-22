export async function requestCache(forceNewBuild: boolean) {
  try {
    let cache = await window.cacheApi.requestCache(forceNewBuild);
    return cache;
  } catch (e) {
    console.log("failed to retrieve cache");
  }
}
