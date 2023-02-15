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
  base: "/",
  build: {
    // split chunks manually to avoid one big js file.
    rollupOptions: {
      output: {
        manualChunks(id) {
          // split only dependencies into chunks
          if (id.indexOf("node_modules") > 0) {
            // remove path of the workspace for chunk splitting to avoid wrong chunks,
            // if the pathname include one of the given keywords
            const packageId = id.substring(id.indexOf("node_modules"));
            if (packageId.includes("slick")) {
              return "slick";
            } else if (packageId.includes("apollo") || packageId.includes("graphql")) {
              return "graphql";
            } else if (packageId.includes("react")) {
              return "react";
            } else if (!packageId.includes("styled-components")) {
              return "vendor";
            }
          }
          // everything else will be part of index.js
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
