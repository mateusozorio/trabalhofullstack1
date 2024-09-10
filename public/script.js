document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pessoa-form');
    const listaPessoas = document.getElementById('lista-pessoas');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;

        fetch('/api/pessoas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: nome, cpf: cpf, phone: telefone })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); 
            adicionarPessoa(nome, cpf, telefone);
            form.reset(); 
        })
        .catch(error => console.error('Erro:', error));
    });

    function adicionarPessoa(nome, cpf, telefone) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `Nome: ${nome}, CPF: ${cpf}, Telefone: ${telefone}`;
        listaPessoas.appendChild(li); 
    }
});
