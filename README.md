# Server API

# Edit pnpm-workspace.yaml to define what packages you want to build.

# To Run Client App from Workspace Directory

## Development Mode:

1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Build the project:
   ```sh
   pnpm run build
   ```
3. Run the development server:
   ```sh
   pnpm run server:dev
   pnpm run dev
   ```

## Production Build:

1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Build the project:
   ```sh
   pnpm run build
   pnpm run server:start
   ```
3. Host the app you want to publish by building it in the `./apps/<your-app-name>/dist` directory.
