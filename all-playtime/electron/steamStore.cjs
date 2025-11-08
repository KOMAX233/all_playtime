const https = require("https")

function fetchJSON(url) {
    return new Promise((resolve, rejects) => {
        https.get(url, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            })
            res.on("end", () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (e) {
                    rejects(e)
                }
            })
        }).on("error", (e) => {
            rejects(e);
        })
    })
}

async function getAppDetails(appId, {cc = "us", lang = "en"} = {}) {
    const url = `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=${cc}&l=${lang}`;
    const json = await fetchJSON(url);
    if (!json) {
        return null;
    }
    const entries = json[appId];
    if (!entries || !entries.success) {
        return null;
    }
    return entries.data;
}

module.exports = {
    getAppDetails,
}