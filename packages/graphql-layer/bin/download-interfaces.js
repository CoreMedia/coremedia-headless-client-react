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
}).then(result => result.json())
  .then(result => {
    const interfaces = {};

    result.data.__schema.types.forEach((type) => {
      if (type.interfaces) {
        interfaces[type.name] = type.interfaces.reverse().map((i) => i.name);
      }
    });

    // create folder if not exist
    fs.mkdir(path.join(__dirname, "../src/__downloaded__"), { recursive: true}, (err) => {
      fs.writeFile(path.join(__dirname, "../src/__downloaded__/interfaces.json"), JSON.stringify(interfaces), err => {
        if (err) {
          console.error("Error writing interfaces.json", err);
        } else {
          console.log("Interfaces successfully extracted!");
        }
      });
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
