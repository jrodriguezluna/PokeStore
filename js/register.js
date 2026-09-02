document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("reg-fullname").value.trim();
    let email = document.getElementById("reg-email").value.trim();
    const confirmEmail = document.getElementById("reg-confirm-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;
    const phone = document.getElementById("reg-phone").value.trim();
    const regMessage = document.getElementById("reg-message");

    // 1. Validar correo obligatorio y longitud máxima de 100 caracteres
    if (!email) {
      regMessage.textContent = "El correo es obligatorio.";
      regMessage.style.color = "red";
      return;
    }

    if (email.length > 100) {
      regMessage.textContent = "El correo no debe superar los 100 caracteres.";
      regMessage.style.color = "red";
      return;
    }

    // 2. Validar dominios de correo permitidos (@duoc.cl, @profesor.duoc.cl, @gmail.com)
    const allowedDomains = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const hasValidDomain = allowedDomains.some(domain => email.toLowerCase().endsWith(domain));

    if (!hasValidDomain) {
      regMessage.textContent = "El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com";
      regMessage.style.color = "red";
      return;
    }

    // 3. Validar que los correos coincidan
    if (email !== confirmEmail) {
      regMessage.textContent = "Los correos electrónicos no coinciden.";
      regMessage.style.color = "red";
      return;
    }

    // 4. Validar contraseña obligatoria y longitud entre 4 y 50 caracteres
    if (!password) {
      regMessage.textContent = "La contraseña es obligatoria.";
      regMessage.style.color = "red";
      return;
    }

    if (password.length < 4 || password.length > 50) {
      regMessage.textContent = "La contraseña debe tener entre 4 y 50caracteres.";
      regMessage.style.color = "red";
      return;
    }

    // 5. Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      regMessage.textContent = "Las contraseñas no coinciden.";
      regMessage.style.color = "red";
      return;
    }


    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 6. Verificar si el correo ya existe
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      regMessage.textContent = "El correo ya está registrado.";
      regMessage.style.color = "red";
      return;
    }

    // 7.. Guardar en localStorage
    users.push({
      fullName,
      email,
      password,
      phone: phone || "No proporcionado"
    });

    localStorage.setItem("users", JSON.stringify(users));

    regMessage.textContent = "¡Usuario registrado con éxito!";
    regMessage.style.color = "green";

    registerForm.reset();

    setTimeout(() => {
      window.location.href = "/pages/inicioSesion.html";
    }, 1500);
  });
});