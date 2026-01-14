# Install dependencies only when needed
FROM node:24-slim as base
ARG MAINTAINER='CoreMedia GmbH <support@coremedia.com>'
LABEL maintainer="${MAINTAINER}"

RUN apt-get update -y -qq > /dev/null && \
    apt-get install -y -qq > /dev/null curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN npm install -g pnpm@10

# Build Stitching Server
FROM base AS builder
WORKDIR /app
COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --no-frozen-lockfile
COPY . .
RUN pnpm build

# Production image, copy all the files and run the stitching server
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4000
HEALTHCHECK --start-period=30s --interval=30s --timeout=3s CMD curl -Lf http://localhost:4000/actuator/health || exit 1

CMD ["node", "dist/index.js"]
