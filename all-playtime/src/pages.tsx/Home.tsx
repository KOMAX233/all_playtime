export function HomePage() {
    const handleClick = async () => {
        const path = await window.bridge.getSteamPath();
        if (path) {
            console.log("Found Steam at: ", path);
        } else {
            console.log("Steam not Found");
        }
    }
    return (
        <div>
            <button className="button" onClick={handleClick}>button</button>
        </div>
    )
}