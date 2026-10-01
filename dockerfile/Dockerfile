FROM node:22-alpine

# prisma's query engine links against openssl
RUN apk add --no-cache openssl

WORKDIR /usr/src/app

# Install first so the dependency layer is cached across source-only changes.
# postinstall runs `prisma generate`, which needs the schema.
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

COPY . .

# No secrets at build time: everything (DATABASE_URL, AUTH_*) is injected as
# runtime env by the deploy, so the image is safe to push to a registry.
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

ENV NODE_ENV=production
# Run unprivileged; next start only needs to write its cache.
RUN chown -R node:node .next
USER node
EXPOSE 3001

# Apply pending migrations and upsert the problem list (both idempotent),
# then serve.
CMD ["sh", "-c", "npx prisma migrate deploy && npm run db:problems && npm run start"]
