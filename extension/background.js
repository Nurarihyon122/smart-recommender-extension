const API_URL = "http://localhost:5000/recommend";

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "QUERY_EXTRACTED") {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: msg.query,
        domain: msg.domain
      })
    })
      .then(res => res.json())
      .then(data => sendResponse({ success: true, data }))
      .catch(() => sendResponse({ success: false, data: [] }));

    return true; // async response
  }
});
