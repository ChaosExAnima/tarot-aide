FROM --platform=linux/amd64 node:21-alpine AS base

ENV DATABASE_URL file:/db/tarot.db
ENV NEXT_TELEMETRY_DISABLED 1
ENV UPLOADS_PATH /uploads

WORKDIR /app
RUN yarn global add pnpm
COPY package.json pnpm-lock.yaml ./

# Builder
FROM base AS builder
WORKDIR /app
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm prisma generate
RUN pnpm build

RUN rm -rf node_modules && pnpm i --frozen-lockfile --prod

# Runner
FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app
COPY --from=builder --chown=nextjs:nodejs /app/.next .next
RUN pnpm install --frozen-lockfile --prod

USER nextjs

EXPOSE 3000

ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

VOLUME /db
VOLUME /uploads

CMD ["pnpm", "start"]
