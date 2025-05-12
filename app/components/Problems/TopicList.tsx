import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProblemTable } from "./ProblemTable";
import { ProblemType } from "@/app/utils/ProblemType";
const topics = [
  "basic",
  "maths",
  "recursion basics",
  "basic hashing",
  "sorting",
  "arrays",
  "binary search",
  "string problems",
  "linked list",
  "recursion",
  "bit manipulation",
  "stack queue",
  "sliding window and two pointer",
  "heap",
  "greedy",
  "binary tree",
  "binary search tree",
  "graph",
  "dynamic programming",
  "tries",
  "strings advance",
];
export const TopicList = async ({ problems }: { problems: ProblemType[] }) => {
  function checkProblemAvailable(topic: string, difficulty: string) {
    let flag = false;
    problems.forEach((problem) => {
      if (problem.topic === topic && problem.difficulty === difficulty) {
        return (flag = true);
      }
    });
    return flag;
  }
  const renderTopics = topics.map((topic, index) => {
    return (
      <AccordionItem value={"item-" + index} key={index}>
        <AccordionTrigger>
          <div className="text-xs lg:text-lg font-medium font-dmSans lg:font-semibold dark:text-neutral-50 flex justify-start text-left">
            {index + 1 + ". "}
            {topic
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" className="w-full" collapsible>
            {checkProblemAvailable(topic, "easy") && (
              <AccordionItem value="easy">
                <AccordionTrigger>
                  <div className="text-xs lg:text-lg font-medium font-dmSans lg:font-semibold dark:text-neutral-50 flex justify-start text-left">
                    {index + 1 + ".1 "} Easy
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ProblemTable problems={problems} type="easy" topic={topic} />
                </AccordionContent>
              </AccordionItem>
            )}
            {checkProblemAvailable(topic, "medium") && (
              <AccordionItem value="medium">
                <AccordionTrigger>
                  <div className="text-xs lg:text-lg font-medium font-dmSans lg:font-semibold dark:text-neutral-50 flex justify-start text-left">
                    {index + 1 + ".2 "} Medium
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ProblemTable
                    problems={problems}
                    type="medium"
                    topic={topic}
                  />
                </AccordionContent>
              </AccordionItem>
            )}
            {checkProblemAvailable(topic, "hard") && (
              <AccordionItem value="hard">
                <AccordionTrigger>
                  <div className="text-xs lg:text-lg font-medium font-dmSans lg:font-semibold dark:text-neutral-50 flex justify-start text-left">
                    {index + 1 + ".3 "} Hard
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ProblemTable problems={problems} type="hard" topic={topic} />
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    );
  });
  return (
    <div className="my-16 mx-16 flex items-center justify-center text-[var(--gray-100)] container p-4 bg-[var(--gray-900)] rounded-2xl shadow-neutral-800">
      <Accordion type="multiple" className="w-full">
        {renderTopics}
      </Accordion>
    </div>
  );
};
