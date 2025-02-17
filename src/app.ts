const text = document.getElementById('search') as HTMLInputElement;
const search = document.getElementById('search-btn') as HTMLButtonElement;

// fetch from storage - User Tags, Id => tags map
let userTags, tagsMap, folders
fetchData()


if (!text || !search) {
  //process.exit()
  console.error("Error loading page elements")
}

search.addEventListener('click', () => {
  chrome.bookmarks.getTree(res => {
    // Fetch Main Bookmarks Node
    console.log(userTags, tagsMap)
    const tree = res[0]?.children?.[0]?.children
    if (tree && tree.length > 0) {
      for (const node of tree) {
        console.log(node?.title == "" ? "Bookmarks" : `${node?.title} - ${node.id}`)
      }
    }
  })
});

chrome.runtime.sendMessage("Test Meaasge")


async function fetchData() {
  const data = await Promise.all([
    chrome.storage.sync.get('userTags'),
    chrome.storage.sync.get('folders'),
    chrome.storage.sync.get('tagsMap')
  ])
  userTags = data[0].userTags || {}
  folders = data[1].folders
  tagsMap = data[1].tagsMap || {}
  // create folders array if not found
  if (!folders || !tagsMap) {
    const tree = await chrome.bookmarks.getTree()
    const bookmarks = tree[0]?.children?.[0]?.children
    if (!bookmarks) {
      return
    }
    folders = new Set()
    for (const node of bookmarks) {
      inspectNode(node)
    }
  }
  console.log(folders)
  console.log(tagsMap)
}

function inspectNode(node: chrome.bookmarks.BookmarkTreeNode) {
  if (node.hasOwnProperty('children')) {
    folders.add(node.title)
    for (const child of node?.children) {
      inspectNode(child)
    }
  } else {
    tagsMap[node.id] = []
  }
}
