#!/usr/bin/env bash
# Builds release archives into dist/. Reads plugin folders, writes only to dist/.
# Usage: scripts/package.sh <tag>
set -euo pipefail
cd "$(dirname "$0")/.."

TAG="${1:?usage: scripts/package.sh <tag>}"
scripts/check.sh "$TAG"
V="${TAG#v}"

rm -rf dist && mkdir -p dist
(cd chrome  && zip -qrX "../dist/healthy-order-chrome-$V.zip"  . -x '.*' 'README.md')
(cd firefox && zip -qrX "../dist/healthy-order-firefox-$V.zip" . -x '.*' 'README.md')
(cd safari/extension && zip -qrX "../../dist/healthy-order-safari-extension-$V.zip" . -x '.*')
scripts/release-notes.sh "$TAG" > dist/RELEASE_NOTES.md

ls -1 dist
