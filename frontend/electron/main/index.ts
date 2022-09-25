import { app, BrowserWindow, dialog, ipcMain, shell } from "electron";
import { release } from "os";
import { join } from "path";
import { writeAddonInfo } from "../addoninfo";
import { requestCache } from "../cache";
import {
  configStoreGet,
  configStoreSet,
  profileStoreGet,
  profileStoreSet,
  STORE_GET,
  STORE_SET,
} from "../stores";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// ---------------------------------------------------
// ModMan handles
// ---------------------------------------------------

ipcMain.handle("config:get", async (e, message: STORE_GET) => {
  return configStoreGet(message);
});

ipcMain.handle("config:set", async (e, message: STORE_SET) => {
  return configStoreSet(message);
});

ipcMain.handle("profile:get", async (e, message: STORE_GET) => {
  return profileStoreGet(message);
});

ipcMain.handle("profile:set", async (e, message: STORE_SET) => {
  return profileStoreSet(message);
});

ipcMain.handle(
  "addoninfo:write",
  async (e, gameDir: string, contents: string) => {
    return writeAddonInfo(gameDir, contents);
  }
);

ipcMain.handle("cache:request", async (e, forceNewBuild: boolean = false) => {
  return requestCache(forceNewBuild);
});

ipcMain.handle("external:openLinkInBrowser", async (e, url: string) => {
  return shell.openExternal(url);
});

shell.openExternal("https://google.com");

// ---------------------------------------------------
// Preload
// ---------------------------------------------------

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
process.env.DIST = join(__dirname, "../..");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST, "../public");

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "Main window",
    width: 1280,
    height: 720,
    icon: join(process.env.PUBLIC, "favicon.svg"),
    webPreferences: {
      preload,
      nodeIntegration: true, // keep     two    !
      contextIsolation: true, //    these   true
      webSecurity: app.isPackaged,
    },
  });

  /* win.webContents.on("will-navigate", function (e, url) {
    e.preventDefault();
    console.log("opening in external browser: " + url);

    if (process.platform === "linux")
      require("child_process").exec("xdg-open " + url);
    else shell.openExternal(url);
  }); */

  win.webContents.setWindowOpenHandler(({ url }) => {
    // config.fileProtocol is my custom file protocol
    console.log("opening in external browser: " + url);
    // if (url.startsWith(config.fileProtocol)) {
    //     return { action: 'allow' };
    // }
    // open url in a browser and prevent default
    shell.openExternal(url);
    return { action: "deny" };
  });

  // Handle for directory dialog
  ipcMain.handle("dialog:openDirectory", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      properties: ["openDirectory"],
    });
    if (canceled) {
      return;
    } else {
      return filePaths[0];
    }
  });

  if (app.isPackaged) {
    win.loadFile(indexHtml);
  } else {
    win.loadURL(url);
    // win.webContents.openDevTools()
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// new window example arg: new windows url
ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg });
  } else {
    childWindow.loadURL(`${url}/#${arg}`);
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
});
