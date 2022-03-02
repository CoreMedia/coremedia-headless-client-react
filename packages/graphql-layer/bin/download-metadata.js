#!/usr/bin/env node

"use strict";

/*
 * This script fetches the available interface definitions from the graphql server
 */

const fetch = require("cross-fetch");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, '../../../apps/spark/.env') });

// check for headless-server
if(process.env.REACT_APP_API_ENDPOINT === undefined) {
  console.log("Skip Download of interfaces.json. Environment variable REACT_APP_API_ENDPOINT is not set.");
  process.exit(0);
}

// disable for self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// get interfaces and store them as interfaces.json
console.log("Using REACT_APP_API_ENDPOINT=" + process.env.REACT_APP_API_ENDPOINT);
fetch(process.env.REACT_APP_API_ENDPOINT+"/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    variables: {},
    query: `{
  metadata {
    types {
      name
      fields {
        name
        metadata
      }
    }
  }
}`,
  }),
}).then(result => result.json())
  .then(result => {
    let metadata = {};

    // transform the result into an easy-to-use map
    result.data.metadata.types.forEach((type) => {
      if (type.name) {
        let mappings = {};
        type.fields.forEach((mapping) => {
          if(mapping.metadata !== null) {
            mappings[mapping.name] = mapping.metadata.mapping;
          }
        });
        if(Object.keys(mappings).length > 0) {
          metadata[type.name] = mappings;
        }
      }
    });

    // create folder if not exist
    fs.mkdir(path.join(__dirname, "../src/__downloaded__"), { recursive: true}, (err) => {
      fs.writeFile(path.join(__dirname, "../src/__downloaded__/metadata.json"), JSON.stringify(metadata), err => {
        if (err) {
          console.error("Error writing metadata.json", err);
        } else {
          console.log("metadata mapping successfully extracted!");
        }
      });
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
