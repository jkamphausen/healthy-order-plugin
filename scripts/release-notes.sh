#!/usr/bin/env bash
# Prints the CHANGELOG section for a tag, followed by install notes.
# Usage: scripts/release-notes.sh <tag>
set -euo pipefail
cd "$(dirname "$0")/.."

TAG="${1:?usage: scripts/release-notes.sh <tag>}"
V="${TAG#v}"

awk -v v="$V" '
  $0 ~ "^## \\[" v "\\]" { on=1; next }
  on && /^## \[/        { exit }
  on                    { print }
' CHANGELOG.md

cat <<NOTES

---
**Downloads**
- \`healthy-order-chrome-$V.zip\` – unpack, then *Load unpacked* in \`chrome://extensions\` (Developer mode).
- \`healthy-order-firefox-$V.zip\` – load via \`about:debugging\`, or sign with \`web-ext sign --channel unlisted\` for permanent install.
- \`healthy-order-safari-extension-$V.zip\` – web extension source; build the app with Xcode (see \`safari/README.md\`).

Research prototype. Not affiliated with Uber.
NOTES
