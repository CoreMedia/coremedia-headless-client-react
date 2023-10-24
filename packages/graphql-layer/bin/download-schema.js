#!/usr/bin/env node

"use strict";

/*
 * This script downloads the schema.json from the graphql server
 */

const fs = require("node:fs");
const path = require("node:path");
const { getIntrospectionQuery } = require("graphql");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, '../../../apps/spark/.env') });

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
}).then(result => result.json())
  .then(result => {
    const schema = JSON.stringify(result.data, null, 2)

    // create folder if not exist
    fs.mkdir(path.join(__dirname, "../src/__downloaded__/"), { recursive: true}, () => {
      fs.writeFile(path.join(__dirname, "../src/__downloaded__/schema.json"), schema, err => {
        if (err) {
          console.error("Error writing schema.json", err);
        } else {
          console.log("Schema successfully downloaded!");
        }
      });
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
