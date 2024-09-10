const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/pessoas', (req, res) => {
    const { name, cpf, phone } = req.body;
    console.log(`Recebido: Nome=${name}, CPF=${cpf}, Telefone=${phone}`);
    res.json({ message: 'Pessoa cadastrada com sucesso!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
