export function HomePage() {
    const handleClick = async () => {
        const path = await window.bridge.getSteamPath();
        if (path) {
            console.log("Found Steam at: ", path);
        } else {
            console.log("Steam not Found");
        }
    }
    const handleDetect = async () => {
        const configs = await window.bridge.findLocalConfigs();
        if (configs.length == 0) {
            console.log("No localconfig.vdf is found.");
        } else if (configs.length == 1) {
            console.log("Using this one:", configs[0]);
        } else {
            console.log("Multiple Steam users found: ", configs)
        }
    }

    return (
        <div>
            <button className="button" onClick={handleDetect}>button</button>
        </div>
    )
}