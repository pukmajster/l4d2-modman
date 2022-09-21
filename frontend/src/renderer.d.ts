export interface IConfigAPI {
  get: (data: CONFIG_STORE_GET) => string;
  set: (data: CONFIG_STORE_SET) => void;
}

export interface IProfileAPI {
  get: (data: PROFILE_STORE_GET) => string;
  set: (data: PROFILE_STORE_SET) => void;
}

// Properties
type IConfigProperty = "gameDir";
type IProfileProperty = "selectedPreset" | "presets";

export interface PROFILE_STORE_SET {
  property: IProfileProperty;
  value: string;
}

export interface PROFILE_STORE_GET {
  property: IProfileProperty;
  fallback?: string;
}

export interface CONFIG_STORE_SET {
  property: IConfigProperty;
  value: string;
}

export interface CONFIG_STORE_GET {
  property: IConfigProperty;
  fallback?: string;
}

// Global declaration
declare global {
  interface Window {
    configApi: IConfigAPI;
    profileApi: IProfileAPI;
  }
}
