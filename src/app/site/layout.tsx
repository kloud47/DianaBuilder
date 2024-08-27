import { Navigation } from "@/components/site/navigation"
import React from "react"
import Providers from "../providers";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Providers>
            <main className="h-full">
                <Navigation />
                {children}
            </main>
        </Providers>
    )
} 

export default Layout;