// js/contacto.js
import {
  validarCorreo,
  validarTexto,
  marcarError,
  marcarExito
} from './validaciones.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contacto-form");
  const inputNombre = document.getElementById("contacto-nombre");
  const inputEmail = document.getElementById("contacto-email");
  const inputComentario = document.getElementById("contacto-comentario");
  const contadorComentario = document.getElementById("contador-comentario");
  const mensajeFeedback = document.getElementById("contacto-mensaje");

  // 1. Contador dinámico de caracteres
  inputComentario.addEventListener("input", () => {
    const longitud = inputComentario.value.length;
    contadorComentario.textContent = `${longitud} / 500`;

    if (longitud > 500) {
      contadorComentario.classList.add("text-danger");
    } else {
      contadorComentario.classList.remove("text-danger");
    }

    if (inputComentario.classList.contains("is-invalid")) {
      validarComentario();
    }
  });

  // 2. Funciones de validación
  function validarNombre() {
    const res = validarTexto(inputNombre.value, "El nombre completo", 100, true, 3);
    if (!res.esValido) {
      marcarError(inputNombre, res.mensaje);
      return false;
    }
    marcarExito(inputNombre);
    return true;
  }

  function validarEmail() {
    const res = validarCorreo(inputEmail.value, true);
    if (!res.esValido) {
      marcarError(inputEmail, res.mensaje);
      return false;
    }
    marcarExito(inputEmail);
    return true;
  }

  function validarComentario() {
    const res = validarTexto(inputComentario.value, "El comentario", 500, true, 10);
    if (!res.esValido) {
      marcarError(inputComentario, res.mensaje);
      return false;
    }
    marcarExito(inputComentario);
    return true;
  }

  // 3. Validaciones en tiempo real
  inputNombre.addEventListener("blur", validarNombre);
  inputNombre.addEventListener("input", () => {
    if (inputNombre.classList.contains("is-invalid")) validarNombre();
  });

  inputEmail.addEventListener("blur", validarEmail);
  inputEmail.addEventListener("input", () => {
    if (inputEmail.classList.contains("is-invalid")) validarEmail();
  });

  inputComentario.addEventListener("blur", validarComentario);

  // 4. Envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const esNombreValido = validarNombre();
    const esEmailValido = validarEmail();
    const esComentarioValido = validarComentario();

    if (!esNombreValido || !esEmailValido || !esComentarioValido) {
      mensajeFeedback.textContent = "Por favor, corrija los campos señalados antes de enviar.";
      mensajeFeedback.style.color = "#dc3545";
      return;
    }

    // Guardar en localStorage para respaldo o visualización administrativa
    const mensajesGuardados = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
    mensajesGuardados.push({
      nombre: inputNombre.value.trim(),
      email: inputEmail.value.trim().toLowerCase(),
      comentario: inputComentario.value.trim(),
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem("mensajesContacto", JSON.stringify(mensajesGuardados));

    mensajeFeedback.textContent = `¡Gracias por contactarnos, ${inputNombre.value.trim()}! Tu mensaje ha sido enviado exitosamente.`;
    mensajeFeedback.style.color = "#198754";

    form.reset();
    contadorComentario.textContent = "0 / 500";
    inputNombre.classList.remove("is-valid");
    inputEmail.classList.remove("is-valid");
    inputComentario.classList.remove("is-valid");

    setTimeout(() => {
      mensajeFeedback.textContent = "";
    }, 6000);
  });
});

