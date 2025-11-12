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

document.addEventListener('DOMContentLoaded', () => {
    const tabelaBody = document.querySelector('#tabelaDados tbody');
    const btnAdicionar = document.getElementById('adicionarLinha');
    let nextId = 3; // Começa após os IDs iniciais no HTML

    // 1. Funcionalidade de Adicionar Linha
    btnAdicionar.addEventListener('click', () => {
        const novaLinha = document.createElement('tr');
        novaLinha.dataset.id = nextId;
        
        novaLinha.innerHTML = `
            <td class="editable">${nextId}</td>
            <td class="editable">Nova Pesquisa ${nextId}</td>
            <td class="editable">Pendente</td>
            <td class="editable">${new Date().toISOString().slice(0, 10)}</td>
            <td><button class="excluirLinha">🗑️ Excluir</button></td>
        `;
        
        tabelaBody.appendChild(novaLinha);
        nextId++;

        // Reatribui os ouvintes de eventos para a nova linha
        setupListeners(novaLinha);
    });

    // 2. Funcionalidade de Excluir Linha (Delegação de Eventos)
    tabelaBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('excluirLinha')) {
            const row = event.target.closest('tr');
            if (confirm(`Tem certeza que deseja excluir a linha de ID ${row.dataset.id}?`)) {
                row.remove();
            }
        }
    });

    // 3. Funcionalidade de Edição de Célula (Duplo Clique)
    function setupEditability(cell) {
        cell.addEventListener('dblclick', function() {
            // Evita criar um input se já estiver editando
            if (this.querySelector('input')) return;

            const valorOriginal = this.textContent;
            
            // Cria um campo de entrada de texto
            const input = document.createElement('input');
            input.type = 'text';
            input.value = valorOriginal;
            
            // Substitui o conteúdo da célula pelo input
            this.textContent = '';
            this.appendChild(input);
            input.focus();

            // Lógica para salvar a edição
            const salvarEdicao = () => {
                const novoValor = input.value.trim();
                this.textContent = novoValor;
                this.removeEventListener('focusout', salvarEdicao);
            };

            // Salva ao pressionar Enter
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    salvarEdicao();
                }
            });

            // Salva ao perder o foco (blur)
            input.addEventListener('blur', salvarEdicao);
        });
    }

    // Função para aplicar os ouvintes de eventos a uma linha
    function setupListeners(row) {
        row.querySelectorAll('.editable').forEach(setupEditability);
    }

    // Aplica os ouvintes a todas as linhas iniciais
    document.querySelectorAll('#tabelaDados tbody tr').forEach(setupListeners);
});
