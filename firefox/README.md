# Healthy Order – Firefox extension (research prototype)

Sorts the category bar on ubereats.com from healthy (first) to unhealthy (last)
and reduces the colour saturation of the icons the less healthy a category is.
All changes happen locally in the browser. No data is collected. Not affiliated with Uber.

Identical in behaviour to `chrome/` (`content.js` and `scores.js` are the same); only the manifest is Firefox-specific.

## Load temporarily (development)
1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Click **Load Temporary Add-on…** and select `firefox/manifest.json`.
3. Reload Uber Eats. The add-on stays active until Firefox restarts.

## Install permanently (study)
Firefox requires signed add-ons. Sign without a store listing using `web-ext`:
```
npx web-ext sign --source-dir firefox --channel unlisted --api-key … --api-secret …
```
The resulting `.xpi` can be distributed to participants and installed by double-clicking.
Minimum version Firefox 140 (because of `data_collection_permissions`).

## Customising
- Scores and saturation strength: `scores.js`
- After changes, click **Reload** in `about:debugging` and reload the page.
