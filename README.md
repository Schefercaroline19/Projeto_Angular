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
