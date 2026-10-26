-- Aula 24: quem pode escrever na api. A senha entra aqui: so o hash (bcrypt, 60 caracteres).
CREATE TABLE usuarios (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email       VARCHAR(120) NOT NULL,
    senha_hash  CHAR(60) NOT NULL,
    criado_em   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
