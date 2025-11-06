const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("bridge", {
    getSteamPath: () => {
        return ipcRenderer.invoke("get-steam-path")
    },
    findLocalConfigs: () => {
        return ipcRenderer.invoke("find-localconfigs")
    } 
});
