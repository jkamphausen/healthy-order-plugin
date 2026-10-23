// Opens the onboarding page once, right after the extension is installed.
// Later it is reachable as the extension's options page.
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason !== "install") return;
  chrome.runtime.openOptionsPage().catch(() => {
    chrome.tabs.create({ url: chrome.runtime.getURL("onboarding.html") });
  });
});
