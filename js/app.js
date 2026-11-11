// ===== Referencias al DOM =====
const formulario = document.getElementById("form-tarea");
const inputTarea = document.getElementById("input-tarea");
const mensajeError = document.getElementById("mensaje-error");
const listaTareas = document.getElementById("lista-tareas");
const mensajeVacio = document.getElementById("vacio");

const spanTotal = document.getElementById("total");
const spanCompletadas = document.getElementById("completadas");
const spanPendientes = document.getElementById("pendientes");
const barraProgreso = document.getElementById("barra-progreso");

// ===== Estado =====
let tareas = [];
let siguienteId = 1;

// ===== Funciones =====
function agregarTarea(texto) {
  tareas.push({ id: siguienteId++, texto: texto, completada: false });
  render();
}

function completarTarea(id) {
  const tarea = tareas.find(function (t) {
    return t.id === id;
  });
  if (tarea) {
    tarea.completada = true;
    render();
  }
}

function eliminarTarea(id) {
  tareas = tareas.filter(function (t) {
    return t.id !== id;
  });
  render();
}

function crearElementoTarea(tarea) {
  const li = document.createElement("li");
  li.className = "tarea" + (tarea.completada ? " completada" : "");

  const texto = document.createElement("span");
  texto.className = "texto";
  texto.textContent = (tarea.completada ? "[x] " : "[ ] ") + tarea.texto;

  const acciones = document.createElement("div");
  acciones.className = "acciones";

  const btnCompletar = document.createElement("button");
  btnCompletar.type = "button";
  btnCompletar.className = "btn btn-completar";
  btnCompletar.textContent = "Completar";
  btnCompletar.disabled = tarea.completada;
  btnCompletar.addEventListener("click", function () {
    completarTarea(tarea.id);
  });

  const btnEliminar = document.createElement("button");
  btnEliminar.type = "button";
  btnEliminar.className = "btn btn-eliminar";
  btnEliminar.textContent = "Eliminar";
  btnEliminar.addEventListener("click", function () {
    eliminarTarea(tarea.id);
  });

  acciones.appendChild(btnCompletar);
  acciones.appendChild(btnEliminar);
  li.appendChild(texto);
  li.appendChild(acciones);

  return li;
}

function actualizarContador() {
  const total = tareas.length;
  const completadas = tareas.filter(function (t) {
    return t.completada;
  }).length;

  spanTotal.textContent = total;
  spanCompletadas.textContent = completadas;
  spanPendientes.textContent = total - completadas;

  const porcentaje = total === 0 ? 0 : (completadas / total) * 100;
  barraProgreso.style.width = porcentaje + "%";
}

function render() {
  listaTareas.innerHTML = "";
  tareas.forEach(function (tarea) {
    listaTareas.appendChild(crearElementoTarea(tarea));
  });
  mensajeVacio.style.display = tareas.length === 0 ? "block" : "none";
  actualizarContador();
}

// ===== Eventos =====
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const texto = inputTarea.value.trim();

  if (texto === "") {
    mensajeError.textContent = "No se pueden agregar tareas vacías.";
    return;
  }

  mensajeError.textContent = "";
  agregarTarea(texto);
  inputTarea.value = "";
  inputTarea.focus();
});

inputTarea.addEventListener("input", function () {
  mensajeError.textContent = "";
});

// ===== Inicio =====
render();
