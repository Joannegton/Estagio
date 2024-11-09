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
    estoque_minimo integer
);

create table usuario (
    matricula varchar(7) primary key unique,
    nome_usuario varchar(120),
    senha varchar(120) default 'Quero@2024#',
    email varchar(120),
    token varchar(255),
    workplace varchar(255),
    cod_loja integer references loja(cod_loja) on delete set null,
    id_perfil_acesso integer references perfil_acesso(id_perfil_acesso) on delete set null
);

-- se tentar criar a tabela com gerente_id da erro
alter table loja
add column gerente_id varchar(7) references usuario(matricula) on delete set null; 


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
    cod_loja integer references loja(cod_loja) on delete set null,
    quantidade_disponivel integer,
    quantidade_recomendada integer
);

create table caixa (
    id_caixa serial primary key,
    cod_loja integer references loja(cod_loja) on delete set null,
    matricula varchar(7) references usuario(matricula) on delete cascade,
    estoque integer
);

create table saida_taloes (
    id_saida_talao serial primary key,
    codigo_talao varchar(10),
    data_saida date default current_date,
    matricula varchar(7) references usuario(matricula) on delete cascade
);

create table estoque_caixa (
    id_estoque_caixa serial primary key,
    id_caixa integer references caixa(id_caixa) on delete cascade,
    quantidade_estoque_caixa integer
);

-- Inserindo permissões de leitura e escrita para todas as funcionalidades

-- Permissões para 'Todas'
INSERT INTO permissoes (modulo, tipo_permissao) VALUES 
('Todas', 'leitura'),
('Todas', 'escrita');

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

-- Permissões para 'Caixas'
INSERT INTO permissoes (modulo, tipo_permissao) VALUES 
('Caixas', 'leitura'),
('Caixas', 'escrita');

-- Permissões para 'Estoque Caixa'
INSERT INTO permissoes (modulo, tipo_permissao) VALUES 
('Estoque Caixa', 'leitura'),
('Estoque Caixa', 'escrita');

-- Permissões para 'Envio Talões'
INSERT INTO permissoes (modulo, tipo_permissao) VALUES 
('Envio Talões', 'leitura'),
('Envio Talões', 'escrita');

-- Permissões para 'Saída Talões'
INSERT INTO permissoes (modulo, tipo_permissao) VALUES 
('Saída Talões', 'leitura'),
('Saída Talões', 'escrita');




