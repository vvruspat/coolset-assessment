import { defineConfig, defineProject } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
    },
    projects: [
      defineProject({
        test: {
          name: "unit",
          environment: "jsdom",
          setupFiles: ["./vitest.setup.ts"],
          css: true,
          globals: true,
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: ["**/*.stories.{ts,tsx}", "node_modules"],
        },
      }),
    ],
  },
});
