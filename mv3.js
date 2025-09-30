// Cambiar entre pestañas y archivos
const tabs = document.querySelectorAll(".tab");
const files = document.querySelectorAll(".file");
const explorerItems = document.querySelectorAll(".explorer li");
const chatbox = document.getElementById("chatbox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function showFile(fileId) {
  // Quitar activo de pestañas
  tabs.forEach(tab => tab.classList.remove("active"));
  explorerItems.forEach(item => item.classList.remove("active"));
  files.forEach(file => file.classList.remove("active"));

  // Activar el correcto
  document.querySelector(`.tab[data-file="${fileId}"]`).classList.add("active");
  document.querySelector(`.explorer li[data-file="${fileId}"]`).classList.add("active");
  document.getElementById(fileId).classList.add("active");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    showFile(tab.dataset.file);
  });
});

explorerItems.forEach(item => {
  item.addEventListener("click", () => {
    showFile(item.dataset.file);
  });
});

// Chatbot
function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${sender === "Tú" ? "user" : "bot"}`;
  messageDiv.innerHTML = `<strong>${sender}</strong>${text}`;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage("Tú", text);
    input.value = "";

    // CAMBIAR LA URL SI ES NECESARIO
    fetch("https://chatbotapi2-16.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    })
    .then(res => res.json())
    .then(data => {
      addMessage("Bot", data.reply);
    })
    .catch(error => {
      console.error("Error:", error);
      addMessage("Bot", "Error al conectar con el servidor.");
    });
  });
}

// Permitir enviar con Enter
if (input) {
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  });
}