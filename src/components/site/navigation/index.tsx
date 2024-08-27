import { ModeToggle } from "@/components/global/mode-toggle"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

type Props = {
    users?: null | User
}

export const Navigation = ({ users }: Props) => {
    return (
        <div className="p-4 flex items-center justify-between relative z-40">
            <aside className="flex items-center gap-2">
                <Image src={"./assets/plura-logo.svg"} width={40} height={40} alt="logo" />
                <span className="text-xl font-bold">Diana</span>
            </aside>
            <nav className="border-b dark:border-white border-black shadow-lg p-2 bg-[#091732]/70 rounded-xl px-5 hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
                <ul className="flex items-center justify-center gap-8">
                    <Link href={"#"}>Pricing</Link>
                    <Link href={"#"}>About</Link>
                    <Link href={"#"}>Documentation</Link>
                    <Link href={"#"}>Features</Link>
                </ul>
            </nav>
            <aside className="flex gap-2 items-center">
                <Link href={"/agency"}
                    className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary shadow-lg"
                >Login</Link>
                <UserButton />
                <ModeToggle />
            </aside>
        </div>
    )
}