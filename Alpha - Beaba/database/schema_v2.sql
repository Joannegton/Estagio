create table perfil_acesso (
    id_perfil_acesso serial primary key,
    descricao varchar(20)
);

create table permissoes (
    id_permissao serial primary key,
    descricao varchar(30)
);

create table perfil_acesso_permissoes (
    id_perfil_acesso integer references perfil_acesso(id_perfil_acesso) on delete cascade,
    id_permissao integer references permissoes(id_permissao) on delete cascade,
    primary key (id_perfil_acesso, id_permissao)
);

create table usuario (
    matricula varchar(7) primary key unique,
    nome_usuario varchar(120),
    senha varchar(120) default 'Quero@2024#',
    id_perfil_acesso integer references perfil_acesso(id_perfil_acesso) on delete set null
);

create table loja (
    id_loja serial primary key,
    nome_loja varchar(120),
    endereco_loja varchar(255),
    caixas_fisicos integer,
    estoque_minimo integer,
    gerente_id varchar(7) references usuario(matricula) on delete set null
);

create table envio_taloes (
    id_talao serial primary key,
    id_loja integer references loja(id_loja) on delete set null,
    data_envio date,
    data_recebimento_previsto date,
    quantidade integer,
    numero_remessa varchar(10),
    id_funcionario_recebimento varchar(7) references usuario(matricula) on delete set null,
    status varchar(20)
);

create table estoque_taloes (
    id_estoque serial primary key,
    id_loja integer references loja(id_loja) on delete set null,
    quantidade_disponivel integer,
    quantidade_recomendada integer
);

create table caixa (
    id_caixa serial primary key,
    id_loja integer references loja(id_loja) on delete set null,
    matricula varchar(7) references usuario(matricula) on delete cascade,
    estoque integer
);

create table saida_taloes (
    id_saida_talao serial primary key,
    codigo_talao varchar(10),
    numero_remessa varchar(10) references envio_taloes(numero_remessa),
    matricula varchar(7) references usuario(matricula) on delete cascade
);

-- dados fictícios

insert into perfil_acesso (descricao)
values
    ('administrador'),
    ('gerente'),
    ('caixa');

insert into permissoes (descricao)
values
    ('visualizar estoque'),
    ('alterar estoque'),
    ('enviar talões'),
    ('receber talões');

insert into perfil_acesso_permissoes (id_perfil_acesso, id_permissao)
values
    (1, 1),  -- administrador pode visualizar o estoque
    (1, 2),  -- administrador pode alterar o estoque
    (1, 3),  -- administrador pode enviar talões
    (1, 4),  -- administrador pode receber talões
    (2, 1),  -- gerente pode visualizar o estoque
    (2, 3),  -- gerente pode enviar talões
    (3, 1);  -- caixa pode apenas visualizar o estoque

insert into usuario (matricula, nome_usuario, senha, id_perfil_acesso)
values
    ('1234567', 'ana souza', 'SenhaSegura@2024#', 1),
    ('7654321', 'carlos silva', 'Quero@2024#', 2),
    ('2468135', 'fernanda lima', 'SenhaSegura@2024#', 3);

insert into loja (nome_loja, endereco_loja, caixas_fisicos, estoque_minimo, gerente_id)
values
    ('loja central', 'av. paulista, 1000, são paulo - sp', 5, 100, '1234567'),
    ('loja sul', 'rua da praia, 50, santos - sp', 3, 50, '7654321'),
    ('loja norte', 'av. norte, 500, fortaleza - ce', 4, 80, '2468135');

insert into envio_taloes (id_loja, data_envio, data_recebimento_previsto, quantidade, numero_remessa, id_funcionario_recebimento, status)
values
    (1, '2024-01-08', '2024-01-15', 500, 'REM001', '1234567', 'enviado'),
    (2, '2024-02-10', '2024-02-17', 300, 'REM002', '7654321', 'enviado'),
    (3, '2024-03-03', '2024-03-10', 400, 'REM003', '2468135', 'enviado');

insert into estoque_taloes (id_loja, quantidade_disponivel, quantidade_recomendada)
values
    (1, 200, 500),
    (2, 150, 300),
    (3, 50, 400);

insert into caixa (id_loja, matricula, estoque)
values
    (1, '1234567', 200),
    (2, '7654321', 150),
    (3, '2468135', 50);

insert into saida_taloes (codigo_talao, numero_remessa, matricula)
values
    ('TALAO001', 'REM001', '1234567'),
    ('TALAO002', 'REM002', '7654321'),
    ('TALAO003', 'REM003', '2468135');

-- consultas
select * from usuario;
select * from perfil_acesso;
select * from loja;
select * from envio_taloes;
select * from estoque_taloes;
select * from permissoes;
select * from perfil_acesso_permissoes;
select * from caixa;
select * from saida_taloes;

-- gerenciamento de permissões de banco de dados

create user "1234567" with password 'SenhaSegura@2024#';
create user "7654321" with password 'Quero@2024#';
create user "2468135" with password 'SenhaSegura@2024#';

create role administrador;
create role gerente;
create role caixa;

grant all privileges on table usuario, perfil_acesso, loja, envio_taloes, estoque_taloes, permissoes, perfil_acesso_permissoes, caixa, saida_taloes to administrador;
grant select, insert, update on table usuario, estoque_taloes, caixa to gerente;
grant select, update on table usuario, envio_taloes, caixa, saida_taloes to caixa;

grant administrador to "1234567";
grant gerente to "7654321";
grant caixa to "2468135";

revoke all on database your_database from public;
