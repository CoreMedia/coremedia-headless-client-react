#!/usr/bin/env node

"use strict";

/*
 * This script fetches the available image crops from the graphql server
 */

const fetch = require("cross-fetch");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const siteId = "ced8921aa7b7f9b736b90e19afc2dd2a"; // this is the siteid of calista

dotenv.config();

// check for headless-server
if (process.env.REACT_APP_API_ENDPOINT === undefined) {
  console.log(
    "Skip Download of image-crops.json. Environment variable REACT_APP_API_ENDPOINT is not set."
  );
  process.exit(0);
}

// disable for self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// get the image crops and store them as image-crops.json
console.log(
  "Using REACT_APP_API_ENDPOINT=" + process.env.REACT_APP_API_ENDPOINT
);
console.log(
  "Using SiteID=" + siteId
);
fetch(process.env.REACT_APP_API_ENDPOINT+"/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    variables: { siteId },
    query: `
      query imageCrops($siteId: String!) {
        content {
          site(id: $siteId) {
            crops {
              name
              aspectRatio {
                width
                height
              }
              sizes {
                width
                height
              }
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    const crops = result.data.content.site.crops;
    // create folder if not exist
    fs.mkdir(
      path.join(__dirname, "../src/__downloaded__"),
      { recursive: true },
      (err) => {
        fs.writeFile(
          path.join(__dirname, "../src/__downloaded__/image-crops.json"),
          JSON.stringify(crops),
          (err) => {
            if (err) {
              console.error("Error writing image-crops.json", err);
            } else {
              console.log("Image-crops successfully extracted!");
            }
          }
        );
      }
    );
  })
  .catch((error) => {
    console.error('Error:', error);
  });
