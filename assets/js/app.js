"use strict";
(() => {
  // src/app.ts
  var text = document.getElementById("search");
  var search = document.getElementById("search-btn");
  var userTags;
  var tagsMap;
  var folders;
  fetchData();
  if (!text || !search) {
    console.error("Error loading page elements");
  }
  search.addEventListener("click", () => {
    chrome.bookmarks.getTree((res) => {
      console.log(userTags, tagsMap);
      const tree = res[0]?.children?.[0]?.children;
      if (tree && tree.length > 0) {
        for (const node of tree) {
          console.log(node?.title == "" ? "Bookmarks" : `${node?.title} - ${node.id}`);
        }
      }
    });
  });
  chrome.runtime.sendMessage("Test Meaasge");
  async function fetchData() {
    const data = await Promise.all([
      chrome.storage.sync.get("userTags"),
      chrome.storage.sync.get("folders"),
      chrome.storage.sync.get("tagsMap")
    ]);
    userTags = data[0].userTags || {};
    folders = data[1].folders;
    tagsMap = data[1].tagsMap || {};
    if (!folders || !tagsMap) {
      const tree = await chrome.bookmarks.getTree();
      const bookmarks = tree[0]?.children?.[0]?.children;
      if (!bookmarks) {
        return;
      }
      folders = /* @__PURE__ */ new Set();
      for (const node of bookmarks) {
        inspectNode(node);
      }
    }
    console.log(folders);
    console.log(tagsMap);
  }
  function inspectNode(node) {
    if (node.hasOwnProperty("children")) {
      folders.add(node.title);
      for (const child of node?.children) {
        inspectNode(child);
      }
    } else {
      tagsMap[node.id] = [];
    }
  }
})();
//# sourceMappingURL=app.js.map
