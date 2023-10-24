#!/usr/bin/env node
const { rmSync, unlinkSync } = require("node:fs");

const isUsingPnpm = process.env.npm_config_user_agent?.startsWith('pnpm');
const isUsingNpm = process.env.npm_config_user_agent?.startsWith('npm');
const isUsingYarn = process.env.npm_config_user_agent?.startsWith('yarn');

if (!isUsingPnpm) {
  console.error('\nUse "pnpm install" for installation in this workspace.\n\n' +
    'If you don\'t have pnpm, install it via "npm i -g pnpm@8".\n' +
    'For more details, go to https://pnpm.io/\n');
  rmSync('node_modules', { recursive: true, force: true });
  if (isUsingNpm) unlinkSync('package-lock.json');
  if (isUsingYarn) unlinkSync('yarn.lock');
  process.exit(1);
}
