create table if not exists usuario(
	id_cliente serial primary key,
	nome_cliente varchar(120) not null,
	data_nasc date not null,
	cpf char(11) not null,
	origem char(4) check (origem in ('loja', 'site')) not null,
	score smallint check(score >= 0 and score <= 1000)
);

create table vendedor(
	id_vendedor smallserial primary key,
	nome_vendedor varchar(120) not null,
	matricula_vendedor varchar(7) not null unique
);

create table categoria(
	id_categoria smallserial primary key,
	nome_categoria varchar(120) not null unique
);

create table produto(
	id_produto serial primary key,
	nome_produto varchar(120) not null,
	valor_produto numeric(10,2) not null, --valor com ate 10 dig int, onde aredonda-se para 2 dig depois da virgula
	id_categoria integer not null, 
	foreign key (id_categoria) references categoria(id_categoria)
);

create table pedido (
    id_pedido bigserial primary key,
    data_pedido timestamp not null default now(),
    id_cliente integer not null references usuario(id_cliente), 
    id_vendedor integer not null references vendedor(id_vendedor),  
    id_produto integer not null references produto(id_produto), 
    valor numeric(10,2) not null
);




