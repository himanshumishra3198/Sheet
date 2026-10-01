# A2Z DSA Sheet

Every problem from the A2Z DSA sheet, with LeetCode and GeeksforGeeks links
and progress tracking that lives in the browser. Live at https://hm0.org.

- `problems/problems.json`: the problems, grouped by topic.
- `lib/topic-meta.ts`: topic names, URLs and descriptions.
- `app/`: the home page and one page per topic (`/topics/<slug>`), plus
  sitemap, robots.txt, manifest and the social preview image.

The site is a static export (`next build` writes `out/`), served by nginx.

```sh
npm install
npm run dev        # http://localhost:3001
npm run build      # static export in out/
npm run preview    # serve out/ on http://localhost:3001
```

Deployment: see [deploy/SETUP.md](deploy/SETUP.md).
