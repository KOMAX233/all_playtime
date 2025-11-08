export {};

type AppsObject = Record<string, any>; 

declare global {
    interface Window {
        bridge: {
            getSteamPath: () => Promise<string | null>;
            findLocalConfigs: () => Promise<{userId: string; path: string}[]>;
            readAppFromLocalConfig: (localConfigPath: string) => Promise<AppsObject>;
            getAppDetails: (appId: string, cc?: string) => Promise<any | null>;
        };
    }
}