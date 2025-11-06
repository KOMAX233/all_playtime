const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec } = require("child_process");
const os = require("os");
const fs = require("fs");
const { stdout } = require("process");

function getSteamPathRegistry() {
  return new Promise((resolve) => {
    exec(
      'reg query "HKEY_CURRENT_USER\\Software\\Valve\\Steam" /v SteamPath',
      (err, stdout) => {
        if (err) {
          console.log("reg query error:", err);
          console.log("stdout:", stdout);
          return resolve(null);
        }
        console.log("raw stdout:", stdout);
        const match_registry_output = stdout.match(/SteamPath\s+REG_SZ\s+(.+)*\s*$/m);
        console.log("match:", match_registry_output);
        if (!match_registry_output) {
          return resolve(null);
        }
        resolve(match_registry_output[1].trim());
      }
    )
  })
}

async function getSteamInstallDir() {
  // TODO: only windows supported for now
  if (process.platform !== "win32") {
    return null;
  }
  return await getSteamPathRegistry();
}

let win;
function create() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const devUrl = process.env.ELECTRON_START_URL;
  if (devUrl) {
    win.loadURL(devUrl);
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(create);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    create();
  }
});

// get steam path for windows from registry
ipcMain.handle("get-steam-path", async () => {
  const dir = await getSteamInstallDir();
  return dir;
})