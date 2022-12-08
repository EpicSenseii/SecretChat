const chatWindow = document.getElementById("chat-window");
const usernameInput = document.getElementById("username-input");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const input = document.getElementById("chat-input");

function getMessages() {
  let messages = localStorage.getItem("messages");
  if (messages) {
    return JSON.parse(messages);
  } else {
    return [];
  }
}

function displayMessages() {
  let messages = getMessages();
  let chatMessages = document.getElementById("chat-messages");
  chatMessages.innerHTML = "";
  for (let i = 0; i < messages.length; i++) {
    let message = messages[i];
    chatMessages.innerHTML += `<li>${message.username}: ${message.text}</li>`;
  }
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addMessage(message) {
  let messages = getMessages();
  messages.push(message);
  localStorage.setItem("messages", JSON.stringify(messages));
}

sendButton.addEventListener("click", () => {
  let username = usernameInput.value;
  let message = chatInput.value;
  if (username || message) {
    addMessage({ username, text: message });
    chatInput.value = "";
  }
});

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("send-button").click();
  }
});

setInterval(displayMessages, 1000);
