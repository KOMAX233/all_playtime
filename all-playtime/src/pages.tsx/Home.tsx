import React, { useState } from "react";

// type LocalConfig = {
//     userId: string;
//     path: string;
// }

type AppsObject = Record<string, any>; 

export function HomePage() {
    const [configs, setConfigs] = useState<{userId: string, path: string}[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [apps, setApps] = useState<AppsObject | null>(null);
    const handleClick = async () => {
        const path = await window.bridge.getSteamPath();
        if (path) {
            console.log("Found Steam at: ", path);
        } else {
            console.log("Steam not Found");
        }
    }
    const handleFindConfigs = async () => {
        const configs_found = await window.bridge.findLocalConfigs();
        setConfigs(configs_found);
        // auto select first one? 
        // TODO: decide sort users by what order
        if (configs_found.length > 0) {
            setSelectedUserId(configs_found[0].userId)
        }

        if (configs_found.length == 0) {
            console.log("No localconfig.vdf is found.");
        } else if (configs_found.length == 1) {
            console.log("Using this one:", configs_found[0]);
        } else {
            console.log("Multiple Steam users found: ", configs_found)
        }
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUserId(e.target.value);
    }

    const handleUserSelect = async () => {
        const chosen_config = configs.find((c) => {
            return c.userId == selectedUserId;
        })
        if (!chosen_config) {
            console.log("No config selected.");
            return;
        }
        // console.log("Chosen config:", chosen_config)
        const apps = await window.bridge.readAppFromLocalConfig(chosen_config.path);
        // console.log("apps for", chosen_config?.userId, apps);
        setApps(apps);
    }

    function computerTotalPlayedMinutes(apps: AppsObject | null): number {
        if (!apps) {
            return 0;
        }
        return Object.entries(apps)
        .filter(([, appData]) => Object.prototype.hasOwnProperty.call(appData, "Playtime"))
        .reduce((sum, [, appData]) => {
            const played_minutes_str = appData.Playtime;
            const played_minutes = Number(played_minutes_str) || 0;
            return sum + played_minutes;
        }, 0)
    }

    const total_played_minutes = computerTotalPlayedMinutes(apps);
    const total_played_hours = Math.round(total_played_minutes / 60 * 100) / 100;

    return (
        <div>
            <button className="button" onClick={handleFindConfigs}>Find Steam Users On This Computer</button>
            {configs.length > 0 && (
                <div>
                    <label>
                        Choose Steam user: {" "}
                        <select value={selectedUserId} onChange={handleChange}>
                            {configs.map((config) => (
                                <option key={config.userId} value={config.userId}>{config.userId}</option>
                            ))}
                        </select>
                    </label>
                    <button onClick={handleUserSelect} disabled={!selectedUserId}>Use this account</button>
                    {selectedUserId && (
                        <p>Selected userid: {selectedUserId}</p>
                    )}
                </div>
            )}
            {configs.length == 0 && (
                <p>No users are found.</p>
                )
            }
            {apps && (
                <div>
                    <p>Played {total_played_hours} hr games on Steam</p>
                    <table>
                        <thead>
                            <tr>
                                <th>AppID</th>
                                <th>Playtime</th>
                                <th>App Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(apps)
                            .filter(([, appData]) => Object.prototype.hasOwnProperty.call(appData, "Playtime"))
                            .map(([appId, appData]) => {
                                const played_minutes_str = appData.Playtime?? "0";
                                const played_minutes = Number(played_minutes_str) || 0;
                                const played_hour = Math.round(played_minutes / 60 * 100) / 100;
                                const capsule_image_url = `https://shared.akamai.steamstatic.com//store_item_assets//steam//apps//${appId}//capsule_184x69.jpg`;
                                return (<tr key={appId}>
                                    <td>{appId}</td>
                                    <td>
                                        {played_hour} hr
                                    </td>
                                    <td><img src={capsule_image_url} alt={`Header for app ${appId}`} /></td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}