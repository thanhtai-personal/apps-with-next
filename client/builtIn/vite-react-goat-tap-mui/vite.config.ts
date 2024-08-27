import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css'; // Assuming you still need this plugin
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { version: '2023-11' }],
        ],
      },
    }),
    libInjectCss(), // Optional, if needed
    svgr(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx', 'images.d.ts'],
      outDir: 'dist/@types', // Output directory for type definitions
      insertTypesEntry: true, // Create an entry point for the type definitions
      rollupTypes: true, // Roll up types into a single file
    })
  ],
  build: {
    outDir: 'dist', // Output directory for the built library
    chunkSizeWarningLimit: 102400, // Warning threshold for chunk size
    // sourcemap: true, // Generate source maps for debugging
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // Entry point for the library
      name: '@core-ui/react-goat-tap-mui', // Library name (used in external builds)
      fileName: (format) => `index.${format}.js`, // Output file names
      formats: ['es', 'umd'], // Build formats (ES modules and UMD for browser compatibility)
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        name: '@core-ui/react-goat-tap-mui',
      },
    },
    minify: 'terser',
    terserOptions: {
      mangle: false, // Disable name mangling
      format: {
        comments: false, // Remove comments
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        tailwindcss(),
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/containers': path.resolve(__dirname, 'src/containers'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/appRoute': path.resolve(__dirname, 'src/appRoute'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/context': path.resolve(__dirname, 'src/context'),
      '@/features': path.resolve(__dirname, 'src/features'),
      '@/layout': path.resolve(__dirname, 'src/layout'),
      '@/store': path.resolve(__dirname, 'src/store'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/providers': path.resolve(__dirname, 'src/providers'),
    }
  },
  // Consider adding these options for a more robust library:
  // - esbuild: See `createEsbuild` plugin above for potential speed improvements.
  // - cssPreprocessOptions: Configure CSS preprocessors (e.g., Sass, Less) if used.
  // - analyze: Enable build analysis to identify unused dependencies.
});