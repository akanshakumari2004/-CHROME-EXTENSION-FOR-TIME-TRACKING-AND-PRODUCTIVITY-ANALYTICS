let currentTab = "";
let startTime = Date.now();

chrome.tabs.onActivated.addListener(activeInfo => {
  trackTime();
  chrome.tabs.get(activeInfo.tabId, tab => {
    currentTab = new URL(tab.url).hostname;
    startTime = Date.now();
  });
});

function trackTime() {
  const timeSpent = Date.now() - startTime;
  if (currentTab) {
    fetch("http://localhost:5000/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain: currentTab, timeSpent })
    });
  }
}
