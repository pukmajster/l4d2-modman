import { ModCache } from "@/constants/interfaces";

export interface IPublishedFileDetails {
  publishedfileid: string;
  creator?: string;
  filename?: string;
  file_size?: string;
  title: string;
  description?: string;
  tags?: IPublishedFileDetailsTag[];
}

export interface IPublishedFileDetailsTag {
  tag: string;
}

export interface IOnlineAddoninfoResponse {
  response: {
    result: number;
    resultcount: number;
    publishedfiledetails: IPublishedFileDetails[];
  };
}

export async function requestCache(forceNewBuild: boolean) {
  try {
    let cache = await window.cacheApi.requestCache(forceNewBuild);
    return cache;
  } catch (e) {
    console.log("failed to retrieve cache");
  }
}

// TODO: Update the state on success. Currently you have to restart the app for changes to take affect
// TODO: Don't fetch data for id already stored in profile.onlineAddoninfo
export async function collectOnlineAddonInfo(cache: ModCache) {
  const listOfModsWithMissingAddoninfo = [];

  for (let item in cache) {
    let mod = cache[item];

    if (mod?.error) {
      listOfModsWithMissingAddoninfo.push(mod.id);
    }
  }

  const fd = new FormData();
  let i = 0;
  fd.set("itemcount", `${listOfModsWithMissingAddoninfo.length}`);
  for (let id of listOfModsWithMissingAddoninfo) {
    fd.set(`publishedfileids[${i}]`, id);
    i++;
  }

  console.log(listOfModsWithMissingAddoninfo);

  try {
    let res = await fetch(
      "https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1",
      {
        body: fd,
        method: "POST",
      }
    );

    let data: IOnlineAddoninfoResponse = await res.json();

    //console.log(data);

    for (let publishedFile of data.response.publishedfiledetails) {
      console.log(publishedFile);

      window.profileApi.set({
        property: `onlineAddoninfo.${publishedFile.publishedfileid}`,
        value: {
          title: publishedFile.title,
        },
      });
    }
  } catch (e) {
    console.log("failed to retrieve online mod info");
  }
}
