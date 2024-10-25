/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve, relative } from 'path';
import { globSync } from 'glob';

// Find js files in the resources/**/*.js folder
let jsFiles = globSync('resources/**/*.js');

export default defineConfig({
  base: '/pm-o1/',  // Set the base of the application to "/pm-o1/"
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'resources/js'),
      },
      // Enable the full Vue build (include template compiler)
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js',
      },
    ],
    extensions: ['.mjs', '.js', '.vue', '.json'],
  },
  build: {
    sourcemap: process.env.NODE_ENV === 'development' ? 'inline': false,
    manifest: true,
    target: 'esnext',
    outDir: '../public/pm-o1/', // Set the public directory for output
    rollupOptions: {
      input: jsFiles, // Use the array of JS file paths as entry points
      output: {
        entryFileNames: assetInfo => {
          const resourceDir = resolve(__dirname, 'resources');
          const filePath = assetInfo.facadeModuleId;
          let relativePath = relative(resourceDir, filePath);

          // Remove any leading "../" segments
          relativePath = relativePath.replace(/^(\.\.(\/|\\))+/g, '');

          // Remove the file extension
          const fileNameWithoutExt = relativePath.replace(/\.[^/.]+$/, '');

          // Normalize path separators to forward slashes
          const normalizedPath = fileNameWithoutExt.replace(/\\/g, '/');

          return `${normalizedPath}.[hash].js`;
        },
        chunkFileNames: assetInfo => {
          const resourceDir = resolve(__dirname, 'resources');
          const filePath = assetInfo.facadeModuleId || assetInfo.name;
          let relativePath = relative(resourceDir, filePath);

          // Remove any leading "../" segments
          relativePath = relativePath.replace(/^(\.\.(\/|\\))+/g, '');

          // Remove the file extension
          const fileNameWithoutExt = relativePath.replace(/\.[^/.]+$/, '');

          // Normalize path separators to forward slashes
          const normalizedPath = fileNameWithoutExt.replace(/\\/g, '/');

          return `${normalizedPath}.[hash].js`;
        },
        assetFileNames: assetInfo => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'css/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
        manualChunks: id => {
          if (id.includes('node_modules')) {
            const modulePath = id.split('node_modules/')[1];
            const parts = modulePath.split('/');

            let pkgName;
            if (parts[0].startsWith('@')) {
              // Group by the main scope, e.g., '@vue'
              pkgName = parts[0];
            } else {
              pkgName = parts[0];
            }
            return pkgName;
          }
        },
      },
    },
  },
  plugins: [
    vue(),
  ],
  server: {
    hmr: {
      host: 'localhost',
    },
  },
});