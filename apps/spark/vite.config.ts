import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as dotenv from "dotenv";

dotenv.config();

const getProxyHost = (): string => {
  let proxyHost = "http://localhost:4000";
  if (process.env.VITE_API_ENDPOINT) {
    // remove graphql suffix, if exist
    proxyHost = process.env.VITE_API_ENDPOINT.replace("/graphql", "");
  }
  return proxyHost;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    // do not inline assets
    //assetsInlineLimit: 0,
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
            } else if (packageId.includes("react")) {
              return "react";
            } else if (packageId.includes("apollo") || packageId.includes("graphql")) {
              return "graphql";
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
        target: getProxyHost(),
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
