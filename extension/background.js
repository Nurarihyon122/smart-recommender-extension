const API_URL = "http://localhost:5000/recommend";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "QUERY_EXTRACTED") {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: message.query
      })
    })
      .then(res => res.json())
      .then(data => {
        chrome.storage.local.set({ recommendations: data });
      })
      .catch(err => console.error("API Error:", err));
  }
});
