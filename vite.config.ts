import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  envDir: "./environments/",
  resolve: {
    alias: [
      {
        find: "./runtimeConfig",
        replacement: "./runtimeConfig.browser",
      },
    ],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/config/vitest.setup.ts"],
    coverage: {
      reporter: ["lcov"],
      exclude: [
        "node_modules/",
        "src/**/*.test.ts",
        "src/**/*.test.tsx",
        "src/*.d.ts",
        "src/**/*mock.ts",
        "src/**/*Types.ts",
        "src/config/*",
      ],
      all: true,
      include: ["src/**/*.ts", "src/**/*.tsx"],
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
