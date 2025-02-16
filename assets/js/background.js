"use strict";
(() => {
  // src/background.ts
  chrome.runtime.onMessage.addListener((data) => {
    console.log("Data", data);
  });
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "better-bookmarks",
      title: "Add Bookmark",
      contexts: ["page"]
    });
  });
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if ("better-bookmarks" === info.menuItemId) {
      notify(tab?.url || "");
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
