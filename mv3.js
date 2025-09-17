// Cambiar entre pestañas y archivos
const tabs = document.querySelectorAll(".tab");
const files = document.querySelectorAll(".file");
const explorerItems = document.querySelectorAll(".explorer li");

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
