#!/usr/bin/env node

/* inspired by https://github.com/pnpm/only-allow */

const wantedPM = "pnpm";
const usedPM = pmFromUserAgent(process.env.npm_config_user_agent);

function pmFromUserAgent (userAgent) {
  const pmSpec = userAgent.split(' ')[0]
  const separatorPos = pmSpec.lastIndexOf('/')
  return pmSpec.substr(0, separatorPos);
}

if (usedPM !== wantedPM) {
  console.error('\nUse "pnpm install" for installation in this workspace.\n\n' +
    'If you don\'t have pnpm, install it via "npm i -g pnpm@7".\n' +
    'For more details, go to https://pnpm.io/\n');
  process.exit(1);
}
