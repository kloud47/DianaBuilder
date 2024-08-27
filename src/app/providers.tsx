import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import React from "react"

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            {children}
        </ClerkProvider>
    )
}

export default Providers;