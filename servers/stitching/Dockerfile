# Install dependencies only when needed
FROM node:16 AS deps
# pnpm 6.x
RUN npm install -g pnpm@6
WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

# Build Stitching Server
FROM node:16 AS builder
# pnpm 6.x
RUN npm install -g pnpm@6
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build


# Production image, copy all the files and run the stitching server
FROM node:16 AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4000
HEALTHCHECK --start-period=30s --interval=30s --timeout=3s CMD curl -Lf http://localhost:4000/actuator/health || exit 1

CMD ["node", "dist/index.js"]
