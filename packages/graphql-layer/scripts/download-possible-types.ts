#!/usr/bin/env ts-node

import * as fs from "node:fs";
import * as path from "node:path";
import * as dotenv from "dotenv";

/*
 * This script fetches the possible type definitions from the graphql server
 * see https://www.apollographql.com/docs/react/v3.0-beta/data/fragments/#generating-possibletypes-automatically
 */

dotenv.config({ path: path.resolve(__dirname, "../../../apps/spark/.env") });

// disable for self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const graphQlEndpoint = process.env.VITE_API_ENDPOINT ?? "http://localhost:4000";

// get possible types and store them as possibleTypes.json
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
            possibleTypes {
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
    const possibleTypes = {};

    result.data.__schema.types.forEach((supertype) => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
      }
    });

    fs.mkdirSync(path.join(__dirname, "../src/__downloaded__"), { recursive: true });
    fs.writeFileSync(path.join(__dirname, "../src/__downloaded__/possibleTypes.json"), JSON.stringify(possibleTypes));
  })
  .catch((error) => {
    console.error("Error:", error);
  });
