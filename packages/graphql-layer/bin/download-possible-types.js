#!/usr/bin/env node

"use strict";

/*
 * This script fetches the possible type definitions from the graphql server
 * see https://www.apollographql.com/docs/react/v3.0-beta/data/fragments/#generating-possibletypes-automatically
 */

const fetch = require("cross-fetch");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, '../../../apps/spark/.env') });

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
}).then(result => result.json())
  .then(result => {
    const possibleTypes = {};

    result.data.__schema.types.forEach(supertype => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] =
          supertype.possibleTypes.map(subtype => subtype.name);
      }
    });

    // create folder if not exist
    fs.mkdir(path.join(__dirname, "../src/__downloaded__"), { recursive: true}, (err) => {
      fs.writeFile(path.join(__dirname, "../src/__downloaded__/possibleTypes.json"), JSON.stringify(possibleTypes), err => {
        if (err) {
          console.error("Error writing possibleTypes.json", err);
        } else {
          console.log("Fragment types successfully extracted!");
        }
      });
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
