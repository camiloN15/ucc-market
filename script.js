// Elementos del DOM
const loginContainer = document.getElementById('loginContainer');
const registerContainer = document.getElementById('registerContainer');
const successMessage = document.getElementById('successMessage');
const successText = document.getElementById('successText');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const continueBtn = document.getElementById('continueBtn');

// Almacenamiento de usuarios registrados
let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

// Administradores por defecto
const defaultAdmins = [
    {
        email: 'admin@uccmarket.com',
        password: 'Admin@2024',
        isAdmin: true,
        name: 'Administrador Principal'
    },
    {
        email: 'soporte@uccmarket.com',
        password: 'admin123',
        isAdmin: true,
        name: 'Soporte Técnico'
    },
    {
        email: 'ventas@uccmarket.com',
        password: 'ventas2024',
        isAdmin: true,
        name: 'Administrador de Ventas'
    }
];

// Agregar administradores si no existen
defaultAdmins.forEach(admin => {
    if (!registeredUsers.some(user => user.email === admin.email)) {
        registeredUsers.push(admin);
    }
});

// Guardar cambios en localStorage
localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

// Mostrar formulario de registro
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    switchForms(loginContainer, registerContainer);
});

// Mostrar formulario de login
showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    switchForms(registerContainer, loginContainer);
});

// Continuar después del éxito: si es admin redirige al panel, si no vuelve al login
continueBtn.addEventListener('click', () => {
    if (continueBtn.dataset.admin === 'true') {
        window.location.href = 'admin.html';
        return;
    }
    successMessage.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    loginContainer.classList.add('fade-in');
});

// Función para cambiar entre formularios
function switchForms(hideForm, showForm) {
    hideForm.classList.add('hidden');
    showForm.classList.remove('hidden');
    showForm.classList.add('fade-in');
    
    // Limpiar formularios al cambiar
    clearForms();
    clearErrors();
}

// Limpiar formularios
function clearForms() {
    loginForm.reset();
    registerForm.reset();
}

// Limpiar mensajes de error
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('input');
    
    errorMessages.forEach(error => error.textContent = '');
    inputs.forEach(input => input.classList.remove('error'));
}

// Validación de email
function isValidEmail(email) {
    // Debe contener @ y al menos un punto después del @
    return email.includes('@') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validación de contraseña: 7+ caracteres, mayúscula, minúscula, número y carácter especial
function isValidPassword(password) {
    if (password.length < 7) {
        return false; // Menos de 7 caracteres
    }
    
    const hasUpperCase = /[A-Z]/.test(password); // Al menos una mayúscula
    const hasLowerCase = /[a-z]/.test(password); // Al menos una minúscula
    const hasNumber = /\d/.test(password);       // Al menos un número
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password); // Al menos un carácter especial
    
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}

// Función para mostrar/ocultar contraseña
function togglePasswordVisibility(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);
    
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈'; // Ojo cerrado
    } else {
        input.type = 'password';
        button.textContent = '👁️'; // Ojo abierto
    }
}

// Mostrar error
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(inputId + 'Error');
    
    input.classList.add('error');
    errorElement.textContent = message;
}

// Mostrar éxito - CORREGIDO
function showSuccess(message, isAdmin = false, adminName = '') {
    successText.textContent = message;
    if (isAdmin) {
        // Si no hay nombre definido, usar un nombre por defecto
        const displayName = adminName || 'Administrador';
        successText.innerHTML += `<br><span style="color: #e53e3e; font-weight: bold;">Acceso como ${displayName}</span>`;
    }
    loginContainer.classList.add('hidden');
    registerContainer.classList.add('hidden');
    successMessage.classList.remove('hidden');
    successMessage.classList.add('fade-in');

    // Ajustar comportamiento del botón continuar según si es admin
    if (isAdmin) {
        continueBtn.dataset.admin = 'true';
        continueBtn.textContent = 'Ir al panel de administración';
        // redirección automática corta para facilitar flujo
        setTimeout(() => { window.location.href = 'admin.html'; }, 1000);
    } else {
        continueBtn.dataset.admin = 'false';
        continueBtn.textContent = 'Continuar';
    }
}


// Verificar si el email ya existe
function emailExists(email) {
    return registeredUsers.some(user => user.email === email);
}

// Buscar usuario por email y contraseña - CORREGIDO
function findUser(email, password) {
    const user = registeredUsers.find(user => 
        user.email === email && user.password === password
    );
    
    // Si encontramos el usuario pero no tiene nombre, asignarle uno
    if (user && !user.name) {
        user.name = user.isAdmin ? 'Administrador' : 'Usuario';
        // Actualizar en localStorage
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }
    
    return user;
}

// Guardar nuevo usuario
function saveUser(email, password) {
    const newUser = {
        email: email,
        password: password,
        isAdmin: false,
        registrationDate: new Date().toISOString(),
        name: email.split('@')[0] // Nombre basado en el email
    };
    
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    return newUser;
}

// FORMULARIO DE LOGIN - CORREGIDO
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    let isValid = true;
    clearErrors();
    
    // Validar email
    if (!email) {
        showError('loginEmail', 'El email es requerido');
        isValid = false;
    } else if (!email.includes('@')) {
        showError('loginEmail', 'El email debe contener @');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('loginEmail', 'Ingresa un email válido');
        isValid = false;
    }
    
    // Validar contraseña
    if (!password) {
        showError('loginPassword', 'La contraseña es requerida');
        isValid = false;
    }
    
    if (isValid) {
        // Simular envío al servidor
        const loginBtn = document.getElementById('loginBtn');
        const originalText = loginBtn.textContent;
        
        loginBtn.textContent = 'Iniciando sesión...';
        loginBtn.disabled = true;
        
        setTimeout(() => {
            // Buscar usuario en los registrados
            const user = findUser(email, password);
            const defaultMatch = defaultAdmins.find(a => a.email === email && a.password === password);
            const effectiveUser = user || defaultMatch;
            
            if (effectiveUser) {
                localStorage.setItem('currentUser', JSON.stringify(effectiveUser));
                if (effectiveUser.isAdmin) {
                    const userName = effectiveUser.name || 'Administrador';
                    showSuccess(`¡Bienvenido ${userName}! Has iniciado sesión correctamente.`, true, userName);
                } else {
                    const userName = effectiveUser.name || 'Usuario';
                    showSuccess(`¡Bienvenido ${userName}! Has iniciado sesión correctamente.`);
                    window.location.href = 'index.html';
                }
            } else {
                showError('loginPassword', 'Email o contraseña incorrectos');
            }
            
            loginBtn.textContent = originalText;
            loginBtn.disabled = false;
        }, 1500);
    }
});

// FORMULARIO DE REGISTRO
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    
    let isValid = true;
    clearErrors();
    
    // Validar email
    if (!email) {
        showError('registerEmail', 'El email es requerido');
        isValid = false;
    } else if (!email.includes('@')) {
        showError('registerEmail', 'El email debe contener @');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('registerEmail', 'Ingresa un email válido');
        isValid = false;
    } else if (emailExists(email)) {
        showError('registerEmail', 'Este email ya está registrado');
        isValid = false;
    }
    
    // Validar contraseña
    if (!password) {
        showError('registerPassword', 'La contraseña es requerida');
        isValid = false;
    } else if (!isValidPassword(password)) {
        showError('registerPassword', 'La contraseña debe tener mín. 7 caracteres: mayúscula, minúscula, número y carácter especial (!@#$%^&*)');
        isValid = false;
    }
    
    // Validar confirmación de contraseña
    if (!confirmPassword) {
        showError('confirmPassword', 'Confirma tu contraseña');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPassword', 'Las contraseñas no coinciden');
        isValid = false;
    }
    
    if (isValid) {
        // Simular envío al servidor
        const registerBtn = document.getElementById('registerBtn');
        const originalText = registerBtn.textContent;
        
        registerBtn.textContent = 'Creando cuenta...';
        registerBtn.disabled = true;
        
        setTimeout(() => {
            // Guardar nuevo usuario
            saveUser(email, password);
            
            // Simular creación exitosa de cuenta
            showSuccess(`¡Cuenta creada exitosamente! Bienvenido a UCCMARKET. Ahora puedes comenzar a vender.`);
            
            registerBtn.textContent = originalText;
            registerBtn.disabled = false;
            
            // Limpiar formulario
            registerForm.reset();
        }, 1500);
    }
});

// Validación en tiempo real para mejor UX
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('error');
        const errorElement = document.getElementById(input.id + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
});

// Efectos visuales para inputs
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Función para reparar usuarios existentes sin nombre
function repairUserNames() {
    let needsUpdate = false;
    
    registeredUsers.forEach(user => {
        if (!user.name) {
            if (user.isAdmin) {
                user.name = 'Administrador';
            } else {
                user.name = user.email.split('@')[0];
            }
            needsUpdate = true;
        }
    });
    
    if (needsUpdate) {
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        console.log('Nombres de usuario reparados');
    }
}

// Ejecutar reparación al cargar
repairUserNames();

// Inicialización
clearForms();
clearErrors();