# ── Build: static export of the Next.js app to out/ ──────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build \
 && find out -type f \( -name '*.html' -o -name '*.txt' -o -name '*.js' \
      -o -name '*.css' -o -name '*.json' -o -name '*.xml' -o -name '*.svg' \
      -o -name '*.webmanifest' \) -exec gzip -9 -k {} +

# ── Serve: nginx only, running as an unprivileged user ───────────────────────
FROM nginxinc/nginx-unprivileged:1.29-alpine

COPY dockerfile/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 3001
