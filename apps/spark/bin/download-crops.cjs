#!/usr/bin/env node

"use strict";

/*
 * This script fetches the available image crops from the graphql server
 */

const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");

dotenv.config();

// disable for self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const siteId = "ced8921aa7b7f9b736b90e19afc2dd2a"; // this is the siteid of calista
const graphQlEndpoint = process.env.VITE_API_ENDPOINT ?? "http://localhost:4000";

// get the image crops and store them as image-crops.json
console.log("Using VITE_API_ENDPOINT=" + graphQlEndpoint);
console.log("Using SiteID=" + siteId);
fetch(process.env.VITE_API_ENDPOINT+"/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    variables: { siteId },
    query: `
      query imageCrops($siteId: String!) {
        content {
          site(siteId: $siteId) {
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
