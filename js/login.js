document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  // Si ya hay una sesión activa, redirige al dashboard/panel
  if (localStorage.getItem("loggedInUser")) {
    window.location.href = "index.html";
    return;
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const loginMessage = document.getElementById("login-message");

    // 1. Validar campos vacíos
    if (!email || !password) {
      loginMessage.textContent = "Por favor, completa todos los campos.";
      loginMessage.style.color = "red";
      return;
    }

    // 2. Obtener usuarios registrados desde localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 3. Buscar coincidencia exacta de correo y contraseña
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
      // Guardar el usuario activo en sesión
      localStorage.setItem("loggedInUser", JSON.stringify(validUser));

      loginMessage.textContent = "¡Inicio de sesión exitoso!";
      loginMessage.style.color = "green";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      loginMessage.textContent = "Correo o contraseña incorrectos.";
      loginMessage.style.color = "red";
    }
  });
});