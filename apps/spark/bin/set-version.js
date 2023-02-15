#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const version = require("../../../package.json").version;

require('dotenv').config();

const versionFile = {
  "version": version + ((process.env.VITE_CAMPAIGN_ENABLED === "true") ? " with campaigns" : "")
}

fs.mkdir(path.join(__dirname, "../src/__generated__"), { recursive: true}, () => {
  fs.writeFile(path.join(__dirname, "../src/__generated__/version.json"), JSON.stringify(versionFile), err => {
    if (err) {
      console.error("Error writing version.json", err);
    }
  });
});
