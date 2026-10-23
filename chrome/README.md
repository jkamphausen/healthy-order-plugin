# Healthy Order – Chrome extension (research prototype)

Research prototype of a browser extension that sorts the category bar on ubereats.com from healthy (first) to unhealthy (last). The less healthy a category is, the less colourful its icon is shown.

All changes happen locally in the browser. The project is not affiliated with Uber.

This is the reference implementation for `firefox/` and `safari/` (see `AGENTS.md`).

## Installation

1. Clone the repo or unpack the ZIP.
2. Open `chrome://extensions` and turn on **Developer mode** (top right).
3. Click **Load unpacked** and select the `chrome/` folder.
4. The onboarding page opens automatically on first install (consent notice, user ID, gender, age range).
5. Reload ubereats.com.

## Onboarding and options page

On first install the extension opens its onboarding page. It asks for consent and the three study
fields (user ID assigned by the study team, gender, age range), shows a summary and stores the values
only after confirmation. The data is kept in `chrome.storage.local` of this browser and is never sent anywhere.

To view, change or delete the data later, open the options page:
`chrome://extensions` → **Healthy Order** → **Details** → **Extension options**
(or right-click the extension icon → **Options**). Uninstalling the extension deletes the data as well.

The sorting and desaturation on ubereats.com work independently of the onboarding.

## Files

| File | Purpose |
|---|---|
| `manifest.json` | Extension manifest; runs only on `https://www.ubereats.com/*` |
| `scores.js` | Health score per category (0 = healthy, 10 = unhealthy) and strength of the desaturation |
| `content.js` | Finds the category bar, sorts it and applies the saturation filter; re-applies both after the page re-renders |
| `background.js` | Service worker; opens the onboarding page once after installation |
| `onboarding.html/.css/.js` | Onboarding and options page: consent, user ID, gender, age range; stored in `chrome.storage.local` |

## Customising

Change scores and desaturation in `scores.js`. Then click ↻ on the extension in `chrome://extensions` and reload the page. Categories without an entry get a score of 5.

The scores are a rough estimate, not a validated nutrition scale.

## Known limitations

- The bar is detected by English category names. With a German UI the plugin does not take effect.
- Uber Eats uses obfuscated CSS classes and can change the page structure at any time.
- Only the visible icon bar is modified.

## Note

Before use with participants, data protection, ethics approval and legal questions must be resolved (see `ROADMAP.md`).
