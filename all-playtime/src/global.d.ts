export {};

declare global {
    interface Window {
        bridge: {
            getSteamPath: () => Promise<string | null>;
        };
    }
}