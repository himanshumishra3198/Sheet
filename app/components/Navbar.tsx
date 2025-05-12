"use client";

import { Moon, Rabbit, Sun, SunMoon } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFetchUser } from "../hooks/useFetchUser";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const { data: session, status } = useSession();
  const user: {
    avatar: string;
    id: string;
    name: string;
    email: string;
    confetti: boolean;
  } | null = useFetchUser(session?.user?.id, session);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[var(--gray-900)] bg-[var(--gray-900)] shadow-md">
        <div className="flex h-16 items-center justify-between w-full px-4">
          <div className="font-bold text-xl text-[var(--green-50)] font-serif tracking-wide">
            <Rabbit className="inline-block h-8 w-12 mr-2 text-[var(--gray-100)]" />
          </div>
          <div>
            {status === "authenticated" && user && (
              <div className="ml-auto flex items-center space-x-4 space-y-4 rounded">
                <ProfileDropdown user={user} />
              </div>

              // <Button
              //   onClick={() => {
              //     signOut();
              //   }}
              //   className="py-5 text-md cursor-pointer rounded px-5 font-medium border-[var(--green-600)] bg-[var(--gray-800)] text-[var(--gray-100)] hover:text-[var(--gray-1000)] hover:bg-[var(--gray-700)] hover:border-[var(--green-50)] transition-all duration-200 shadow-[0_2px_0_0_rgba(0,0,0,0.3)]"
              // >
              //   Logout
              // </Button>
            )}
            {status === "unauthenticated" && (
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    setAuthType("login");
                    setModalOpen(true);
                  }}
                  className="py-5 text-md cursor-pointer rounded px-5 font-medium border-[var(--green-600)] bg-[var(--gray-800)] text-[var(--gray-100)] hover:text-[var(--gray-1000)] hover:bg-[var(--gray-700)] hover:border-[var(--green-50)] transition-all duration-200 shadow-[0_2px_0_0_rgba(0,0,0,0.3)]"
                >
                  Login
                </Button>

                <Button
                  onClick={() => {
                    setAuthType("signup");
                    setModalOpen(true);
                  }}
                  className="py-5 text-md cursor-pointer rounded px-5 font-medium border-[var(--green-600)] bg-[var(--gray-800)] text-[var(--gray-100)] hover:text-[var(--gray-1000)] hover:bg-[var(--gray-700)] hover:border-[var(--green-50)] transition-all duration-200 shadow-[0_2px_0_0_rgba(0,0,0,0.3)]"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        authType={authType}
      />
    </>
  );
}
