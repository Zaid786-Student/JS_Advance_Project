const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const msg = userInput.value.trim();
  if (msg === "") return;

  appendMessage("user", msg);
  userInput.value = "";

  setTimeout(() => {
    const botReply = getBotReply(msg);
    appendMessage("bot", botReply);
  }, 800);
}

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight; // auto-scroll
}

function getBotReply(userMsg) {
  const replies = [
    "Hello! 👋",
    "How are you today?",
    "That's interesting!",
    "Can you tell me more?",
    "Haha, nice one 😄",
    "I’m just a dummy bot 🤖"
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}
