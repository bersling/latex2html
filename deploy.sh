#!/usr/bin/env bash

rootdir="latex2html"
server="ubuntu@35.158.213.131"

# compile
tsc

echo "Upload contents"
rsync -avz --delete -e 'ssh' "./" "${server}:${rootdir}"

echo "(Re-)Start server"
ssh ${server} "forever stop ${rootdir}/dist/server.js"
ssh ${server} "forever start ${rootdir}/dist/server.js"

echo "Done!"
