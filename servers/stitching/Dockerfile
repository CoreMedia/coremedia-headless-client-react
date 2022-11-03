# Install dependencies only when needed
FROM node:18 AS deps
# pnpm
RUN npm install --location=global pnpm@7
WORKDIR /app
COPY .npmrc package.json pnpm-lock.* ./
RUN pnpm install --prod

# Build Stitching Server
FROM node:18 AS builder
# pnpm
RUN npm install --location=global pnpm@7
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build


# Production image, copy all the files and run the stitching server
FROM node:18 AS runner
WORKDIR /app

ENV NODE_ENV=production \
    # abort threshold in seconds
    WAIT_TIMEOUT=180 \
    # interval between probes in seconds
    WAIT_SLEEP_INTERVAL=10

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# you can use environment variables "WAIT_*" to ensure, services are up and running
# e.g. waiting for headless-server
# see https://github.com/ufoscout/docker-compose-wait for details
RUN curl -sL "https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait" -o /usr/bin/docker-compose-wait && \
    chmod +x /usr/bin/docker-compose-wait

EXPOSE 4000
HEALTHCHECK --start-period=30s --interval=30s --timeout=3s CMD curl -Lf http://localhost:4000/actuator/health || exit 1

CMD ["sh", "-c", "/usr/bin/docker-compose-wait ; node dist/index.js"]
