"use client";
import { Dashboard } from "./components/Dashboard";
import { ProblemType } from "./utils/ProblemType";
export default function App({ problems }: { problems: ProblemType[] }) {
  return (
    <div className="h-screen w-screen">
      <Dashboard problems={problems} />
    </div>
  );
}
