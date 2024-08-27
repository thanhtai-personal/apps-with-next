import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from 'vite';
import { libInjectCss } from "vite-plugin-lib-inject-css";
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import svgr from "vite-plugin-svgr"
import basicSsl from '@vitejs/plugin-basic-ssl'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const config = {
    plugins: [
      react(),
      libInjectCss(),
      svgr(),
    ],
    build: {
      outDir: "dist",
      chunkSizeWarningLimit: 10240,
      sourcemap: true,
    },
    server: {
      hmr: {
        host: '172.27.80.1',
      },
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          tailwindcss()
        ]
      }
    },
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src", "components"),
        "@/containers": path.resolve(__dirname, "src", "containers"),
        "@/assets": path.resolve(__dirname, "src", "assets"),
        "@/hooks": path.resolve(__dirname, "src", "hooks"),
        "@/appRoute": path.resolve(__dirname, "src", "appRoute"),
        "@/utils": path.resolve(__dirname, "src", "utils"),
        "@/context": path.resolve(__dirname, "src", "context"),
        "@/features": path.resolve(__dirname, "src", "features"),
        "@/layout": path.resolve(__dirname, "src", "layout"),
        "@/store": path.resolve(__dirname, "src", "store"),
        "@/styles": path.resolve(__dirname, "src", "styles"),
        "@/api": path.resolve(__dirname, "src", "api"),
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true
          })
        ]
      }
    }
  }

  if (command === "serve") {
    config.plugins.push(basicSsl({}))
  }

  return config;
})
