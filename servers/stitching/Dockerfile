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

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4000
HEALTHCHECK --start-period=30s --interval=30s --timeout=3s CMD curl -Lf http://localhost:4000/actuator/health || exit 1

CMD ["node", "dist/index.js"]
