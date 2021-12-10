FROM node:16
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

COPY package.json .

# Bundle app source
COPY . .

RUN yarn install --no-lockfile && \
    yarn build

EXPOSE 4000
HEALTHCHECK --start-period=30s --interval=30s --timeout=3s CMD curl -Lf http://localhost:4000/actuator/health || exit 1
CMD [ "node", "dist/index.js" ]
