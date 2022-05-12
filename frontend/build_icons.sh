#!/bin/bash

echo "START Build Icons"
node -v
npm -v
echo "Remove legacy icons"
rm -rf ./src/components/icons/build
wait
echo "Run svgr"
./node_modules/.bin/svgr --template ./src/components/icons/icon-template.js --typescript --out-dir ./src/components/icons/build ./src/components/icons/svg/**/*
wait
echo "create icons index"
node ./src/components/icons/index-template.js
wait
echo "Build Icons done"
