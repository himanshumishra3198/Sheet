// Display name, URL slug and a one-line summary for each topic key in
// problems/problems.json. `noun` reads naturally before "Problems" in the
// topic page's heading and title ("Graph Problems"). The summary is the
// page's intro and meta description, so keep it specific to its problems.
export const TOPIC_META: Record<
  string,
  { name: string; noun: string; slug: string; summary: string }
> = {
  basic: {
    name: "Basics",
    noun: "Basic Programming",
    slug: "basics",
    summary:
      "Start here: input and output, data types, conditionals, loops, functions and the basics of time complexity.",
  },
  maths: {
    name: "Basic Maths",
    noun: "Basic Maths",
    slug: "basic-maths",
    summary:
      "Digit manipulation, palindromes, GCD and HCF, Armstrong numbers, divisors and prime checks.",
  },
  "recursion basics": {
    name: "Recursion Basics",
    noun: "Recursion Basics",
    slug: "recursion-basics",
    summary:
      "Get comfortable with recursion by printing sequences, summing numbers, computing factorials, reversing arrays and checking palindromes.",
  },
  "basic hashing": {
    name: "Basic Hashing",
    noun: "Hashing",
    slug: "basic-hashing",
    summary:
      "Hashing theory and counting element frequencies, including the highest and lowest frequency element.",
  },
  sorting: {
    name: "Sorting",
    noun: "Sorting",
    slug: "sorting",
    summary:
      "Selection, bubble, insertion, merge and quick sort, plus recursive bubble and insertion sort.",
  },
  arrays: {
    name: "Arrays",
    noun: "Array",
    slug: "arrays",
    summary:
      "From the largest element to Kadane's algorithm, 2Sum, 3Sum and 4Sum, matrix rotation, merging intervals, count inversions and reverse pairs.",
  },
  "binary search": {
    name: "Binary Search",
    noun: "Binary Search",
    slug: "binary-search",
    summary:
      "Lower and upper bound, rotated sorted arrays, binary search on answers like Koko Eating Bananas and Aggressive Cows, and search in 2D matrices.",
  },
  "string problems": {
    name: "Strings",
    noun: "String",
    slug: "strings",
    summary:
      "Parentheses, palindromes, anagrams, isomorphic strings, Roman numerals, atoi and substring problems.",
  },
  "linked list": {
    name: "Linked List",
    noun: "Linked List",
    slug: "linked-list",
    summary:
      "Singly and doubly linked lists: insertion, deletion, reversal, cycle detection with the tortoise and hare, sorting and cloning with random pointers.",
  },
  recursion: {
    name: "Recursion & Backtracking",
    noun: "Recursion & Backtracking",
    slug: "recursion-backtracking",
    summary:
      "Subsequences, subsets, combination sums, palindrome partitioning, N-Queens, Rat in a Maze, M-Coloring and Sudoku Solver.",
  },
  "bit manipulation": {
    name: "Bit Manipulation",
    noun: "Bit Manipulation",
    slug: "bit-manipulation",
    summary:
      "Checking and setting bits, counting set bits, powers of two, XOR tricks and generating the power set.",
  },
  "stack queue": {
    name: "Stack & Queue",
    noun: "Stack & Queue",
    slug: "stack-and-queue",
    summary:
      "Implement stacks and queues, convert between infix, prefix and postfix, solve monotonic stack problems and build LRU and LFU caches.",
  },
  "sliding window and two pointer": {
    name: "Sliding Window & Two Pointers",
    noun: "Sliding Window & Two Pointer",
    slug: "sliding-window-two-pointers",
    summary:
      "Longest substring without repeating characters, fruit into baskets, nice subarrays, minimum window substring and more.",
  },
  heap: {
    name: "Heaps & Priority Queues",
    noun: "Heap & Priority Queue",
    slug: "heaps",
    summary:
      "Binary heaps and priority queues: Kth largest and smallest, merging sorted lists, task scheduler, median of a data stream and top K frequent elements.",
  },
  greedy: {
    name: "Greedy Algorithms",
    noun: "Greedy",
    slug: "greedy",
    summary:
      "Assign cookies, fractional knapsack, jump game, meeting rooms, job sequencing, candy and interval scheduling.",
  },
  "binary tree": {
    name: "Binary Trees",
    noun: "Binary Tree",
    slug: "binary-trees",
    summary:
      "Recursive, iterative and Morris traversals, height and diameter, tree views, LCA, maximum width, construction from traversals and serialization.",
  },
  "binary search tree": {
    name: "Binary Search Trees",
    noun: "Binary Search Tree",
    slug: "binary-search-trees",
    summary:
      "Search, insert and delete in a BST, floor and ceil, Kth smallest element, validation, LCA, inorder successor and recovering a BST.",
  },
  graph: {
    name: "Graphs",
    noun: "Graph",
    slug: "graphs",
    summary:
      "BFS and DFS, cycle detection, topological sort, shortest paths with Dijkstra, Bellman-Ford and Floyd-Warshall, minimum spanning trees, disjoint sets and SCCs.",
  },
  "dynamic programming": {
    name: "Dynamic Programming",
    noun: "Dynamic Programming",
    slug: "dynamic-programming",
    summary:
      "The full DP series: 1D DP, DP on grids, subsets, strings and stocks, LIS and partition DP, from Climbing Stairs to Burst Balloons.",
  },
  tries: {
    name: "Tries",
    noun: "Trie",
    slug: "tries",
    summary:
      "Implement a trie, count distinct substrings and solve maximum XOR problems with a bitwise trie.",
  },
  "strings advance": {
    name: "Advanced Strings",
    noun: "Advanced String",
    slug: "advanced-strings",
    summary:
      "String hashing, Rabin-Karp, the Z-function, KMP and the LPS array, shortest palindrome and longest happy prefix.",
  },
};
