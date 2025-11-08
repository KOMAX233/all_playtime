const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("bridge", {
    getSteamPath: () => {
        return ipcRenderer.invoke("get-steam-path")
    },
    findLocalConfigs: () => {
        return ipcRenderer.invoke("find-localconfigs")
    },
    readAppFromLocalConfig: (localConfigPath) => {
        return ipcRenderer.invoke("read-localconfig-apps", localConfigPath)
    },
    getAppDetails: (appId, cc = "us") => {
        return ipcRenderer.invoke("get-app-details", appId, cc);
    },
});
