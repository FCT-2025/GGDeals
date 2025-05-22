// Script para inicializar el tema
const body = document.body;
let theme = localStorage.getItem('theme');

// Establecer 'light' como tema predeterminado si no hay ninguno guardado
if (!theme) {
    theme = 'light';
    localStorage.setItem('theme', theme);
}

// Aplicar la clase theme-dark solo si el tema es explícitamente 'dark'
if (theme === 'dark') {
    body.classList.add('theme-dark');
    document.documentElement.setAttribute('data-bs-theme', 'dark');
} else {
    // Asegurar que el tema claro esté activo
    body.classList.remove('theme-dark');
    document.documentElement.setAttribute('data-bs-theme', 'light');
}
