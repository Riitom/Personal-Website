import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  workers: 1,
  use: { baseURL: "http://127.0.0.1:4173", channel: "chrome", headless: true, trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: "reduced-motion", use: { viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" } },
  ],
  webServer: { command: "npm run dev -- --host 127.0.0.1 --port 4173 --strictPort", url: "http://127.0.0.1:4173", reuseExistingServer: false, timeout: 30000 },
});
