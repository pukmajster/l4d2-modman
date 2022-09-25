import { contextBridge, ipcRenderer, shell } from "electron";
import { STORE_GET, STORE_SET } from "../stores";

contextBridge.exposeInMainWorld("configApi", {
  get: async (data: STORE_GET) => ipcRenderer.invoke("config:get", data),
  set: async (data: STORE_SET) => ipcRenderer.invoke("config:set", data),
});

contextBridge.exposeInMainWorld("profileApi", {
  get: async (data: STORE_GET) => ipcRenderer.invoke("profile:get", data),
  set: async (data: STORE_SET) => ipcRenderer.invoke("profile:set", data),
});

contextBridge.exposeInMainWorld("dialogApi", {
  selectFolder: () => ipcRenderer.invoke("dialog:openDirectory"),
});

contextBridge.exposeInMainWorld("addonInfoApi", {
  writeAddonInfo: (gameDir: string, addons: string) =>
    ipcRenderer.invoke("addoninfo:write", gameDir, addons),
});

contextBridge.exposeInMainWorld("cacheApi", {
  requestCache: (forceNewBuild: boolean = false) =>
    ipcRenderer.invoke("cache:request", forceNewBuild),
});

// contextBridge.exposeInMainWorld("externalApi", {
//   openLinkInBrowser: (url: string) =>
//     ipcRenderer.invoke("external:openLinkInBrowser", url),
// });

contextBridge.exposeInMainWorld("externalApi", {
  openLinkInBrowser: (url: string) => openLinkInBrowser(url),
});

function openLinkInBrowser(url: string) {
  console.log(" ------------ " + url + " ------------------");
  shell.openExternal(url);
}

function domReady(
  condition: DocumentReadyState[] = ["complete", "interactive"]
) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      return parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      return parent.removeChild(child);
    }
  },
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__square-spin`;
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");

  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};

setTimeout(removeLoading, 4999);

// ----------------------------------------------------------------------
