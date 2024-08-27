FROM node:20

WORKDIR /apps/goat-tap

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
# Copy app source
COPY . .

EXPOSE 5173