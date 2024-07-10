FROM --platform=linux/amd64 node:21-alpine AS base

ENV NEXT_TELEMETRY_DISABLED 1
ENV UPLOADS_PATH /uploads

WORKDIR /app
COPY ./package.json ./pnpm-lock.yaml .npmrc ./
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && pnpm run prisma generate && pnpm run build

# Runner
FROM base AS runner
WORKDIR /app

COPY --from=builder /app/public ./public

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma/schema.prisma prisma/schema.prisma

COPY --chown=nextjs:nodejs docker/entrypoint.sh /entrypoint.sh

RUN mkdir /uploads && chown -R nextjs:nodejs /uploads
VOLUME /uploads

USER nextjs

EXPOSE 3000

ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV UPLOADS_PATH /uploads

CMD /entrypoint.sh
