function showTime() {
    document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}
showTime();
setInterval(function () {
    showTime();
}, 1000);

// Validação do formulário
document.getElementById('contactForm').addEventListener('submit', function(e) {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        e.preventDefault();
        return;
    }

    // Validação de telefone (exemplo: 10 dígitos)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        alert('Por favor, insira um número de telefone válido (10 dígitos).');
        e.preventDefault();
        return;
    }

    alert('Formulário enviado com sucesso!');
});
