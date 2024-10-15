create table if not exists usuario(
	id_cliente serial primary key,
	nome_cliente varchar(120) not null,
	data_nasc date not null,
	cpf char(11) not null,
	origem char(4) check (origem in ('loja', 'site')) not null,
	score smallint check(score >= 0 and score <= 1000)
);

create table if not exists vendedor(
	id_vendedor smallserial primary key,
	nome_vendedor varchar(120) not null,
	matricula_vendedor varchar(7) not null unique
);

create table if not exists categoria(
	id_categoria smallserial primary key,
	nome_categoria varchar(120) not null unique
);

create table if not exists produto(
	id_produto serial primary key,
	nome_produto varchar(120) not null,
	valor_produto numeric(10,2) not null, --valor com ate 10 dig int, onde aredonda-se para 2 dig depois da virgula
	id_categoria integer not null, 
	foreign key (id_categoria) references categoria(id_categoria)
);

create table if not exists pedido (
    id_pedido bigserial primary key,
    id_cliente integer not null references usuario(id_cliente),
    data_pedido timestamp not null default now(),
    id_vendedor integer references vendedor(id_vendedor)  
);

create table if not exists item_pedido_venda(
    id_pedido INTEGER not null references pedido(id_pedido),
    id_produto INTEGER not null references produto(id_produto),
    valor_venda NUMERIC(10, 2) not null, -- não usei referencia pois pode-se aplicar um desconto
    primary key (id_pedido, id_produto)
);

--dados tabela usuario
insert into usuario (nome_cliente, data_nasc, cpf, origem, score) values
('Yaqi Parente Abasto', '2002-05-23', '52045741583', 'site', 86),
('Iago Campos Faleiro', '1985-04-02', '79313214725', 'site', 36),
('Elizabeth Melo Girão', '2005-08-10', '08038416473', 'site', 29),
('Muriel Mondragão Vilarinho', '1952-03-28', '26444024765', 'loja', 84),
('Ananda Doutel Veiga', '1960-10-03', '47040162695', 'loja', 53),
('Francis Ruas Borba', '1976-09-08', '92389587267', 'loja', 92),
('Isis Cirne Veleda', '1995-07-07', '12644213460', 'site', 90),
('Grace Custódio Caires', '2002-08-14', '15151806033', 'site', 48),
('Antoine Paredes Fazendeiro', '2004-11-12', '30856537756', 'loja', 42),
('Davide Belém Imperial', '1990-12-24', '63706347431', 'site', 69);

--dados tabela categoria
insert into categoria (nome_categoria) values 
('Construção'),
('Móveis'),
('Celulares'),
('Eletrodomésticos');

--dados tabela produto
insert into produto (nome_produto , valor_produto , id_categoria) values
('JANELA MAD ECOLY', 5010.99, 1),
('TANQUE FIBRA BAKOF 2500L', 365.50, 1),
('BOCAL TERMOFUSÃO TIGRE 25 MM', 6552.99, 1),
('LIXEIRA PRIMAFER MULTIUSO 1014-2 BR', 746, 1),
('MESA KAPPES 1100 C/PE METALICO CZ', 7559, 2),
('CADEIRA PAPAI PANDA T 217', 7624, 2),
('ARMARIO DCOSTA TB82NN 4P C/ESPELHO', 7289, 2),
('GAVETEIRO DCOSTA 3GAV C/ROD TC402NP', 7047, 2),
('BALCÃO DCOSTA 1 PORTA TC81 BP', 3550.99, 2),
('FORNO IND GÁS VENÂNCIO F60I INOX', 1237, 4),
('SECADORA ROUPA FISCHER AMIGA 220V', 6531, 4),
('VENTIL ARNOTURBO SIL MAXX30TS3S 30CM220V', 885, 4),
('HOME CINEMA SONY DAV-DZ275', 2437, 4),
('TELEF CEL NOKIA 1208 GSM VIVO SC', 4604.99, 4),
('REFRIG BRASTEMP BRM44HBA FF 375L BR 110V', 1298, 4),
('TELEF CEL LG B220 AZ', 3460, 3),
('TELEF CEL SAMSUNG C3222 DESBL RS', 2077, 3),
('TELEF CEL MEU SN61 QUADRI CHIP PR', 6392, 3),
('TELEF CEL LG GU230 GSM QUADR DESBL PR/VR', 2050, 3),
('TELEF CEL NOKIA 1220', 4886, 3);

-- dados tabela vendedor
insert into vendedor(nome_vendedor, matricula_vendedor) values
('Angela Gouveia Marins', '16142'),
('Mouhamed Eanes Carrasco', '17314'),
('Cristiana Aires', '19658'),
('Rayane Graça Loureiro', '12117');

-- dados pedido
insert into pedido (id_cliente, data_pedido, id_vendedor) VALUES
(1, '2017-01-02 12:03:00', 3),
(9, '2017-05-17 09:24:00', 4),
(3, '2017-09-07 01:55:00', 3),
(4, '2017-11-15 04:06:00', 3),
(5, '2018-03-04 08:14:00', 1),
(1, '2018-06-30 10:14:00', null),
(2, '2018-08-19 17:21:00', null),
(4, '2018-11-04 22:36:00', 4),
(2, '2019-02-18 06:22:00', 2),
(2, '2019-04-20 12:51:00', 1),
(5, '2019-05-07 19:57:00', 2),
(1, '2019-06-28 14:12:00', 3),
(9, '2019-07-24 11:32:00', 3),
(3, '2019-11-09 21:17:00', 1),
(4, '2020-01-24 13:55:00', null),
(5, '2020-02-10 19:10:00', 4),
(1, '2020-06-07 18:32:00', 3),
(2, '2020-09-24 10:33:00', null),
(4, '2021-01-26 06:50:00', 1),
(5, '2021-02-06 09:44:00', null),
(3, '2021-02-06 10:04:00', 3),
(4, '2021-02-10 23:39:00', 2),
(4, '2021-02-11 17:26:00', 3),
(1, '2021-02-12 20:27:00', 2),
(9, '2021-02-15 08:01:00', 1),
(1, '2021-02-15 08:07:00', 1),
(2, '2021-02-15 14:29:00', 1),
(5, '2021-02-15 17:04:00', 1),
(2, '2021-02-21 10:30:00', null),
(2, '2021-02-27 05:45:00', 3),
(2, '2021-03-05 03:20:00', 4),
(1, '2021-03-17 05:31:00', 3),
(5, '2021-03-21 15:45:00', 2),
(9, '2021-03-23 10:08:00', 3),
(4, '2021-03-28 09:14:00', 3),
(2, '2021-04-15 01:36:00', 1),
(5, '2021-04-17 07:38:00', 2),
(3, '2021-04-23 03:47:00', 2),
(2, '2021-04-23 12:53:00', 2),
(2, '2021-05-02 23:26:00', 4),
(1, '2021-05-07 03:23:00', 3),
(2, '2021-05-07 14:03:00', 2),
(4, '2021-05-23 10:17:00', 1),
(5, '2021-07-11 02:34:00', 3);

alter table item_pedido_venda
drop constraint item_pedido_venda_pkey;

-- dados item_pedido_venda
insert into item_pedido_venda (id_pedido, id_produto, valor_venda) VALUES
(24, 9, 3550.99),
(39, 2, 365.5),
(1, 7, 7289),
(15, 20, 4886),
(27, 15, 1298),
(2, 7, 7289),
(39, 9, 3550.99),
(33, 12, 885),
(8, 1, 5010.99),
(41, 4, 746),
(42, 19, 2050),
(2, 16, 3460),
(32, 18, 6392),
(10, 7, 7289),
(9, 5, 7559),
(32, 19, 2050),
(10, 15, 1298),
(33, 5, 7559),
(25, 18, 6392),
(10, 6, 7624),
(42, 16, 3460),
(16, 1, 5010.99),
(44, 6, 7624),
(17, 19, 2050),
(7, 17, 2077),
(18, 17, 2077),
(17, 10, 1237),
(6, 10, 1237),
(17, 12, 885),
(2, 14, 4604.99),
(26, 3, 6552.99),
(11, 9, 3550.99),
(1, 12, 885),
(40, 11, 6531),
(7, 19, 2050),
(33, 18, 6392),
(33, 15, 1298),
(17, 17, 2077),
(1, 4, 746),
(1, 13, 2437),
(9, 10, 1237),
(9, 20, 4886),
(30, 17, 2077),
(5, 4, 746),
(37, 6, 7624),
(9, 4, 746),
(15, 15, 1298),
(2, 20, 4886),
(15, 3, 6552.99),
(37, 17, 2077),
(18, 11, 6531),
(3, 8, 7047),
(4, 13, 2437),
(12, 17, 2077),
(13, 10, 1237),
(14, 9, 3550.99),
(19, 14, 4604.99),
(20, 2, 365.5),
(28, 5, 7559),
(29, 11, 6531),
(31, 4, 746),
(38, 4, 746),
(43, 20, 4886),
(12, 19, 2050),
(12, 12, 885),
(12, 10, 1237),
(12, 1, 5010.99),
(12, 10, 1237),
(35, 5, 8314.9),
(35, 13, 2680.7),
(36, 19, 2255),
(34, 15, 1427.8),
(35, 11, 7184.1),
(34, 10, 1496.77),
(21, 16, 3114),
(22, 18, 5752.8),
(23, 7, 6560.1);

-- questão 2.a
update item_pedido_venda
set valor_venda = valor_venda * 1.10
where id_pedido in (34, 35, 36);

--questão 2.b
update item_pedido_venda
set valor_venda = valor_venda * 1.15
where id_pedido in (21, 22, 23);

--questão 3
update usuario
set nome_cliente = 'Francis Borba'
where nome_cliente = 'Fancis Ruas Borba';

--exercicio 4
insert into categoria(nome_categoria) values ('Informatica');
insert into produto(nome_produto,valor_produto, id_categoria) 
values
('NOTEBOOK CHROMEBOOK AD40', 2399.99, 5),
('NOTEBOOK CHROMEBOOK AD43', 2899.99, 5 );

-- exercicio 5
update vendedor
set matricula_vendedor = 15758
where nome_vendedor = 'Angela Gouveia Marins';

-- exercicio 6 
delete from produto
where id_produto = 24;
--ou
delete if exists from produto
where nome_produto like '%AD43%';

-- exercicio 7
update produto
set valor_produto = valor_produto * 0.95
where id_categoria = 2 and valor_produto between 5000.00 and 7500.00;

--exercicio 8
update produto
set valor_produto = valor_produto * 0.96
where valor_produto > 7600.00 or valor_produto < 700.00;

select * from usuario;
select * from vendedor;
select * from categoria;
select * from produto;
select * from pedido;
select * from item_pedido_venda;

