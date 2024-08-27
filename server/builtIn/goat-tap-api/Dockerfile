FROM node:20

WORKDIR /server/builtIn/goat-tap-api

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

# Copy the api package.json
COPY server/builtIn/goat-tap-api/package.json ./server/builtIn/goat-tap-api/package.json
COPY server/builtIn/goat-tap-api/node_modules ./server/builtIn/goat-tap-api/node_modules
COPY server/builtIn/goat-tap-api/dist ./server/builtIn/goat-tap-api/dist

COPY . .

EXPOSE 6789