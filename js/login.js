// js/login.js
import {
  validarCorreo,
  validarPassword,
  marcarError,
  marcarExito
} from './validaciones.js';

// Inicializar un usuario administrador predeterminado si no existen usuarios
function asegurarUsuarioAdminPredeterminado() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existeAdmin = users.some(u => u.email === "admin@duoc.cl");

  if (!existeAdmin) {
    users.push({
      run: "19000001K",
      nombre: "Administrador",
      apellidos: "PokeStore",
      email: "admin@duoc.cl",
      password: "admin", // 5 caracteres (cumple entre 4 y 10)
      telefono: "+56 9 9999 8888",
      region: "Región Metropolitana de Santiago",
      comuna: "Santiago",
      direccion: "Casa Central Duoc UC",
      rol: "Administrador",
      fechaRegistro: new Date().toISOString()
    });
    localStorage.setItem("users", JSON.stringify(users));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  asegurarUsuarioAdminPredeterminado();

  const loginForm = document.getElementById("login-form");
  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");
  const loginMessage = document.getElementById("login-message");

  // Si ya hay una sesión activa, redirige según el rol
  const usuarioActivoGuardado = localStorage.getItem("loggedInUser");
  if (usuarioActivoGuardado) {
    try {
      const usuarioActivo = JSON.parse(usuarioActivoGuardado);
      if (usuarioActivo.rol === "Administrador" || usuarioActivo.rol === "Vendedor") {
        window.location.href = "/pages/homeAdmin.html";
      } else {
        window.location.href = "/index.html";
      }
      return;
    } catch {
      localStorage.removeItem("loggedInUser");
    }
  }

  // Validaciones en tiempo real
  function validarEmailLogin() {
    const res = validarCorreo(loginEmail.value, true);
    if (!res.esValido) {
      marcarError(loginEmail, res.mensaje);
      return false;
    }
    marcarExito(loginEmail);
    return true;
  }

  function validarPasswordLogin() {
    const res = validarPassword(loginPassword.value);
    if (!res.esValido) {
      marcarError(loginPassword, res.mensaje);
      return false;
    }
    marcarExito(loginPassword);
    return true;
  }

  loginEmail.addEventListener("blur", validarEmailLogin);
  loginEmail.addEventListener("input", () => {
    if (loginEmail.classList.contains("is-invalid")) validarEmailLogin();
  });

  loginPassword.addEventListener("blur", validarPasswordLogin);
  loginPassword.addEventListener("input", () => {
    if (loginPassword.classList.contains("is-invalid")) validarPasswordLogin();
  });

  // Procesar Submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const esEmailValido = validarEmailLogin();
    const esPasswordValido = validarPasswordLogin();

    if (!esEmailValido || !esPasswordValido) {
      loginMessage.textContent = "Por favor, ingrese un correo y contraseña válidos.";
      loginMessage.style.color = "#dc3545";
      return;
    }

    const emailIngresado = loginEmail.value.trim().toLowerCase();
    const passwordIngresada = loginPassword.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar coincidencia exacta
    const usuarioValido = users.find(u =>
      u.email.toLowerCase() === emailIngresado && u.password === passwordIngresada
    );

    if (usuarioValido) {
      // Guardar sesión activa
      localStorage.setItem("loggedInUser", JSON.stringify(usuarioValido));

      loginMessage.textContent = `¡Bienvenido/a ${usuarioValido.nombre}! Redirigiendo...`;
      loginMessage.style.color = "#198754";

      setTimeout(() => {
        if (usuarioValido.rol === "Administrador" || usuarioValido.rol === "Vendedor") {
          window.location.href = "/pages/homeAdmin.html";
        } else {
          window.location.href = "/index.html";
        }
      }, 1000);
    } else {
      loginMessage.textContent = "Correo o contraseña incorrectos.";
      loginMessage.style.color = "#dc3545";
      marcarError(loginEmail, "Credenciales incorrectas.");
      marcarError(loginPassword, "Credenciales incorrectas.");
    }
  });
});