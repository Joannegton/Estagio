CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Estoque (
    id_estoque INT PRIMARY KEY AUTO_INCREMENT,
    id_loja INT,
    quantidade_recomendada INT NOT NULL,
    quantidade_minima INT NOT NULL,
    quantidade_atual INT NOT NULL,
    FOREIGN KEY (id_loja) REFERENCES Loja(id_loja) ON DELETE CASCADE
);

CREATE TABLE Talao (
    id_talao INT PRIMARY KEY AUTO_INCREMENT,
    codigo_talao VARCHAR(50) NOT NULL UNIQUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Envio (
    id_envio INT PRIMARY KEY AUTO_INCREMENT,
    id_loja INT,
    id_talao INT,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_loja) REFERENCES Loja(id_loja) ON DELETE CASCADE,
    FOREIGN KEY (id_talao) REFERENCES Talao(id_talao) ON DELETE CASCADE
);

CREATE TABLE Recebimento (
    id_recebimento INT PRIMARY KEY AUTO_INCREMENT,
    id_loja INT,
    id_talao INT,
    data_recebimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_loja) REFERENCES Loja(id_loja) ON DELETE CASCADE,
    FOREIGN KEY (id_talao) REFERENCES Talao(id_talao) ON DELETE CASCADE
);

CREATE TABLE Sessao (
    id_sessao INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    data_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_fim TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE Relatorio (
    id_relatorio INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    descricao VARCHAR(255),
    data_geracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

