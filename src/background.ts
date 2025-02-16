
interface MessageData {
  message: string;
  sender: chrome.runtime.MessageSender;
  sendResponse: Function;
}

chrome.runtime.onMessage.addListener((data: MessageData) => {
  console.log("Data", data)
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'better-bookmarks',
    title: "Add Bookmark",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if ('better-bookmarks' === info.menuItemId) {
    notify(tab?.url || "");
  }
});

const notify = (message: string) => {
  return chrome.notifications.create(
    '',
    {
      type: 'basic',
      title: 'Notify!',
      message: message || 'Notify!',
      iconUrl: '../icons/bookmark_icon_blue_48.png',
    }
  );
};
