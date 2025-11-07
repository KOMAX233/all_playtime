import React, { useState } from "react";

// type LocalConfig = {
//     userId: string;
//     path: string;
// }

export function HomePage() {
    const [configs, setConfigs] = useState<{userId: string, path: string}[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string>("");
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

    const handleUserSelect = () => {
        const chosen_config = configs.find((c) => {
            return c.userId == selectedUserId;
        })
        console.log("Chosen config:", chosen_config)
    }

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
                </div>
            )}
            {configs.length == 0 && (
                <p>No users are found.</p>
                )
            }
        </div>
    )
}