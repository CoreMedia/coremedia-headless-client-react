#!/usr/bin/env ts-node

import * as fs from "node:fs";
import * as path from "node:path";
import { getIntrospectionQuery } from "graphql";
import * as dotenv from "dotenv";

/*
 * This script downloads the schema.json from the graphql server
 */

dotenv.config({ path: path.resolve(__dirname, "../../../apps/spark/.env") });

// disable for self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const graphQlEndpoint = process.env.VITE_API_ENDPOINT ?? "http://localhost:4000";

// get schema and store them as schema.json
console.log("Using VITE_API_ENDPOINT=" + graphQlEndpoint);
fetch(graphQlEndpoint + "/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: getIntrospectionQuery(),
  }),
})
  .then((result) => result.json())
  .then((result) => {
    const schema = JSON.stringify(result.data, null, 2);

    fs.mkdirSync(path.join(__dirname, "../src/__downloaded__/"), { recursive: true });
    fs.writeFileSync(path.join(__dirname, "../src/__downloaded__/schema.json"), schema);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
