let overlay = null;
let lastUrl = location.href;
let alive = true;

/* ---------- SAFE CHECK ---------- */
function extensionAlive() {
  try {
    return !!chrome.runtime?.id;
  } catch {
    return false;
  }
}

/* ---------- DOMAIN TYPE ---------- */
function getDomainType() {
  const h = location.hostname;
  if (h.includes("youtube")) return "video";
  if (h.includes("imdb") || h.includes("netflix")) return "movie";
  if (h.includes("amazon") || h.includes("flipkart")) return "product";
  return null;
}

/* ---------- EXTRACT QUERY ---------- */
function extractQuery(domain) {
  try {
    if (domain === "video") {
      return (
        document.querySelector("h1 yt-formatted-string")?.innerText ||
        document.title.replace("- YouTube", "")
      );
    }
    if (domain === "movie") {
      return document.querySelector("h1")?.innerText || document.title;
    }
    if (domain === "product") {
      return (
        document.getElementById("productTitle")?.innerText ||
        document.querySelector("h1")?.innerText
      );
    }
  } catch {}
  return null;
}

/* ---------- OVERLAY ---------- */
function showOverlay(items) {
  if (!items || items.length === 0 || !alive) return;

  overlay?.remove();

  overlay = document.createElement("div");
  overlay.id = "smart-recommender-overlay";

  overlay.innerHTML = `
    <h4>Recommended for you</h4>
    <ul>
      ${items.map(i => `<li>${i.title || i.name}</li>`).join("")}
    </ul>
  `;

  document.body.appendChild(overlay);
}

/* ---------- CORE ---------- */
function run() {
  if (!alive || !extensionAlive()) return;

  let domain;
  try {
    domain = getDomainType();
  } catch {
    return;
  }

  if (!domain) return;

  const query = extractQuery(domain);
  if (!query) return;

  try {
    chrome.runtime.sendMessage(
      { type: "QUERY_EXTRACTED", query, domain },
      (response) => {
        if (!alive || !extensionAlive()) return;
        if (response?.success) {
          showOverlay(response.data);
        }
      }
    );
  } catch {
    shutdown();
  }
}

/* ---------- SHUTDOWN ---------- */
function shutdown() {
  alive = false;
  overlay?.remove();
  observer.disconnect();
}

/* ---------- SPA OBSERVER ---------- */
const observer = new MutationObserver(() => {
  if (!alive || !extensionAlive()) {
    shutdown();
    return;
  }

  if (location.href !== lastUrl) {
    lastUrl = location.href;
    overlay?.remove();
    setTimeout(run, 800);
  }
});

try {
  observer.observe(document.body, { childList: true, subtree: true });
} catch {
  shutdown();
}

/* ---------- INITIAL ---------- */
setTimeout(run, 1500);
