import { topics, totals } from "./problems";
import { sdePatternCount, sdeTopics, sdeTotals } from "./sde";
import { A2Z_NAME, SDE_NAME } from "./site";

export const HOME_TITLE = `${A2Z_NAME}: ${totals.total} DSA Problems with LeetCode & GFG Links`;
export const HOME_DESCRIPTION = `All ${totals.total} problems of the A2Z DSA sheet across ${topics.length} topics, with direct LeetCode and GeeksforGeeks links and free progress tracking.`;

export const SDE_TITLE = `${SDE_NAME}: ${sdeTotals.total} Coding Interview Problems by Pattern`;
export const SDE_DESCRIPTION = `${sdeTotals.total} must-do coding interview problems in ${sdePatternCount} patterns across ${sdeTopics.length} topics, with LeetCode and GeeksforGeeks links and free progress tracking.`;
