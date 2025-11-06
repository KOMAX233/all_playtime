export {};

declare global {
    interface Window {
        bridge: {
            getSteamPath: () => Promise<string | null>;
            findLocalConfigs: () => Promise<{userId: string; path: string}[]>;
        };
    }
}