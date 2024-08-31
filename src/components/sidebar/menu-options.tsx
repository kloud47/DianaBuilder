"use client"
import { AgencySidebarOption, SubAccount, SubAccountSidebarOption } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronsUpDown, Compass, Ghost, Menu, PlusCircleIcon } from "lucide-react";
import clsx from "clsx";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { CommandEmpty, CommandList } from "cmdk";
import Link from "next/link";
import { useModal } from "@/app/providers/modal-provider";

type Props = {
    defaultOpen?: boolean
    subAccounts: SubAccount[]
    sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[]
    sidebarLogo: string
    details: any
    user: any
    id: string
}

const MenuOptions = ({ defaultOpen, subAccounts, sidebarLogo, sidebarOpt, details, user, id }: Props) => {
    const { setOpen } = useModal();
    
    const openState = useMemo(
        () => defaultOpen ? { open: true } : {},
        [defaultOpen]
    )

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return
    return (
        <Sheet
            modal={false}
            {...openState}
        >
            <SheetTrigger
                asChild
                className="absolute left-4 top-4 z-[100] md:!hidden flex"
            >
                <Button
                    variant={'outline'}
                    size={'icon'}
                >
                    <Menu size={30} color="white" />
                </Button>
            </SheetTrigger>
            <SheetContent 
                showX={!defaultOpen}
                side={'left'}
                className={clsx(
                    `bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6`,
                    {
                        'hidden md:inline-block z-0 w-[300px]': defaultOpen,
                        'inline-block md:hidden z-[100] w-full': !defaultOpen
                    }
                )}
            >
                <div>
                    <AspectRatio ratio={16/5}>
                        <Image 
                            src={sidebarLogo}
                            alt="Sidebar Logo"
                            fill className="rounded-md object-contain"
                        />
                    </AspectRatio>
                    <Popover>
                        <PopoverTrigger className="w-full">
                            <Button 
                            className="w-full my-4 flex items-center justify-between py-8 bg-muted/70 group"
                            variant={'ghost'}
                            >
                                <div className="flex items-center text-left gap-2">
                                    <Compass color="#ffff" className="group-hover:rotate-180 duration-300"/>
                                    <div className="flex flex-col">
                                        {details.name}
                                        <span className="text-muted-foreground">
                                            {details.address}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <ChevronsUpDown size={18} className=" mx-1 text-muted-foreground" />
                                </div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 h-80 mt-4 z-[200]">
                            {
                                <Command className="rounded-lg">
                                    <CommandInput placeholder="Search Accounts..."></CommandInput>
                                    <CommandList className="pb-16">
                                        <CommandEmpty>No results found</CommandEmpty>
                                        {(user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN" ) && user?.Agency && 
                                        (
                                            <CommandGroup heading="Agency">
                                                <CommandItem className="!bg-transparent my-2 text-primary border-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
                                                    {defaultOpen ? (
                                                        <Link href={`/agency/${user?.Agency?.id}`}
                                                            className="flex gap-4 w-full h-full"
                                                        >
                                                            <div className="relative w-16">
                                                                <Image 
                                                                    src={user?.Agency?.agencyLogo}
                                                                    alt="Agency logo"
                                                                    fill className="rounded-md object-contain"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col flex-1">
                                                                {user?.Agency?.name}
                                                                <span className="text-muted-foreground">
                                                                    {user?.Agency?.address}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    ): (
                                                        <SheetClose asChild>
                                                            <Link href={`/agency/${user?.Agency?.id}`}
                                                                className="flex gap-4 w-full h-full"
                                                                >
                                                                <div className="relative w-16">
                                                                    <Image 
                                                                        src={user?.Agency?.agencyLogo}
                                                                        alt="Agency logo"
                                                                        fill className="rounded-md object-contain"
                                                                    />
                                                                </div>
                                                                <div className="flex flex-col flex-1">
                                                                    {user?.Agency?.name}
                                                                    <span className="text-muted-foreground">
                                                                        {user?.Agency?.address}
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                        </SheetClose>
                                                    )}
                                                </CommandItem>
                                            </CommandGroup>
                                        )}
                                        <CommandGroup heading="Accounts">
                                            {!!subAccounts
                                            ? subAccounts.map((subaccount) => (
                                                <CommandItem key={subaccount.id}>
                                                    {defaultOpen ? (
                                                    <Link
                                                        href={`/subaccount/${subaccount.id}`}
                                                        className="flex gap-4 w-full h-full"
                                                    >
                                                        <div className="relative w-16">
                                                        <Image
                                                            src={subaccount.subAccountLogo}
                                                            alt="subaccount Logo"
                                                            fill
                                                            className="rounded-md object-contain"
                                                        />
                                                        </div>
                                                        <div className="flex flex-col flex-1">
                                                        {subaccount.name}
                                                        <span className="text-muted-foreground">
                                                            {subaccount.address}
                                                        </span>
                                                        </div>
                                                    </Link>
                                                    ) : (
                                                    <SheetClose asChild>
                                                        <Link
                                                        href={`/subaccount/${subaccount.id}`}
                                                        className="flex gap-4 w-full h-full"
                                                        >
                                                        <div className="relative w-16">
                                                            <Image
                                                            src={subaccount.subAccountLogo}
                                                            alt="subaccount Logo"
                                                            fill
                                                            className="rounded-md object-contain"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col flex-1">
                                                            {subaccount.name}
                                                            <span className="text-muted-foreground">
                                                            {subaccount.address}
                                                            </span>
                                                        </div>
                                                        </Link>
                                                    </SheetClose>
                                                    )}
                                                </CommandItem>
                                                ))
                                            : 'No Accounts'}
                                        </CommandGroup>
                                    </CommandList>
                                    {(user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCY_ADMIN') &&
                                    (
                                        <Button className="w-full flex gap-2 items-center"
                                            onClick={() => {
                                                // setOpen()
                                            }}
                                        >
                                            <PlusCircleIcon size={15} />
                                            Create Sub Account
                                        </Button>
                                    )}
                                </Command>
                            }
                        </PopoverContent>
                    </Popover>
                </div>
            </SheetContent>
        </Sheet>
    );
}
export default MenuOptions;