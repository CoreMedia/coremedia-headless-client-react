#!/usr/bin/env node

"use strict";

/*
 * This script downloads the schema.json from the graphql server
 */

const dotenv = require("dotenv");
const { exec } = require("child_process");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, '../../../apps/spark/.env') });

// check for headless-server
if(process.env.REACT_APP_API_ENDPOINT === undefined) {
  console.log("Skip Download of schema.json. Environment variable REACT_APP_API_ENDPOINT is not set.");
  process.exit(0);
}

// disable for self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// get schema.json using apollo cli
console.log("Using REACT_APP_API_ENDPOINT=" + process.env.REACT_APP_API_ENDPOINT);
exec(`apollo client:download-schema ./src/__downloaded__/schema.json --endpoint ${process.env.REACT_APP_API_ENDPOINT+"/graphql"}`, (err, stdout, stderr) => {
  if (err) {
    console.log(`Error: ${stderr}`);
  }
  console.log(stdout);
})
