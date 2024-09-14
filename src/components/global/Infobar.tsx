"use client";
import { NotificationWithUser } from "@/lib/types";
import { UserButton } from "@clerk/nextjs";
import { Bell, ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "./mode-toggle";

type Props = {
  notification: NotificationWithUser | [];
  role?: string;
  className?: string;
  subAccountId?: string;
};

const Infobar = ({ notification, role, className, subAccountId }: Props) => {
  const [allNotification, setNotifications] = useState(notification);
  const [showAll, setShowAll] = useState(true);

  const handleClick = () => {
    if (!showAll) {
      setNotifications(notification);
    } else {
      if (notification?.length !== 0) {
        setNotifications(
          notification?.filter((item) => item.subAccountId === subAccountId) ||
            []
        );
      }
    }
    setShowAll((prev) => !prev);
  };

  return (
    <div
      className={twMerge(
        "fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex  gap-4 items-center border-b-[1px] ",
        className
      )}
    >
      <Link
        href={"/site"}
        className="flex items-center gap-2 cursor-pointer lg:ml-0 ml-10"
      >
        <Image
          src={"/assets/plura-logo.svg"}
          width={40}
          height={40}
          alt="logo"
        />
        <span className="text-xl font-bold">Diana</span>
      </Link>
      <div className="flex items-center gap-2 ml-auto">
        <UserButton />
        <Sheet>
          <SheetTrigger>
            <div className="rounded-full w-8 h-8 bg-primary flex items-center justify-center text-white">
              <Bell size={17} />
            </div>
          </SheetTrigger>
          <SheetContent className="mt-4 mr-4 pr-4 overflow-scroll">
            <SheetHeader className="text-left">
              <SheetTitle>Notifications</SheetTitle>
              <SheetDescription>
                {(role === "AGENCY_ADMIN" || role === "AGENCY_OWNER") && (
                  <Card className="flex items-center justify-between p-4 mb-4">
                    Current Subaccount
                    <Switch onCheckedChange={handleClick} />
                  </Card>
                )}
              </SheetDescription>
            </SheetHeader>
            {allNotification?.map((notification) => (
              <div
                key={notification.id}
                className="border-b border-muted-foreground/40 gap-y-2 mb-2 text-ellipsis"
              >
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage
                      src={notification.User.avatarUrl}
                      alt="Profile Pic"
                    />
                    <AvatarFallback className="bg-primary">
                      {notification.User.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p>
                      <span className="font-bold">
                        {notification.notification.split("|")[0]}
                      </span>
                      <span className="text-mut  ed-foreground">
                        {notification.notification.split("|")[1]}
                      </span>
                      <span className="font-bold">
                        {notification.notification.split("|")[2]}
                      </span>
                    </p>
                    <small className="text-xs text-muted-foreground">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </div>
            ))}
            {allNotification?.length === 0 && (
              <div className="flex items-center justify-center mb-4 text-muted-foreground">
                You have no notification
              </div>
            )}
          </SheetContent>
        </Sheet>
        <ModeToggle />
      </div>
    </div>
  );
};
export default Infobar;
