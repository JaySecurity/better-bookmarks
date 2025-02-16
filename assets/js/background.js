"use strict";
(() => {
  // src/background.ts
  chrome.runtime.onMessage.addListener((data) => {
    if (data.type === "notification") {
      notify(data.message);
    }
  });
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "notify",
      title: "Notify!: %s",
      contexts: ["selection"]
    });
  });
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log(tab);
    if ("notify" === info.menuItemId) {
      notify(info.selectionText);
    }
  });
  var notify = (message) => {
    return chrome.notifications.create(
      "",
      {
        type: "basic",
        title: "Notify!",
        message: message || "Notify!",
        iconUrl: "../icons/bookmark_icon_blue_48.png"
      }
    );
  };
})();
//# sourceMappingURL=background.js.map
