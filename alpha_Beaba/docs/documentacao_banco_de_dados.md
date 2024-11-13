# Documentação do Banco de Dados
Banco de dados PostgreSQL utilizado para armazenar informações sobre usuários, lojas, estoque de talões e envio de talões. O banco foi modelado com o objetivo de permitir o gerenciamento de talões de forma eficiente e segura.

## Tabelas do Banco de Dados

### 1. Tabela `perfil_acesso`
Armazena os perfis de acesso dos usuários.

| Campo             | Tipo         | Descrição                          |
|-------------------|--------------|------------------------------------|
| id_perfil_acesso  | SERIAL (PK)  | Identificador único do perfil.     |
| descricao         | VARCHAR(20)  | Descrição do perfil de acesso.     |

---

### 2. Tabela `permissoes`
Define permissões para módulos e tipos de acesso.

| Campo            | Tipo         | Descrição                          |
|------------------|--------------|------------------------------------|
| id_permissao     | SERIAL (PK)  | Identificador único da permissão.  |
| modulo           | VARCHAR(30)  | Módulo ao qual a permissão pertence. |
| tipo_permissao   | VARCHAR(20)  | Tipo de permissão (leitura/escrita).|

---

### 3. Tabela `perfil_acesso_permissoes`
Tabela de relacionamento entre perfis de acesso e permissões.

| Campo            | Tipo        | Descrição                                      |
|------------------|-------------|------------------------------------------------|
| id_perfil_acesso | INTEGER (FK)| Referência à tabela `perfil_acesso`.           |
| id_permissao     | INTEGER (FK)| Referência à tabela `permissoes`.              |

---

### 4. Tabela `loja`
Armazena as informações das lojas.

| Campo           | Tipo         | Descrição                          |
|-----------------|--------------|------------------------------------|
| cod_loja        | SERIAL (PK)  | Código único da loja.             |
| nome_loja       | VARCHAR(120) | Nome da loja.                     |
| endereco_loja   | VARCHAR(255) | Endereço da loja.                 |
| telefone        | VARCHAR(20)  | Telefone da loja.                 |
| estoque_minimo  | INTEGER      | Quantidade mínima de estoque.     |

---

### 5. Tabela `usuario`
Armazena os dados dos usuários do sistema.

| Campo            | Tipo         | Descrição                          |
|------------------|--------------|------------------------------------|
| matricula        | VARCHAR(7) PK| Identificador único do usuário.   |
| nome_usuario     | VARCHAR(120) | Nome do usuário.                  |
| senha            | VARCHAR(120) | Senha de acesso do usuário.       |
| email            | VARCHAR(120) | Email do usuário.                 |
| token            | VARCHAR(255) | Token de autenticação.            |
| workplace        | VARCHAR(255) | Local de trabalho.                |
| id_perfil_acesso | INTEGER (FK) | Referência à tabela `perfil_acesso`. |

---

### 6. Tabela `usuario_loja`
Relaciona usuários a lojas e define se são gerentes.

| Campo              | Tipo         | Descrição                                |
|--------------------|--------------|------------------------------------------|
| id                 | SERIAL (PK)  | Identificador único da relação.          |
| usuario_matricula  | VARCHAR(7) FK| Referência à tabela `usuario`.           |
| cod_loja           | INTEGER (FK) | Referência à tabela `loja`.              |
| is_gerente         | BOOLEAN      | Define se o usuário é gerente da loja.   |

---

### 7. Tabela `envio_taloes`
Armazena informações sobre o envio de talões.

| Campo                  | Tipo         | Descrição                                      |
|------------------------|--------------|------------------------------------------------|
| numero_remessa         | SERIAL (PK)  | Identificador único do envio de talão.         |
| cod_loja               | INTEGER (FK) | Referência à tabela `loja`.                    |
| data_envio             | TIMESTAMP    | Data de envio dos talões.                      |
| data_recebimento_previsto | DATE     | Data prevista para o recebimento.              |
| quantidade             | INTEGER      | Quantidade de talões enviados.                 |
| id_funcionario_recebimento | VARCHAR(7) FK | Identificador do funcionário responsável. |
| status                 | VARCHAR(20)  | Status do envio dos talões.                    |

---

### 8. Tabela `estoque_taloes`
Armazena informações de estoque dos talões nas lojas.

| Campo                  | Tipo         | Descrição                          |
|------------------------|--------------|------------------------------------|
| id_estoque             | SERIAL (PK)  | Identificador único do estoque.    |
| cod_loja               | INTEGER (FK) | Referência à tabela `loja`.        |
| quantidade_disponivel  | INTEGER      | Quantidade de talões disponíveis.  |
| quantidade_recomendada | INTEGER      | Quantidade recomendada de talões.  |

---

### 9. Tabela `saida_taloes`
Armazena o histórico de saída de talões.

| Campo           | Tipo         | Descrição                          |
|-----------------|--------------|------------------------------------|
| id_saida_talao  | SERIAL (PK)  | Identificador único da saída.      |
| codigo_talao    | VARCHAR(10)  | Código do talão.                   |
| data_saida      | DATE         | Data da saída do talão.            |
| matricula       | VARCHAR(7) FK| Referência ao usuário responsável. |
| cod_loja        | INTEGER (FK) | Referência à loja.                 |

---

## Inserção de Dados Padrão

1. **Permissões**: Foram inseridas permissões de leitura e escrita para as funcionalidades principais: Todas, Perfis, Permissões, Usuários, Lojas, Estoque, Envio Talões, e Saída Talões.
2. **Perfis de Acesso**: Foram criados três perfis padrão: Administrador, Gerente e Caixa.
3. **Loja Matriz**: Loja principal cadastrada como "Matriz" com informações de contato e estoque mínimo.
4. **Usuário Wellington Tavares**: Usuário inicial criado com a matrícula "1234567" e o perfil de Administrador.

## Relacionamentos

- **`perfil_acesso_permissoes`**: Relaciona perfis de acesso com permissões específicas.
- **`usuario_loja`**: Relaciona usuários com lojas, permitindo definir gerentes.
- **`envio_taloes`, `estoque_taloes` e `saida_taloes`**: Estruturam o gerenciamento de estoque e envio de talões de forma relacional com lojas e usuários.

---

