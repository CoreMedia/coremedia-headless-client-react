#!/bin/sh

if git diff --name-only HEAD@{1} HEAD | grep "^package.json" > /dev/null 2>&1 ; then
  echo "'package.json' has changed. Running 'pnpm install' to update your dependencies..."
  pnpm i
fi
