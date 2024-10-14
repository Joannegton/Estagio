create table perfil_acesso (
    id_perfil_acesso serial primary key,
    descricao varchar(20)
);

create table usuario (
    matricula varchar(7) primary key,
    nome_usuario varchar(120),
    senha varchar(120) default 'Quero@2024#',
    id_perfil_acesso integer references perfil_acesso(id_perfil_acesso) on delete set null
);

create table loja (
    id_loja serial primary key,
    nome_loja varchar(120),
    endereco_loja varchar(255),
    estoque_minimo integer,
    gerente varchar(7) references usuario(matricula) on delete set null
);


CREATE TABLE envio_taloes (
    id_talao serial PRIMARY KEY,
    id_loja INTEGER REFERENCES loja(id_loja) ON DELETE SET NULL,
    data_envio DATE,
    data_prevista_recebimento DATE,
    quantidade INTEGER,
    numero_remessa VARCHAR(10),
    id_funcionario_recebimento VARCHAR(7) REFERENCES usuario(matricula) ON DELETE SET NULL,
    status VARCHAR(20) -- Você pode adicionar uma CHECK constraint para validar valores específicos do status, se necessário
);


create table estoque_taloes (
    id_estoque serial primary key,
    id_loja integer references loja(id_loja) on delete set null,
    quantidade_disponivel integer,
    quantidade_recomendada integer
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


-- dados ficticios
INSERT INTO perfil_acesso (descricao)
VALUES
    ('Administrador'),
    ('Gerente'),
    ('Caixa');

INSERT INTO usuario (matricula, nome_usuario, senha, id_perfil_acesso)
VALUES
    ('1234567', 'Ana Souza', 'SenhaSegura@2024#', 1),
    ('7654321', 'Carlos Silva', 'Quero@2024#', 2),
    ('2468135', 'Fernanda Lima', 'SenhaSegura@2024#', 3);

INSERT INTO loja (nome_loja, endereco_loja, estoque_minimo)
VALUES
    ('Loja Central', 'Av. Paulista, 1000, São Paulo - SP', 100),
    ('Loja Sul', 'Rua da Praia, 50, Santos - SP', 50),
    ('Loja Norte', 'Av. Norte, 500, Fortaleza - CE', 80);

INSERT INTO taloes (id_loja, data_envio, data_recebimento, quantidade, status)
VALUES
    (1, '2024-01-10', '2024-01-15', 500, 'Recebido'),
    (2, '2024-02-12', '2024-02-17', 300, 'Recebido'),
    (3, '2024-03-05', NULL, 400, 'Em trânsito');

INSERT INTO envio_taloes (data_envio, id_loja, quantidade, numero_remessa, id_funcionario_envio, status)
VALUES
    ('2024-01-08', 1, 500, 'REM001', '1234567', 'Enviado'),
    ('2024-02-10', 2, 300, 'REM002', '7654321', 'Enviado'),
    ('2024-03-03', 3, 400, 'REM003', '2468135', 'Enviado');

INSERT INTO estoque_taloes (id_loja, quantidade_disponivel, quantidade_recomendada)
VALUES
    (1, 200, 500),
    (2, 150, 300),
    (3, 50, 400);

INSERT INTO permissoes (descricao)
VALUES
    ('Visualizar Estoque'),
    ('Alterar Estoque'),
    ('Enviar Taloes'),
    ('Receber Taloes');

INSERT INTO perfil_acesso_permissoes (id_perfil_acesso, id_permissao)
VALUES
    (1, 1),  -- Administrador pode visualizar o estoque
    (1, 2),  -- Administrador pode alterar o estoque
    (1, 3),  -- Administrador pode enviar talões
    (1, 4),  -- Administrador pode receber talões
    (2, 1),  -- Gerente pode visualizar o estoque
    (2, 3),  -- Gerente pode enviar talões
    (3, 1);  -- Funcionário pode apenas visualizar o estoque


select * from usuario;
select * from perfil_acesso;
select * from loja;
select * from taloes;
select * from envio_taloes;
select * from estoque_taloes;
select * from permissoes;
select * from perfil_acesso_permissoes;

-- não necessário, pois vou tratar as permissões no backend, porém para fins de estudo, o código abaixo.

-- criando usuarios correspondentes as matrículas
create user "1234567" with password 'SenhaSegura@2024#';
create user "7654321" with password 'Quero@2024#';
create user "2468135" with password 'SenhaSegura@2024#';

-- criação de papeis
create role administrador;
create role gerente;
create role caixa;

-- conceder permissões
grant all privileges on table usuario, perfil_acesso, loja, taloes, envio_taloes, estoque_taloes, permissoes, perfil_acesso_permissoes to administrador;
grant select, insert, update on table usuario, estoque_taloes to gerente;
grant select, update on table usuario, taloes to caixa;

grant administrador to "1234567"; -- Ana Souza é adm

-- atribuir Carlos como gerente
grant gerente to "7654321";

-- fernanda como funcionário
grant funcionario to "2468135"; -- Matrícula da Fernanda Lima (Funcionário)

-- restringindo acesso
revoke all on database oferteganhe from public;
