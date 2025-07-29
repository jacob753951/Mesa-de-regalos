const entrada = document.getElementById("entrada");
const botonAñadir = document.getElementById("añadir");
const lista = document.getElementById("lista");

botonAñadir.addEventListener("click", () => {
  const texto = entrada.value.trim();
  if (texto === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    ${texto}
    <button class="eliminar">Eliminar</button>
  `;

  lista.appendChild(li);
  entrada.value = "";

  li.querySelector(".eliminar").addEventListener("click", () => {
    const clave = prompt("Introduce la contraseña para eliminar este regalo:");
    if (clave === "1234") {
      lista.removeChild(li);
    } else {
      alert("Contraseña incorrecta. No se eliminó el regalo.");
    }
  });
});
