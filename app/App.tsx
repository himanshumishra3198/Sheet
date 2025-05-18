"use client";
import { SessionProvider } from "next-auth/react";
import { Dashboard } from "./components/Dashboard";
import { ProblemType } from "./utils/ProblemType";
export default function App({ problems }: { problems: ProblemType[] }) {
  return (
    <div className="h-screen w-screen">
      <SessionProvider>
        <Dashboard problems={problems} />
      </SessionProvider>
    </div>
  );
}
