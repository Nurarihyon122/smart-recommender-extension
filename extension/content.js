function extractQuery() {
  // Try common product/movie title tags
  const title =
    document.querySelector("h1")?.innerText ||
    document.querySelector("[data-testid='hero-title-block__title']")?.innerText ||
    document.title;

  if (title) {
    chrome.runtime.sendMessage({
      type: "QUERY_EXTRACTED",
      query: title
    });
  }
}

// Run when page loads
window.addEventListener("load", extractQuery);

// Run when user navigates dynamically (SPA sites)
setInterval(extractQuery, 5000);
