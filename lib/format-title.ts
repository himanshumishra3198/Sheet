// The sheet's titles are mostly lowercase ("koko eating bananas"). They're
// shown in title case, with the acronyms and math tokens of DSA kept intact.

const SMALL_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into",
  "nor", "of", "on", "or", "per", "the", "to", "vs", "via", "with",
]);

// Lowercased token -> exact spelling.
const SPECIAL: Record<string, string> = {
  bfs: "BFS", dfs: "DFS", bst: "BST", bt: "BT", dag: "DAG", ug: "UG",
  dll: "DLL", ll: "LL", lca: "LCA", gcd: "GCD", hcf: "HCF", lru: "LRU",
  lfu: "LFU", kmp: "KMP", lps: "LPS", dp: "DP", xor: "XOR", nges: "NGEs",
  "2d": "2D", "3d": "3D", "c++": "C++", "2sum": "2Sum",
  ii: "II", iii: "III", iv: "IV", linkedlist: "LinkedList",
  startswith: "startsWith", atoi: "atoi", "atoi()": "atoi()",
};

// Whole titles that the rules can't get right.
const OVERRIDES: Record<string, string> = {
  "pow(x, n)": "Pow(x, n)",
  "connect `n` ropes with minimal cost": "Connect N Ropes with Minimal Cost",
  "kmp algorithm / lps(pi) array": "KMP Algorithm / LPS (Pi) Array",
  "count number of bits to be flipped to convert a to b":
    "Count Number of Bits to Be Flipped to Convert A to B",
  "recursive implementation of atoi()": "Recursive Implementation of atoi()",
};

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// One word without surrounding punctuation, e.g. "bst's", "dp-41", "min/max".
function formatWord(word: string, forceCapital: boolean): string {
  const lower = word.toLowerCase();
  if (SPECIAL[lower]) return SPECIAL[lower];
  if (lower.endsWith("'s") && SPECIAL[lower.slice(0, -2)]) {
    return SPECIAL[lower.slice(0, -2)] + "'s";
  }
  // Math like "n/2" stays as written.
  if (/\d/.test(lower) && lower.includes("/")) return lower;
  // "k-th", "i-th"
  if (/^[a-z]-th$/.test(lower)) return lower[0].toUpperCase() + "-th";
  // Compound words: "height-balanced", "dp-41", "min/max", "sum-ii".
  for (const sep of ["-", "/"]) {
    if (lower.includes(sep) && lower.length > 1) {
      return lower
        .split(sep)
        .map((part) => (part ? formatWord(part, true) : part))
        .join(sep);
    }
  }
  // Single letters are variables (n, k, m, x) or roman one; "a" is an article.
  if (lower.length === 1) {
    return lower === "a" && !forceCapital ? "a" : lower.toUpperCase();
  }
  // Numbers and math ("n/2", "01", "1's") stay as written.
  if (/\d/.test(lower)) return lower;
  if (!forceCapital && SMALL_WORDS.has(lower)) return lower;
  return capitalize(lower);
}

export function formatTitle(raw: string): string {
  const title = raw.trim().replace(/\.$/, "");
  const override = OVERRIDES[title.toLowerCase()];
  if (override) return override;

  const tokens = title.split(/\s+/);
  return tokens
    .map((token, i) => {
      // Split leading/trailing punctuation: "(dp-41)" -> "(", "dp-41", ")".
      const match = token.match(/^([([{"'`]*)(.*?)([)\]}"'`.,:;?!]*)$/);
      if (!match) return token;
      const [, lead, core, trail] = match;
      if (!core) return token;
      const prev = tokens[i - 1] ?? "";
      const forceCapital =
        i === 0 ||
        i === tokens.length - 1 ||
        lead !== "" ||
        /[:|/]$/.test(prev) ||
        prev === "-";
      return lead + formatWord(core, forceCapital) + trail;
    })
    .join(" ");
}
