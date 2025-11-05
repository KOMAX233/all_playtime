import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="app-shell">
            <Header />
            <div className="main-row">
                <Sidebar />
                <main className="app-main">
                    {children}
                </main>
            </div>
        </div>
    )
}