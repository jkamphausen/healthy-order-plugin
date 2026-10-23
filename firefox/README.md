# Healthy Order – Firefox extension (research prototype)

Sorts the category bar on ubereats.com from healthy (first) to unhealthy (last)
and reduces the colour saturation of the icons the less healthy a category is.
All changes happen locally in the browser. Not affiliated with Uber.

Identical in behaviour to `chrome/` (`content.js`, `scores.js`, `background.js` and the onboarding files are the same);
only the manifest is Firefox-specific.

## Onboarding and options page
On first install the add-on opens its onboarding page. It asks for consent and the three study fields
(user ID assigned by the study team, gender, age range), shows a summary and stores the values only after
confirmation. The data is kept in the add-on's local storage of this browser and is never sent anywhere
(`data_collection_permissions` stays `none`).

To view, change or delete the data later, open the options page:
`about:addons` → **Healthy Order** → **Preferences** (or **…** → **Manage** → **Preferences**).
Removing the add-on deletes the data as well. The sorting and desaturation work independently of the onboarding.

## Load temporarily (development)
1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Click **Load Temporary Add-on…** and select `firefox/manifest.json`.
3. The onboarding page opens automatically. Reload Uber Eats afterwards. The add-on stays active until Firefox restarts.

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
