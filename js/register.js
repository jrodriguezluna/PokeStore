// js/register.js
import { inicializarSelectoresRegionComuna } from './regionesComunas.js';
import {
  validarRutChileno,
  validarCorreo,
  validarPassword,
  validarTexto,
  marcarError,
  marcarExito
} from './validaciones.js';

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const regMessage = document.getElementById("reg-message");

  // Campos del formulario
  const inputRun = document.getElementById("reg-run");
  const inputNombre = document.getElementById("reg-nombre");
  const inputApellidos = document.getElementById("reg-apellidos");
  const inputEmail = document.getElementById("reg-email");
  const inputConfirmEmail = document.getElementById("reg-confirm-email");
  const inputPassword = document.getElementById("reg-password");
  const inputConfirmPassword = document.getElementById("reg-confirm-password");
  const inputPhone = document.getElementById("reg-phone");
  const inputBirthdate = document.getElementById("reg-birthdate");
  const selectRegion = document.getElementById("reg-region");
  const selectComuna = document.getElementById("reg-comuna");
  const inputDireccion = document.getElementById("reg-direccion");

  // 1. Inicializar Selects de Región y Comuna
  inicializarSelectoresRegionComuna(selectRegion, selectComuna);

  // 2. Funciones de validación individual para tiempo real
  function validarCampoRun() {
    const res = validarRutChileno(inputRun.value);
    if (!res.esValido) {
      marcarError(inputRun, res.mensaje);
      return false;
    }
    marcarExito(inputRun);
    return true;
  }

  function validarCampoNombre() {
    const res = validarTexto(inputNombre.value, "El nombre", 50, true, 2);
    if (!res.esValido) {
      marcarError(inputNombre, res.mensaje);
      return false;
    }
    marcarExito(inputNombre);
    return true;
  }

  function validarCampoApellidos() {
    const res = validarTexto(inputApellidos.value, "Los apellidos", 100, true, 2);
    if (!res.esValido) {
      marcarError(inputApellidos, res.mensaje);
      return false;
    }
    marcarExito(inputApellidos);
    return true;
  }

  function validarCampoEmail() {
    const res = validarCorreo(inputEmail.value, true);
    if (!res.esValido) {
      marcarError(inputEmail, res.mensaje);
      return false;
    }
    marcarExito(inputEmail);
    return true;
  }

  function validarCampoConfirmEmail() {
    const email = inputEmail.value.trim().toLowerCase();
    const confirm = inputConfirmEmail.value.trim().toLowerCase();
    if (!confirm) {
      marcarError(inputConfirmEmail, "Debe confirmar su correo electrónico.");
      return false;
    }
    if (email !== confirm) {
      marcarError(inputConfirmEmail, "Los correos electrónicos no coinciden.");
      return false;
    }
    marcarExito(inputConfirmEmail);
    return true;
  }

  function validarCampoPassword() {
    const res = validarPassword(inputPassword.value);
    if (!res.esValido) {
      marcarError(inputPassword, res.mensaje);
      return false;
    }
    marcarExito(inputPassword);
    return true;
  }

  function validarCampoConfirmPassword() {
    const pass = inputPassword.value;
    const confirm = inputConfirmPassword.value;
    if (!confirm) {
      marcarError(inputConfirmPassword, "Debe confirmar su contraseña.");
      return false;
    }
    if (pass !== confirm) {
      marcarError(inputConfirmPassword, "Las contraseñas no coinciden.");
      return false;
    }
    marcarExito(inputConfirmPassword);
    return true;
  }

  function validarCampoRegion() {
    if (!selectRegion.value) {
      marcarError(selectRegion, "Debe seleccionar una región.");
      return false;
    }
    marcarExito(selectRegion);
    return true;
  }

  function validarCampoComuna() {
    if (!selectComuna.value) {
      marcarError(selectComuna, "Debe seleccionar una comuna.");
      return false;
    }
    marcarExito(selectComuna);
    return true;
  }

  function validarCampoDireccion() {
    const res = validarTexto(inputDireccion.value, "La dirección", 300, true, 5);
    if (!res.esValido) {
      marcarError(inputDireccion, res.mensaje);
      return false;
    }
    marcarExito(inputDireccion);
    return true;
  }

  // 3. Event listeners para validaciones en tiempo real (blur e input)
  inputRun.addEventListener("blur", validarCampoRun);
  inputRun.addEventListener("input", () => {
    // Si el usuario ya comenzó a escribir el largo completo, validamos
    if (inputRun.value.length >= 7) validarCampoRun();
  });

  inputNombre.addEventListener("blur", validarCampoNombre);
  inputNombre.addEventListener("input", () => {
    if (inputNombre.classList.contains("is-invalid")) validarCampoNombre();
  });

  inputApellidos.addEventListener("blur", validarCampoApellidos);
  inputApellidos.addEventListener("input", () => {
    if (inputApellidos.classList.contains("is-invalid")) validarCampoApellidos();
  });

  inputEmail.addEventListener("blur", validarCampoEmail);
  inputEmail.addEventListener("input", () => {
    if (inputEmail.classList.contains("is-invalid")) validarCampoEmail();
    if (inputConfirmEmail.value) validarCampoConfirmEmail();
  });

  inputConfirmEmail.addEventListener("blur", validarCampoConfirmEmail);
  inputConfirmEmail.addEventListener("input", validarCampoConfirmEmail);

  inputPassword.addEventListener("blur", validarCampoPassword);
  inputPassword.addEventListener("input", () => {
    if (inputPassword.classList.contains("is-invalid")) validarCampoPassword();
    if (inputConfirmPassword.value) validarCampoConfirmPassword();
  });

  inputConfirmPassword.addEventListener("blur", validarCampoConfirmPassword);
  inputConfirmPassword.addEventListener("input", validarCampoConfirmPassword);

  selectRegion.addEventListener("change", () => {
    validarCampoRegion();
    // Limpiar estado de comuna al cambiar región
    validarCampoComuna();
  });

  selectComuna.addEventListener("change", validarCampoComuna);

  inputDireccion.addEventListener("blur", validarCampoDireccion);
  inputDireccion.addEventListener("input", () => {
    if (inputDireccion.classList.contains("is-invalid")) validarCampoDireccion();
  });

  // 4. Manejo del envío (Submit)
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const esRunValido = validarCampoRun();
    const esNombreValido = validarCampoNombre();
    const esApellidosValidos = validarCampoApellidos();
    const esEmailValido = validarCampoEmail();
    const esConfirmEmailValido = validarCampoConfirmEmail();
    const esPasswordValido = validarCampoPassword();
    const esConfirmPasswordValido = validarCampoConfirmPassword();
    const esRegionValida = validarCampoRegion();
    const esComunaValida = validarCampoComuna();
    const esDireccionValida = validarCampoDireccion();

    const formularioValido = (
      esRunValido &&
      esNombreValido &&
      esApellidosValidos &&
      esEmailValido &&
      esConfirmEmailValido &&
      esPasswordValido &&
      esConfirmPasswordValido &&
      esRegionValida &&
      esComunaValida &&
      esDireccionValida
    );

    if (!formularioValido) {
      regMessage.textContent = "Por favor, corrija los campos marcados en rojo antes de continuar.";
      regMessage.style.color = "#dc3545";

      // Llevar foco al primer campo erróneo
      const primerInvalido = registerForm.querySelector(".is-invalid");
      if (primerInvalido) primerInvalido.focus();
      return;
    }

    const runLimpio = inputRun.value.trim().toUpperCase().replace(/\./g, "").replace(/-/g, "");
    const emailLimpio = inputEmail.value.trim().toLowerCase();

    // Obtener usuarios desde localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Validar si el correo o el RUN ya están registrados
    const correoExiste = users.some(u => u.email.toLowerCase() === emailLimpio);
    if (correoExiste) {
      regMessage.textContent = "El correo electrónico ya se encuentra registrado.";
      regMessage.style.color = "#dc3545";
      marcarError(inputEmail, "Este correo ya está en uso.");
      inputEmail.focus();
      return;
    }

    const runExiste = users.some(u => u.run && u.run.toUpperCase() === runLimpio);
    if (runExiste) {
      regMessage.textContent = "El RUN ingresado ya se encuentra registrado.";
      regMessage.style.color = "#dc3545";
      marcarError(inputRun, "Este RUN ya está registrado.");
      inputRun.focus();
      return;
    }

    // Guardar nuevo usuario
    const nuevoUsuario = {
      run: runLimpio,
      nombre: inputNombre.value.trim(),
      apellidos: inputApellidos.value.trim(),
      email: emailLimpio,
      password: inputPassword.value,
      telefono: inputPhone.value.trim() || "No proporcionado",
      fechaNacimiento: inputBirthdate.value || "No especificada",
      region: selectRegion.value,
      comuna: selectComuna.value,
      direccion: inputDireccion.value.trim(),
      rol: "Cliente", // Rol predeterminado para registro público
      fechaRegistro: new Date().toISOString()
    };

    users.push(nuevoUsuario);
    localStorage.setItem("users", JSON.stringify(users));

    regMessage.textContent = "¡Registro exitoso! Redirigiendo al inicio de sesión...";
    regMessage.style.color = "#198754";

    registerForm.reset();

    setTimeout(() => {
      window.location.href = "/pages/inicioSesion.html";
    }, 1500);
  });
});