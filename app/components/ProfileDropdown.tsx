"use client";

import { useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { signOut } from "next-auth/react";

export default function ProfileDropdown({
  user,
}: {
  user: {
    avatar: string;
    id: string;
    name: string;
    email: string;
    confetti: boolean;
  };
}) {
  const [confetti, setConfetti] = useState(user.confetti);

  // This would come from your auth system

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full cursor-pointer"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-[var(--gray-1000)] text-[var(--gray-100)] border-0"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-between cursor-default">
          <span>Confetti</span>
          <Switch
            checked={confetti}
            onCheckedChange={async () => {
              await fetch(
                `/api/v1/user/${user.id}?confetti=${
                  confetti ? "false" : "true"
                }`,
                {
                  method: "PATCH",
                }
              );
              setConfetti((prev) => !prev);
              window.location.reload();
            }}
            aria-label="Toggle confetti"
            className="cursor-pointer"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await signOut();
          }}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
