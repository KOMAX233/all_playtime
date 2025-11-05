export {};

declare global {
    interface Window {
        bridge: {
            ping: () => string | Promise<string>;
        };
    }
}