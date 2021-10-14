const express = require('express');
const server = express();

//Middleware local que irá checar se a propriedade name foi informada corretamente,
//Caso negativo, irá retornar um erro 400 – BAD REQUEST
function checkGeekExists(req, res, next) {

    if (!req.body.name) {
        return res.status(400).json({ error: 'geek name is required' });
    };

    //Se o nome for informado corretamente, a função next() chama as próximas ações
    return next();
}

//Checa se o Geek existe no array, caso negativo informa que o index não existe no array
function checkGeekInArray(req, res, next) {

    const geek = geeks[req.params.index];

    if (!geek) {
        return res.status(400).json({ error: 'geek does not exists' });
    };

    req.geek = geek;

    return next();
}

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
server.post('/geeks', checkGeekExists, (req, res) => {

    //Buscando o nome informado dentro do body da req
    const { name } = req.body;

    geeks.push(name);

    //Retorna a informação da variável geeks
    return res.json(geeks);
});

server.put('/geeks/:index', checkGeekInArray, (req, res) => {

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

//Middlewares globais

//Cria o middleware global
server.use((req, res, next) => {

    //Marca o início da requisição
    console.time('Request');

    //Retorna qual método e url foram chamados
    console.log(`Metodo: ${req.method};  URL: ${req.url};`);

    //Função que chama as próximas ações
    next();

    //Será chamado após a requisição ser concluída
    console.log('Finalizou');

    //Marca o fim da requisição
    console.timeEnd('Request');
});

server.listen(3000);
