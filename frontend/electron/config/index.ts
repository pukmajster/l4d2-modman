export interface STORE_SET {
  property: string;
  value: string;
}

export interface STORE_GET {
  property: string;
  fallback?: string;
}

const Store = require("electron-store");
Store.initRenderer();

const store = new Store({
  name: "config",
});

export function get({ property, fallback }: STORE_GET) {
  let value = store.get(property);

  if (!value && fallback) {
    set({ property, value: fallback });
    value = store.get(property);
  }

  return value;
}

export function set(data: STORE_SET) {
  store.set(data.property, data.value);
}

set({
  property: "runtime",
  value: new Date().toDateString(),
});
