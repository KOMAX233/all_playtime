const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("bridge", {
    getSteamPath: () => ipcRenderer.invoke("get-steam-path")
});
