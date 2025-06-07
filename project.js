const promptForm = document.querySelector(".prompt-form");
const promptInput = promptForm.querySelector(".prompt-input");
const chatsContainer = document.querySelector(".chats-container");
const container = document.querySelector(".container");
const fileInput = promptForm.querySelector("#file-input");
const fileUploadWrapper = promptForm.querySelector(".file-upload-wrapper");
const previewImg = promptForm.querySelector(".file-preview");

const API_KEY = "AIzaSyB3d-SZxIeFbXd3bBrD9gbstQbMzcJS5Ss";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const userData = { message: "", file: {} };
const chatHistory = [];

const createMsgElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

const scrollToBottom = () => {
  container.scrollTo({
    top: container.scrollHeight,
    behavior: "smooth"
  });
};

const typingEffect = (text, textElement, botMsgDiv) => {
  textElement.textContent = "";
  const words = text.split(" ");
  let index = 0;
  const interval = setInterval(() => {
    if (index < words.length) {
      textElement.textContent += (index > 0 ? " " : "") + words[index++];
      botMsgDiv.classList.remove("loading");
      scrollToBottom();
    } else {
      clearInterval(interval);
    }
  }, 40);
};

const generateResponse = async (botMsgDiv) => {
  const textElement = botMsgDiv.querySelector(".message-text");
  const userMessage = userData.message;

  const filePart = userData.file.data ? [{
    inline_data: (({ fileName, isImage, ...rest }) => rest)(userData.file)
  }] : [];

  chatHistory.push({
    role: "user",
    parts: [{ text: userMessage }, ...filePart]
  });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: chatHistory })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message);

    const responseText = data.candidates[0].content.parts[0].text
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .trim();

    typingEffect(responseText, textElement, botMsgDiv);
    chatHistory.push({ role: "model", parts: [{ text: responseText }] });
    console.log(chatHistory);
  } catch (error) {
    console.error("API Error:", error.message);
    textElement.textContent = " Error: " + error.message;
    botMsgDiv.classList.remove("loading");
  } finally {
    userData.file = {};
  }
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  const userMessage = promptInput.value.trim();
  if (!userMessage) return;

  promptInput.value = "";
  userData.message = userMessage;

  const userMsgDiv = createMsgElement(`<p class="message-text">${userMessage}</p>`, "user-message");
  chatsContainer.appendChild(userMsgDiv);
  scrollToBottom();

  setTimeout(() => {
    const botMsgDiv = createMsgElement(`
      <img src="logo.png" class="avatar">
      <p class="message-text">Just a sec...</p>`, "bot-message", "loading");
    chatsContainer.appendChild(botMsgDiv);
    scrollToBottom();
    generateResponse(botMsgDiv);
  }, 600);
};

// Handle file input change
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const isImage = file.type.startsWith("image/");
  const reader = new FileReader();

  reader.onload = (e) => {
    const base64String = e.target.result.split(",")[1];
    userData.file = {
      fileName: file.name,
      data: base64String,
      mime_type: file.type,
      isImage
    };

    if (previewImg) {
      previewImg.src = e.target.result;
      previewImg.style.display = "block";
    }

    fileUploadWrapper.classList.add("active", isImage ? "img-attached" : "file-attached");
  };

  reader.readAsDataURL(file);
});

// Cancel file upload
document.getElementById("cancel-file-btn").addEventListener("click", () => {
  fileInput.value = "";
  userData.file = {};

  if (previewImg) {
    previewImg.src = "#";
    previewImg.style.display = "none";
  }

  fileUploadWrapper.classList.remove("active", "img-attached", "file-attached");
});

// Attach event listeners
promptForm.addEventListener("submit", handleFormSubmit);
document.getElementById("add-file-btn").addEventListener("click", () => fileInput.click());

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("prompt-input");
  const sendBtn = document.getElementById("send-prompt-btn");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const body = document.body;

  input.addEventListener("input", () => {
    sendBtn.style.display = input.value.trim() ? "block" : "none";
  });

  themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    themeToggleBtn.textContent = body.classList.contains("light-theme")
      ? "dark_mode"
      : "light_mode";
  });
});
