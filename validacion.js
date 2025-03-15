// Funci�n para validar el formulario
function validarFormulario() {
    let nombre = document.getElementById("nombre").value.trim();
    let edad = document.getElementById("edad").value.trim();
    let email = document.getElementById("email").value.trim();
    let usuario = document.getElementById("usuario").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let errores = {};

    // Expresiones regulares corregidas
    let regexNombre = /^[A-Za-z������������ ]+$/;
    let regexEdad = /^(?:[1-9][0-9]?|100)$/;
    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let regexUsuario = /^[A-Za-z0-9!"#$%&/()=?��'.,;:_\-{\[\]^}`+*~|��\\]+$/; // Permite todos los s�mbolos mencionados
    let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&/()=?��'.,;:_\-{\[\]^}`+*~|��\\]).{8,}$/; // M�nimo 8 caracteres, un n�mero y un s�mbolo

    // Validaciones
    if (!regexNombre.test(nombre)) {
        errores.nombre = "Solo se permiten letras y espacios.";
    }
    if (!regexEdad.test(edad)) {
        errores.edad = "Debe ser un n�mero entre 1 y 100.";
    }
    if (!regexEmail.test(email)) {
        errores.email = "Formato de email inv�lido.";
    }
    if (!regexUsuario.test(usuario)) {
        errores.usuario = "Puede contener letras, n�meros y estos s�mbolos: !\"#$%&/()=?��'.,;:_-{}[]^}`+*~|��\\";
    }
    if (!regexPassword.test(password)) {
        errores.password = "Debe tener al menos 8 caracteres, un n�mero y un s�mbolo.";
    }
    if (password !== confirmPassword) {
        errores.confirmPassword = "Las contrase�as no coinciden.";
    }

    // Mostrar errores o �xito
    document.querySelectorAll(".error").forEach(span => span.textContent = "");
    document.querySelectorAll("input").forEach(input => input.style.border = "");

    if (Object.keys(errores).length > 0) {
        for (let campo in errores) {
            document.getElementById(`error${campo.charAt(0).toUpperCase() + campo.slice(1)}`).textContent = errores[campo];
            document.getElementById(campo).style.border = "2px solid red";
        }
    } else {
        let passwordEncriptada = btoa(password); // Encriptar contrase�a con Base64
        document.getElementById("resultado").innerHTML = `
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Edad:</strong> ${edad}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Usuario:</strong> ${usuario}</p>
            <p><strong>Contrase�a (visible):</strong> ${password}</p>
            <p><strong>Contrase�a (encriptada):</strong> ${passwordEncriptada}</p>
        `;
    }
}

// Funci�n para limpiar el formulario
function cancelarFormulario() {
    if (confirm("�Seguro que quieres borrar los datos?")) {
        document.getElementById("registroForm").reset();
        document.querySelectorAll(".error").forEach(span => span.textContent = "");
        document.querySelectorAll("input").forEach(input => input.style.border = "");
        document.getElementById("resultado").innerHTML = "";
    }
}

// Funci�n para mostrar/ocultar la contrase�a
function togglePassword() {
    let passwordField = document.getElementById("password");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}
