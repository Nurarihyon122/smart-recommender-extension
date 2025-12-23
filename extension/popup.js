document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("recommendations", (data) => {
    const list = document.getElementById("recommendations");
    list.innerHTML = "";

    if (!data.recommendations) {
      list.innerHTML = "<li>No data yet</li>";
      return;
    }

    data.recommendations.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item.title || item.name;
      list.appendChild(li);
    });
  });
});
