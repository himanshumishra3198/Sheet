# DSA Sheets

Two problem sheets with LeetCode and GeeksforGeeks links and progress
tracking that lives in the browser. Live at https://hm0.org.

- **A2Z DSA Sheet** (`/`, one page per topic at `/topics/<slug>`):
  `problems/problems.json`, with topic names, URLs and descriptions in
  `lib/topic-meta.ts`.
- **SDE Sheet** (`/sde-sheet`): `problems/sde-sheet.json`, topics ->
  patterns -> problems, graded Basic / Core / Pro. A problem that is also on
  the A2Z sheet names it in `a2z`; it then shares that problem's links and
  its tick (solve it once, it's solved in both sheets). `leetcodeurl` /
  `gfgurl` on an SDE entry fill in links the A2Z entry lacks.
- `app/`: the pages, plus sitemap, robots.txt, manifest and social images.

The site is a static export (`next build` writes `out/`), served by nginx.

```sh
npm install
npm run dev        # http://localhost:3001
npm run build      # static export in out/
npm run preview    # serve out/ on http://localhost:3001
```

Deployment: see [deploy/SETUP.md](deploy/SETUP.md).
