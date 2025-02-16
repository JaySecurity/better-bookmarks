"use strict";
(() => {
  // src/app.ts
  var text = document.getElementById("search");
  var search = document.getElementById("search-btn");
  if (!text || !search) {
    console.error("Error loading page elements");
  }
  search.addEventListener("click", () => {
    chrome.bookmarks.getTree((res) => {
      const tree = res[0].children[0].children;
      if (tree && tree?.length > 0) {
        for (const node of tree) {
          console.log(node?.title == "" ? "Bookmarks" : `${node?.title} - ${node.id}`);
        }
      }
    });
  });
  chrome.runtime.sendMessage("Test Meaasge");
})();
//# sourceMappingURL=app.js.map
