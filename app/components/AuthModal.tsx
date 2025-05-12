"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  authType: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, authType }: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[var(--gray-1000)] border-0 text-[var(--gray-100)] rounded-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif tracking-wide text-center">
            {authType === "login"
              ? "Login to your account"
              : "Create an account"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <Button
            className="cursor-pointer w-full flex items-center justify-center gap-2 bg-white text-gray-800 hover:bg-gray-100 transition-all"
            onClick={() => {
              console.log("Continue with Google clicked");
              // Add Google authentication logic here
              signIn("google");
              onClose();
            }}
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <div className="relative w-full my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-emerald-600"></span>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-emerald-800 px-2 text-emerald-300">or</span>
            </div>
          </div>

          {/* <Button
            className="w-full bg-emerald-600 hover:bg-emerald-500 transition-all"
            onClick={onClose}
          >
            {authType === "login" ? "Login with Email" : "Sign up with Email"}
          </Button> */}

          <p className="text-sm text-emerald-300 mt-2">
            {authType === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
