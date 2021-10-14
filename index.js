const express = require('express');
const server = express();

//Possibilita ao express entender json
server.use(express.json());

//Armazena as informações dentro do array
const geeks = [];

//Rota para listar geeks
server.get('/geeks', (req, res) => {
    return res.json(geeks);
});

server.get('geeks/:index', (req, res) => {
    return res.json(req.user);
});

//Rota para criar geeks
server.post('/geeks', (req, res) => {
    //Buscando o nome informado dentro do body da req
    const { name } = req.body;
    geeks.push(name);
    //Retorna a informação da variável geeks
    return res.json(geeks);
});

server.put('/geeks/:index', (req, res) => {
    //Recupera o index com os dados
    const { index } = req.params;
    const { name } = req.body;

    //Sobrepõe o index obtido na rota de acordo com o novo valor
    geeks[index] = name;

    return res.json(geeks);
});

server.delete('/geeks/:index', (req, res) => {
    const { index } = req.params;

    //Percorre o vetor até o index selecionado e deleta uma posição no array
    geeks.splice(index, 1);

    return res.send();
});

server.listen(3000);
