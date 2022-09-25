import { Cache } from "./temp/workshop";

export interface IConfigAPI {
  get: (data: CONFIG_STORE_GET) => any;
  set: (data: CONFIG_STORE_SET) => void;
}

export interface IProfileAPI {
  get: (data: PROFILE_STORE_GET) => any;
  set: (data: PROFILE_STORE_SET) => void;
}

export interface IDialogAPI {
  selectFolder: () => string?;
}

export interface IAddonInfoAPI {
  writeAddonInfo: (gameDir: string, contents: string) => string?;
}

export interface ICacheAPI {
  requestCache: (forceNewBuild: boolean = false) => Cache;
}

export interface IExternalAPI {
  openLinkInBrowser: (url: string) => void;
}

// Properties
type IConfigProperty = "gameDir";
type IProfileProperty = "selectedPreset" | "presets" | `presets.${string}`;

export interface PROFILE_STORE_SET {
  property: IProfileProperty;
  value: any;
}

export interface PROFILE_STORE_GET {
  property: IProfileProperty;
  fallback?: any;
}

export interface CONFIG_STORE_SET {
  property: IConfigProperty;
  value: any;
}

export interface CONFIG_STORE_GET {
  property: IConfigProperty;
  fallback?: any;
}

// Global declaration
declare global {
  interface Window {
    configApi: IConfigAPI;
    profileApi: IProfileAPI;
    dialogApi: IDialogAPI;
    addonInfoApi: IAddonInfoAPI;
    cacheApi: ICacheAPI;
    externalApi: IExternalAPI;
  }
}
