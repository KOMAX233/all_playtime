import { useState } from "react";

// type LocalConfig = {
//     userId: string;
//     path: string;
// }

export function HomePage() {
    const [configs, setConfigs] = useState<{userId: string, path: string}[]>([]);
    const handleClick = async () => {
        const path = await window.bridge.getSteamPath();
        if (path) {
            console.log("Found Steam at: ", path);
        } else {
            console.log("Steam not Found");
        }
    }
    const handleDetect = async () => {
        const configs_found = await window.bridge.findLocalConfigs();
        setConfigs(configs_found);
        if (configs_found.length == 0) {
            console.log("No localconfig.vdf is found.");
        } else if (configs_found.length == 1) {
            console.log("Using this one:", configs_found[0]);
        } else {
            console.log("Multiple Steam users found: ", configs_found)
        }
    }

    return (
        <div>
            <button className="button" onClick={handleDetect}>button</button>
            {configs.length > 0 && (
                <div>
                    <label>
                        Choose Steam user: {" "}
                        <select>
                            {configs.map((config) => (
                                <option key={config.userId} value={config.userId}>{config.userId}</option>
                            ))}
                        </select>
                        <button>Use</button>
                    </label>
                </div>
            )}
            {configs.length == 0 && (
                <p>No users are found.</p>
                )
            }
        </div>
    )
}