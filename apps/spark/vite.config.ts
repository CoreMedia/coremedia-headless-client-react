import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
  ],
  base: "./",
  build: {
    // split chunks manually to avoid one big js file.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("slick")) {
            return "slick";
          } else if (id.includes("apollo") || id.includes("graphql")) {
            return "graphql";
          } else if (id.includes("react")) {
            return "react";
          } else if (id.includes("node_modules") && !id.includes("styled-components")) {
            return "vendor";
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "node",
  },
  server: {
    proxy: {
      "/caas": {
        target: process.env.VITE_API_ENDPOINT || "http://localhost:4000",
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
