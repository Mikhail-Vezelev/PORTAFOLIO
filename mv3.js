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
 
//cahtbot
function addMessage(sender, text) {
  const p = document.createElement("p");
  p.innerText = `${sender}: ${text}`;
  chatbox.appendChild(p);
  chatbox.scrollTop = chatbox.scrollHeight;
}

if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    const text = input.value;
    if (!text) return;

    addMessage("Tú", text);
    input.value = "";

    // CAMBIAR LA URL!!!!!
    fetch("https://chatbot-api-production-547f.up.railway.app/weatherforecast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    })
    .then(res => res.json())
    .then(data => {
      addMessage("Bot", data.reply);
    })
    .catch(() => {
      addMessage("Bot", "Error al conectar con el servidor.");
    });
  });
}
