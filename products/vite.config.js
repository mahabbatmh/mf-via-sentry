import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.jsx",
      },
      remotes: {
        host: "http://localhost:5173/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
    sentryVitePlugin({
      org: "example-org-6k",
      project: "products-mfe",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  build: {
    target: "esnext",
    sourcemap: true,
  },
});
