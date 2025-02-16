

const text = document.getElementById('notify-text') as HTMLInputElement;
const notify = document.getElementById('notify-button') as HTMLButtonElement;


if (!text || !notify) {
  //process.exit()
  console.error("Error loading page elements")
}

notify.addEventListener('click', () => {
  chrome.runtime.sendMessage('', {
    type: 'notification',
    message: text.value
  });
});


