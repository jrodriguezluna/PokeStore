// js/validaciones.js
// Utilidades de validación y reglas de negocio según pauta de Evaluación 1

/**
 * Valida un RUN/RUT chileno mediante el algoritmo Módulo 11
 * Formato esperado: sin puntos ni guion (ej: 19011022K o 123456785)
 * Largo entre 7 y 9 caracteres
 * @param {string} rut
 * @returns {{ esValido: boolean, mensaje: string }}
 */
export function validarRutChileno(rut) {
  if (!rut || typeof rut !== "string") {
    return { esValido: false, mensaje: "El RUN es obligatorio." };
  }

  const rutLimpio = rut.trim().toUpperCase().replace(/\./g, "").replace(/-/g, "");

  if (rutLimpio.length < 7 || rutLimpio.length > 9) {
    return { esValido: false, mensaje: "El RUN debe tener entre 7 y 9 caracteres (sin puntos ni guion)." };
  }

  // Comprobar formato general: dígitos seguidos de un dígito verificador (0-9 o K)
  const regex = /^[0-9]{6,8}[0-9K]$/;
  if (!regex.test(rutLimpio)) {
    return { esValido: false, mensaje: "Formato inválido. Ingrese solo números y dígito verificador (ej: 19011022K)." };
  }

  const cuerpo = rutLimpio.slice(0, -1);
  const dvIngresado = rutLimpio.slice(-1);

  // Algoritmo Módulo 11
  let suma = 0;
  let factor = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }

  const resto = suma % 11;
  const digitoCalculado = 11 - resto;

  let dvEsperado = "";
  if (digitoCalculado === 11) {
    dvEsperado = "0";
  } else if (digitoCalculado === 10) {
    dvEsperado = "K";
  } else {
    dvEsperado = digitoCalculado.toString();
  }

  if (dvIngresado !== dvEsperado) {
    return { esValido: false, mensaje: `El RUN no es válido (dígito verificador incorrecto).` };
  }

  return { esValido: true, mensaje: "RUN válido." };
}

/**
 * Valida un correo electrónico con dominios permitidos (@duoc.cl, @profesor.duoc.cl, @gmail.com)
 * y un largo máximo de 100 caracteres.
 * @param {string} email
 * @param {boolean} [requerido=true]
 * @returns {{ esValido: boolean, mensaje: string }}
 */
export function validarCorreo(email, requerido = true) {
  if (!email || !email.trim()) {
    return requerido
      ? { esValido: false, mensaje: "El correo electrónico es obligatorio." }
      : { esValido: true, mensaje: "" };
  }

  const emailLimpio = email.trim().toLowerCase();

  if (emailLimpio.length > 100) {
    return { esValido: false, mensaje: "El correo no debe superar los 100 caracteres." };
  }

  // Estructura básica de email
  const regexBasico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexBasico.test(emailLimpio)) {
    return { esValido: false, mensaje: "Formato de correo electrónico no válido." };
  }

  const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
  const tieneDominioPermitido = dominiosValidos.some(dom => emailLimpio.endsWith(dom));

  if (!tieneDominioPermitido) {
    return {
      esValido: false,
      mensaje: "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
    };
  }

  return { esValido: true, mensaje: "Correo válido." };
}

/**
 * Valida contraseña según pauta (requerido, entre 4 y 10 caracteres)
 * @param {string} password
 * @returns {{ esValido: boolean, mensaje: string }}
 */
export function validarPassword(password) {
  if (!password) {
    return { esValido: false, mensaje: "La contraseña es obligatoria." };
  }

  if (password.length < 4 || password.length > 10) {
    return { esValido: false, mensaje: "La contraseña debe tener entre 4 y 10 caracteres." };
  }

  return { esValido: true, mensaje: "Contraseña válida." };
}

/**
 * Valida un campo de texto con restricciones de longitud
 * @param {string} texto
 * @param {string} nombreCampo
 * @param {number} max
 * @param {boolean} [requerido=true]
 * @param {number} [min=0]
 * @returns {{ esValido: boolean, mensaje: string }}
 */
export function validarTexto(texto, nombreCampo, max, requerido = true, min = 0) {
  const valor = texto ? texto.trim() : "";

  if (requerido && !valor) {
    return { esValido: false, mensaje: `${nombreCampo} es obligatorio.` };
  }

  if (!requerido && !valor) {
    return { esValido: true, mensaje: "" };
  }

  if (min > 0 && valor.length < min) {
    return { esValido: false, mensaje: `${nombreCampo} debe tener al menos ${min} caracteres.` };
  }

  if (valor.length > max) {
    return { esValido: false, mensaje: `${nombreCampo} no puede superar los ${max} caracteres.` };
  }

  return { esValido: true, mensaje: "Correcto." };
}

/**
 * Funciones de ayuda para mostrar feedback visual en tiempo real en los inputs
 */
export function marcarError(inputElement, mensaje) {
  if (!inputElement) return;
  inputElement.classList.add("is-invalid");
  inputElement.classList.remove("is-valid");

  let feedback = inputElement.parentElement.querySelector(".invalid-feedback-custom");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback-custom";
    inputElement.parentElement.appendChild(feedback);
  }
  feedback.textContent = mensaje;
  feedback.style.display = "block";
}

export function marcarExito(inputElement) {
  if (!inputElement) return;
  inputElement.classList.remove("is-invalid");
  inputElement.classList.add("is-valid");

  const feedback = inputElement.parentElement.querySelector(".invalid-feedback-custom");
  if (feedback) {
    feedback.style.display = "none";
    feedback.textContent = "";
  }
}

export function limpiarEstado(inputElement) {
  if (!inputElement) return;
  inputElement.classList.remove("is-invalid", "is-valid");
  const feedback = inputElement.parentElement.querySelector(".invalid-feedback-custom");
  if (feedback) {
    feedback.style.display = "none";
    feedback.textContent = "";
  }
}

