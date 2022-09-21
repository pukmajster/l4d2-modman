export interface STORE_SET {
  property: string;
  value: any;
}

export interface STORE_GET {
  property: string;
  fallback?: any;
}

const Store = require("electron-store");
Store.initRenderer();

// ----------------------------------------------------
// Config store
// ----------------------------------------------------

const configStore = new Store({
  name: "config",
});

export function configStoreGet({ property, fallback }: STORE_GET) {
  let value = configStore.get(property);

  if (!value && fallback) {
    configStoreSet({ property, value: fallback });
    value = configStore.get(property);
  }

  return value;
}

export function configStoreSet(data: STORE_SET) {
  configStore.set(data.property, data.value);
}

// ----------------------------------------------------
// Config store
// ----------------------------------------------------

const profileStore = new Store({
  name: "profile",
});

export function profileStoreGet({ property, fallback }: STORE_GET) {
  let value = profileStore.get(property);

  if (value == null && fallback) {
    // profileStoreSet({ property, value: fallback });
    //value = profileStore.get(property);
    return fallback;
  }

  return value;
}

export function profileStoreSet(data: STORE_SET) {
  profileStore.set(data.property, data.value);
}
