"use strict";
(() => {
  // src/app.ts
  var text = document.getElementById("search");
  var search = document.getElementById("search-btn");
  var userTags;
  var tagsFromId;
  var folders;
  fetchData();
  if (!text || !search) {
    console.error("Error loading page elements");
  }
  text.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      chrome.bookmarks.search(text.value, (results) => {
        addResults(results);
      });
    }
  });
  search.addEventListener("click", () => {
    chrome.bookmarks.search(text.value, (results) => {
      addResults(results);
    });
  });
  async function fetchData() {
    const data = await Promise.all([
      chrome.storage.sync.get("userTags"),
      chrome.storage.sync.get("folders"),
      chrome.storage.sync.get("tagsMap")
    ]);
    userTags = data[0].userTags || {};
    folders = data[1].folders;
    tagsFromId = data[2].tagsMap || {};
    console.log(userTags);
    console.log(tagsFromId);
    console.log(folders);
    if (!folders || !tagsFromId) {
      const tree = await chrome.bookmarks.getTree();
      const bookmarks = tree[0]?.children?.[0]?.children;
      if (!bookmarks) {
        return;
      }
      folders = /* @__PURE__ */ new Set();
      for (const node of bookmarks) {
        inspectNode(node);
      }
      chrome.storage.sync.set({ userTags });
      chrome.storage.sync.set({ folders: Array.from(folders) });
      chrome.storage.sync.set({ tagsMap: tagsFromId });
    }
  }
  function inspectNode(node) {
    if (node.children && node.children?.length > 0) {
      folders.add(node.title);
      for (const child of node.children) {
        inspectNode(child);
      }
    } else {
      tagsFromId[node.id] = [];
    }
  }
  function addResults(results) {
    for (const result of results) {
      const { id, title, url } = result;
      if (title && url) {
        const wrapper = document.createElement("div");
        const topRow = document.createElement("div");
        const titleEl = document.createElement("p");
        const btns = document.createElement("div");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        wrapper.dataset.tooltip = url;
        wrapper.tags = getTagsById(id);
        wrapper.classList.add("result-div");
        topRow.classList.add("top-row");
        btns.classList.add("btns");
        topRow.appendChild(titleEl);
        topRow.appendChild(btns);
        titleEl.classList.add("result-title");
        titleEl.innerText = title;
        editBtn.classList.add("button", "primary", "edit");
        editBtn.innerText = "Edit";
        deleteBtn.classList.add("button", "delete");
        deleteBtn.innerText = "Delete";
        btns.appendChild(editBtn);
        btns.appendChild(deleteBtn);
        wrapper.appendChild(topRow);
        if (wrapper.tags.length > 0) {
          console.log(wrapper.tags);
          const tagsRow = document.createElement("div");
          tagsRow.classList.add("tags-row");
          for (const tag of wrapper.tags) {
            const tagEl = document.createElement("span");
            tagEl.innerText = tag;
            tagsRow.appendChild(tagEl);
          }
          wrapper.appendChild(tagsRow);
        }
        wrapper.addEventListener("click", () => {
          chrome.tabs.create({ url });
        });
        wrapper.addEventListener("mouseenter", () => {
          wrapper.timeout = setTimeout(() => {
            wrapper.style.setProperty("--tooltip-content", `'${wrapper.dataset.tooltip}'`);
            wrapper.classList.add("show");
          }, 500);
        });
        wrapper.addEventListener("mouseleave", () => {
          clearTimeout(wrapper.timeout);
          wrapper.classList.remove("show");
        });
        document.getElementById("results")?.appendChild(wrapper);
      }
    }
  }
  function getTagsById(id) {
    return tagsFromId[id] || [];
  }
})();
//# sourceMappingURL=app.js.map
