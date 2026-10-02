# Hosting Sheet on the rankarenas EC2 box

Sheet is a static site: `next build` exports plain HTML/CSS/JS, and the
Docker image serves it with an unprivileged nginx (`dockerfile/`). There is
no database and no Node server at runtime; progress lives in each visitor's
browser.

It runs as its own compose project in `/home/ubuntu/sheet`, next to
rankarena in `/home/ubuntu/rankarena`, and shares two things with it:

- **nginx**: rankarena's proxy (ports 80/443) terminates TLS for hm0.org and
  forwards to the `sheet` container over the `rankarena_default` network.
- **certbot**: rankarena's certbot container also renews the hm0.org cert.

```
internet ─► rankarena proxy (nginx :443, TLS)
              ├─ rankarenas.com, admin., api.  ─► rankarena containers
              └─ hm0.org, www.hm0.org          ─► sheet:3001 (static nginx)
```

Every push to `main` builds the image, pushes it to ECR and restarts the
container (`.github/workflows/deploy.yml`).

## One-time setup (already done for hm0.org)

1. **DNS**: A records for `@` and `www` pointing at the instance's Elastic IP.
2. **Certificate**, issued through rankarena's certbot (its port-80 server
   answers ACME challenges for any host). This must exist before the nginx
   server block below is deployed, or nginx refuses to start:

   ```sh
   cd ~/rankarena
   docker compose -f docker-compose.prod.yml run --rm --entrypoint certbot certbot \
     certonly --webroot -w /var/www/certbot -d hm0.org -d www.hm0.org \
     --email <you@example.com> --agree-tos --no-eff-email
   ```

3. **Routing**: the `hm0.org` server blocks live in rankarena's
   `nginx/nginx.conf`. Edit them there, not on the box: every rankarena
   deploy overwrites the server's copy.
4. **ECR**: a `sheet-app` repository in us-east-1 with rankarena's lifecycle
   policy (`scripts/ecr-lifecycle-policy.json` in the rankarena repo).
5. **GitHub secrets** on this repo: `AWS_ACCESS_KEY_ID`,
   `AWS_SECRET_ACCESS_KEY`, `EC2_HOST`, `EC2_SSH_KEY` (same values as
   rankarena's).
6. `mkdir ~/sheet` on the box; CI writes `docker-compose.prod.yml` and `.env`.

## Local development

```sh
npm install
npm run dev        # http://localhost:3001
npm run build      # static export in out/
npm run preview    # serve out/ on http://localhost:3001
```

Problems live in `problems/problems.json` (A2Z) and
`problems/sde-sheet.json` (SDE); A2Z topic names, URLs and descriptions in
`lib/topic-meta.ts`. Saved progress is keyed by A2Z topic key and title
(SDE-only problems by title), so renaming a problem resets its tick for
people who solved it.
