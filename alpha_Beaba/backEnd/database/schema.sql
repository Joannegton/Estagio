-- Banco de dados: oferte_e_ganhe

create table perfil_acesso (
    id_perfil_acesso serial primary key,
    descricao varchar(20) not null
);

create table permissoes (
    id_permissao serial primary key,
    modulo varchar(30) not null,
    tipo_permissao varchar(20) not null
);

-- Tabela de Relacionamento entre Perfis de Acesso e Permissões
create table perfil_acesso_permissoes (
    id_perfil_acesso integer references perfil_acesso(id_perfil_acesso) on delete cascade,
    id_permissao integer references permissoes(id_permissao) on delete cascade,
    primary key (id_perfil_acesso, id_permissao)
); 

create table loja (
    cod_loja serial primary key,
    nome_loja varchar(120) not null,
    endereco_loja varchar(255),
    telefone varchar(20),
    estoque_minimo integer default 100
);

create table usuario (
    matricula varchar(7) primary key unique,
    nome_usuario varchar(120) default '',
    senha varchar(120) default 'Quero@2024#',
    email varchar(120) default '',
    token varchar(255) default '',
    workplace varchar(255) default '',
    id_perfil_acesso integer references perfil_acesso(id_perfil_acesso) on delete set null
);

create table usuario_loja (
    id serial primary key,
    usuario_matricula varchar(7) not null references usuario(matricula) on delete cascade,
    cod_loja integer not null references loja(cod_loja) on delete cascade,
    is_gerente boolean default false
);

create table envio_taloes (
    numero_remessa serial primary key,
    cod_loja integer references loja(cod_loja) on delete set null,
    data_envio timestamp,
    data_recebimento_previsto date,
    quantidade integer,
    id_funcionario_recebimento varchar(7) references usuario(matricula) on delete set null,
    status varchar(20)
);

create table estoque_taloes (
    id_estoque serial primary key,
    cod_loja integer references loja(cod_loja) on delete set null,
    quantidade_disponivel integer default 0,
    quantidade_recomendada integer default 150
);

create table saida_taloes (
    id_saida_talao serial primary key,
    codigo_talao varchar(10),
    data_saida date default current_date,
    matricula varchar(7) references usuario(matricula) on delete cascade,
    cod_loja integer references loja(cod_loja) on delete cascade
);


-- Inserindo permissões de leitura e escrita para todas as funcionalidades

-- Permissões para 'Perfis'
INSERT INTO permissoes (modulo, tipo_permissao) VALUES 
('Perfis', 'leitura'),
('Perfis', 'escrita');

-- Permissões para 'Permissões'
INSERT INTO permissoes (modulo, tipo_permissao) VALUES 
('Permissões', 'leitura'),
('Permissões', 'escrita');

-- Permissões para 'Usuarios'
INSERT INTO permissoes (modulo, tipo_permissao) VALUES 
('Usuarios', 'leitura'),
('Usuarios', 'escrita');

-- Permissões para 'Lojas'
INSERT INTO permissoes (modulo, tipo_permissao) VALUES 
('Lojas', 'leitura'),
('Lojas', 'escrita');

-- Permissões para 'Estoque'
INSERT INTO permissoes (modulo, tipo_permissao) VALUES 
('Estoque', 'leitura'),
('Estoque', 'escrita');

-- Permissões para 'Envio Talões'
INSERT INTO permissoes (modulo, tipo_permissao) VALUES 
('Envio Talões', 'leitura'),
('Envio Talões', 'escrita');

-- Permissões para 'Saída Talões'
INSERT INTO permissoes (modulo, tipo_permissao) VALUES 
('Saída Talões', 'leitura'),
('Saída Talões', 'escrita');

-- Permissões para 'Todas'
INSERT INTO permissoes (modulo, tipo_permissao) VALUES 
('Relatorios', 'leitura'),
('Relatorios', 'escrita');

-- Perfis de caesso
INSERT INTO perfil_acesso (descricao) VALUES 
('Administrador');

INSERT INTO perfil_acesso (descricao) VALUES 
('Gerente');

INSERT INTO perfil_acesso (descricao) VALUES 
('Caixa');


-- Criar a loja matriz
INSERT INTO loja (nome_loja, endereco_loja, telefone, estoque_minimo) VALUES 
('Matriz', 'Rua Principal, 123', '(11) 1234-5678', 100);

-- Inserir o usuário Wellington Tavares
INSERT INTO usuario (matricula, nome_usuario, senha, email, token, workplace, id_perfil_acesso) VALUES 
('Quero@2024#', 'Wellington Tavares', 'Quero@2024#', 'wellington.tavares@verdecard.com', 'token123', 'Matriz', 1);

-- Associar o usuário Wellington Tavares à loja matriz e definir como gerente
INSERT INTO usuario_loja (usuario_matricula, cod_loja, is_gerente) VALUES 
('1234567', (SELECT cod_loja FROM loja WHERE nome_loja = 'Matriz'), true);

-- Conceder todas as permissões ao perfil de acesso do usuário Wellington Tavares
INSERT INTO perfil_acesso_permissoes (id_perfil_acesso, id_permissao)
SELECT 1, id_permissao FROM permissoes;