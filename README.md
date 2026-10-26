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
    node criar-usuario.js dono@portfolio.dev portfolio2026

Login e escrita com o token:

    curl -i -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"email":"dono@portfolio.dev","senha":"portfolio2026"}'
    curl -i -X POST http://localhost:3000/api/projetos -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"nome":"Projeto com tranca","ano":2026}'
    curl -i -X PUT http://localhost:3000/api/projetos/8 -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"nome":"Projeto com tranca (editado)","ano":2026}'
