export interface IConfigAPI {
  get: (data: STORE_GET) => string;
  set: (data: STORE_SET) => void;
}

declare global {
  interface Window {
    configApi: IElectronAPI;
  }
}

export interface STORE_SET {
  property: string;
  value: string;
}

export interface STORE_GET {
  property: string;
  fallback?: string;
}
