"use strict";
(() => {
  // src/app.ts
  var text = document.getElementById("notify-text");
  var notify = document.getElementById("notify-button");
  if (!text || !notify) {
    console.error("Error loading page elements");
  }
  notify.addEventListener("click", () => {
    chrome.runtime.sendMessage("", {
      type: "notification",
      message: text.value
    });
  });
})();
//# sourceMappingURL=app.js.map
