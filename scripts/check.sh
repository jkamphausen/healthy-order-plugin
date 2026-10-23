#!/usr/bin/env bash
# Consistency checks for all plugins. Read-only.
# Usage: scripts/check.sh            -> parity + manifest checks
#        scripts/check.sh <tag>      -> additionally checks versions and CHANGELOG for a release tag
set -euo pipefail
cd "$(dirname "$0")/.."

TAG="${1:-}"
fail() { echo "FAIL: $*" >&2; exit 1; }

MANIFESTS=(chrome/manifest.json firefox/manifest.json safari/extension/manifest.json)
SHARED=(content.js scores.js onboarding.html onboarding.js onboarding.css background.js)

# 1. Manifests are valid JSON and contain no Uber trademark in the name
for m in "${MANIFESTS[@]}"; do
  python3 -c "import json,sys; d=json.load(open('$m')); sys.exit('uber' in d['name'].lower())" \
    || fail "$m is invalid JSON or uses 'Uber' in its name"
done

# 2. Shared code is byte-identical across plugins (feature parity)
for f in "${SHARED[@]}"; do
  cmp -s "chrome/$f" "firefox/$f"          || fail "firefox/$f differs from chrome/$f"
  cmp -s "chrome/$f" "safari/extension/$f" || fail "safari/extension/$f differs from chrome/$f"
done

# 3. All manifests carry the same version
version_of() { python3 -c "import json; print(json.load(open('$1'))['version'])"; }
V_CHROME=$(version_of chrome/manifest.json)
for m in "${MANIFESTS[@]}"; do
  [ "$(version_of "$m")" = "$V_CHROME" ] || fail "$m version $(version_of "$m") != chrome $V_CHROME"
done

# 4. Release checks
if [ -n "$TAG" ]; then
  [[ "$TAG" =~ ^v([0-9]+)\.([0-9]+)\.([0-9]+)(-(alpha|beta|rc)\.([0-9]+))?$ ]] \
    || fail "tag '$TAG' does not match vMAJOR.MINOR.PATCH[-alpha|beta|rc.N]"
  BASE="${BASH_REMATCH[1]}.${BASH_REMATCH[2]}.${BASH_REMATCH[3]}"
  FULL="${TAG#v}"
  [ "$V_CHROME" = "$BASE" ] || fail "manifest version $V_CHROME != $BASE (from $TAG)"
  VN=$(python3 -c "import json; print(json.load(open('chrome/manifest.json')).get('version_name',''))")
  [ "$VN" = "$FULL" ] || fail "chrome version_name '$VN' != '$FULL'"
  grep -q "^## \[$FULL\]" CHANGELOG.md || fail "CHANGELOG.md has no section '## [$FULL]'"
fi

echo "OK${TAG:+ ($TAG)}: manifests valid, code identical, version $V_CHROME"
