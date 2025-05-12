import Navbar from "./Navbar";
import { TopicList } from "./Problems/TopicList";

import { ProblemType } from "../utils/ProblemType";
import { HeroSection } from "./HeroSection";
import ProgressBar from "./ProgressBar";
export function Dashboard({ problems }: { problems: ProblemType[] }) {
  return (
    <div className="h-screen w-screen bg-[var(--gray-1000)] text-[var(--gray-100)] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProgressBar problems={problems} />
      <div className="w-full">
        <TopicList problems={problems} />
      </div>
    </div>
  );
}
