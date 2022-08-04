#!/usr/bin/env node

"use strict";

/*
 * This script downloads the schema.json from the graphql server
 */

const dotenv = require("dotenv");
const path = require("path");
const fetch = require("cross-fetch");
const fs = require("fs");
const { getIntrospectionQuery } = require("graphql");

dotenv.config({ path: path.resolve(__dirname, '../../../apps/spark/.env') });

// check for headless-server
if(process.env.REACT_APP_API_ENDPOINT === undefined) {
  console.log("Skip Download of schema.json. Environment variable REACT_APP_API_ENDPOINT is not set.");
  process.exit(0);
}

// disable for self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// get schema.json using apollo cli
console.log("Using NEXT_PUBLIC_REACT_APP_API_ENDPOINT=" + process.env.REACT_APP_API_ENDPOINT);
fetch(process.env.REACT_APP_API_ENDPOINT+"/graphql", {
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
