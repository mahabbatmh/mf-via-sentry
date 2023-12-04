import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        products: "http://localhost:5001/assets/remoteEntry.js",
        carts: "http://localhost:5002/assets/remoteEntry.js",
      },
      exposes: {
        "./BackdropLoading": "./src/components/BackdropLoading.jsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: "esnext",
  },
});
