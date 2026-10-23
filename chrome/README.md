# Healthy Order – Chrome extension (research prototype)

Research prototype of a browser extension that sorts the category bar on ubereats.com from healthy (first) to unhealthy (last). The less healthy a category is, the less colourful its icon is shown.

All changes happen locally in the browser. The project is not affiliated with Uber.

This is the reference implementation for `firefox/` and `safari/` (see `AGENTS.md`).

## Installation

1. Clone the repo or unpack the ZIP.
2. Open `chrome://extensions` and turn on **Developer mode** (top right).
3. Click **Load unpacked** and select the `chrome/` folder.
4. Reload ubereats.com.

## Files

| File | Purpose |
|---|---|
| `manifest.json` | Extension manifest; runs only on `https://www.ubereats.com/*` |
| `scores.js` | Health score per category (0 = healthy, 10 = unhealthy) and strength of the desaturation |
| `content.js` | Finds the category bar, sorts it and applies the saturation filter; re-applies both after the page re-renders |

## Customising

Change scores and desaturation in `scores.js`. Then click ↻ on the extension in `chrome://extensions` and reload the page. Categories without an entry get a score of 5.

The scores are a rough estimate, not a validated nutrition scale.

## Known limitations

- The bar is detected by English category names. With a German UI the plugin does not take effect.
- Uber Eats uses obfuscated CSS classes and can change the page structure at any time.
- Only the visible icon bar is modified.

## Note

Before use with participants, data protection, ethics approval and legal questions must be resolved (see `ROADMAP.md`).
