const fs = require("fs/promises");
const vdf = require("vdf");

async function readLocalConfig(localConfigPath) {
    const text = await fs.readFile(localConfigPath, "utf-8");
    const data = vdf.parse(text);
    return data;
}

async function readAppFromLocalConfig(localConfigPath) {
    const data = await readLocalConfig(localConfigPath);
    const apps = data?.UserLocalConfigStore?.Software?.Valve?.Steam?.apps?? null;
    // console.dir(apps, { depth: null });
    return apps
}

module.exports = {
    readLocalConfig,
    readAppFromLocalConfig,
};