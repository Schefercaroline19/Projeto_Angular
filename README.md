## API em Node (Aula 21)

Uma segunda versao da API, em JavaScript, na pasta `api-node/`.
O contrato de GET/api/projetos e o mesmo do api/projetos.php`.

Como rodar:
cd api-node
npm install
node server.js

A API sobe em http://localhost:3000. Teste com:
    
    curl -i http://localhost:3000/api/projetos

### Aula 22: a API do banco

Antes de subir a API, o MariaDB precisa estar de pe:

    sudo service mariadb start
    cd api-node
    node server.js

Rotas que leem do `dwii_db`:

    curl -i http://localhost:3000/api/projetos
    curl -i http://localhost:3000/api/projetos/5
    curl -i http://localhost:3000/api/tecnologias

### Aula 23: a API cria, altera e apaga

A API em uso e a de `api-node/`. Os arquivos `api/*.php` e `conexao.php` ficam no repositorio como historico do 2o trimestre.

    curl -i -X POST http://localhost:3000/api/projetos -H "Content-Type: application/json" -d '{"nome":"Projeto de teste","ano":2026}'
    curl -i -X PUT http://localhost:3000/api/projetos/7 -H "Content-Type: application/json" -d '{"nome":"Projeto de teste (editado)","ano":2026}'
    curl -i -X DELETE http://localhost:3000/api/projetos/7

### Aula 24: a tranca

Quem escreve precisa de um token. Antes do primeiro uso, crie a tabela e o dono:

    sudo mariadb dwii_db < sql/usuarios.sql
    cd api-node
    npm install
    node criar-usuario.js dono@portfolio.dev <senha>

Login e escrita com o token:

    curl -i -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"email":"dono@portfolio.dev","senha":"portfolio2026"}'
    curl -i -X POST http://localhost:3000/api/projetos -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"nome":"Projeto com tranca","ano":2026}'
    curl -i -X PUT http://localhost:3000/api/projetos/8 -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"nome":"Projeto com tranca (editado)","ano":2026}'


### Aula 25: o Portfolio em React

O front novo nasce em `portfolio-react/` (Vite + React), ao lado do Angular. Para rodar:

    cd portfolio-react
    npm install
    npm run dev

A tela abre na porta 5173. Por enquanto os projetos sao fixos no `src/App.jsx`; a Aula 27 os traz da API.

### Aula 26: estado, lista e formulario

Os projetos sairam do `App.jsx` e moram em `src/projetos.js`. A tela os desenha com 'map'.

O formulario de contato (`src/Contato.jsx`) guarda o que a pessoa digita no estado, com 'useState'.
Ele ainda nao envia nada: avisa e limpa os campos. O envio de verdade chega com a API.


### Aula 27: os projetos vem da API

O front busca os projetos e o catalogo na API em Node, com 'fetch' dentro de um 'useEffect'.
O endereco da API fica em `src/api.js`. O arquivo `src/projetos.js` saiu: os dados moram no banco.

Para a tela mostrar os dados, a API precisa estar de pe, com a porta 3000 em Public:

    sudo service mariadb start
    cd api-node
    node server.js