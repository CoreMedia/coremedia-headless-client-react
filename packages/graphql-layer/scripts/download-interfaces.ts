#!/usr/bin/env ts-node

import * as fs from "node:fs";
import * as path from "node:path";
import * as dotenv from "dotenv";

/*
 * This script fetches the available interface definitions from the graphql server
 */

dotenv.config({ path: path.resolve(__dirname, "../../../apps/spark/.env") });

// disable for self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const graphQlEndpoint = process.env.VITE_API_ENDPOINT ?? "http://localhost:4000";

// get interfaces and store them as interfaces.json
console.log("Using VITE_API_ENDPOINT=" + graphQlEndpoint);
fetch(graphQlEndpoint + "/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            interfaces {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    const interfaces = {};

    result.data.__schema.types.forEach((type) => {
      if (type.interfaces) {
        interfaces[type.name] = type.interfaces.reverse().map((i) => i.name);
      }
    });

    fs.mkdirSync(path.join(__dirname, "../src/__downloaded__"), { recursive: true });
    fs.writeFileSync(path.join(__dirname, "../src/__downloaded__/interfaces.json"), JSON.stringify(interfaces));
  })
  .catch((error) => {
    console.error("Error:", error);
  });
