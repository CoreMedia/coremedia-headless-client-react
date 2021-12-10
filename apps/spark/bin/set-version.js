#!/usr/bin/env node

"use strict";

const version = require("../../../package.json").version;
const fs = require("fs");
const path = require("path");

const versionFile = {
  "version": version
}

fs.mkdir(path.join(__dirname, "../src/__generated__"), { recursive: true}, (err) => {
  fs.writeFile(path.join(__dirname, "../src/__generated__/version.json"), JSON.stringify(versionFile), err => {
    if (err) {
      console.error("Error writing version.json", err);
    }
  });
});
