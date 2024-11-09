
# Documentação do Banco de Dados

## 1. Introdução

Este banco de dados foi projetado para gerenciar um sistema de controle de lojas, usuários, estoques e permissões de acesso. O banco segue a Terceira Forma Normal (3FN).

## 2. Estrutura do Banco de Dados

### Tabelas:

#### 2.1 Tabela `perfil_acesso`
Esta tabela armazena os diferentes perfis de acesso para os usuários, definindo suas permissões.

- **`id_perfil_acesso`** (PK): Identificador único do perfil de acesso.
- **`descricao`**: Descrição do perfil de acesso (ex.: "Administrador", "Vendedor").

#### 2.2 Tabela `permissoes`
Armazena os módulos e os tipos de permissões que podem ser atribuídos aos perfis de acesso.

- **`id_permissao`** (PK): Identificador único da permissão.
- **`modulo`**: Nome do módulo ao qual a permissão se aplica.
- **`tipo_permissao`**: Tipo de permissão (ex.: "Leitura", "Edição", "Administração").

#### 2.3 Tabela `perfil_acesso_permissoes`
Relaciona os perfis de acesso com as permissões que possuem.

- **`id_perfil_acesso`** (FK): Referência ao `id_perfil_acesso` da tabela `perfil_acesso`.
- **`id_permissao`** (FK): Referência ao `id_permissao` da tabela `permissoes`.
- **PK**: Composta por `(id_perfil_acesso, id_permissao)`.

#### 2.4 Tabela `loja`
Armazena informações sobre as lojas, incluindo o gerente responsável.

- **`cod_loja`** (PK): Identificador único da loja.
- **`nome_loja`**: Nome da loja.
- **`endereco_loja`**: Endereço da loja.
- **`telefone`**: Número de telefone da loja.
- **`quantidade_minima`**: Quantidade mínima em estoque na loja.
- **`gerente_id`**: Matrícula do gerente (referência à tabela `usuario`).


#### 2.5 Tabela `usuario`
Armazena informações sobre os usuários do sistema, incluindo suas permissões e o vínculo com a loja.

- **`matricula`** (PK): Identificador único do usuário.
- **`nome_usuario`**: Nome completo do usuário.
- **`senha`**: Senha do usuário.
- **`email`**: Endereço de email do usuário.
- **`token`**: Token de autenticação.
- **`workplace`**: Local de trabalho do usuário (referência à loja).
- **`cod_loja`** (FK): Referência ao código da loja onde o usuário trabalha.
- **`id_perfil_acesso`** (FK): Referência ao perfil de acesso do usuário.

#### 2.6 Tabela `envio_taloes`
Registra os envios de talões para as lojas.

- **`numero_remessa`** (PK): Identificador único da remessa.
- **`cod_loja`** (FK): Referência ao código da loja.
- **`data_envio`**: Data do envio da remessa.
- **`data_recebimento_previsto`**: Data prevista para o recebimento da remessa.
- **`quantidade`**: Quantidade de talões enviados.
- **`id_funcionario_recebimento`** (FK): Matrícula do funcionário que receberá os talões.
- **`status`**: Status da remessa (ex.: "Enviado", "Recebido", "Pendente").

#### 2.7 Tabela `estoque_taloes`
Armazena informações sobre o estoque de talões de cada loja.

- **`cod_loja`** (FK): Referência ao código da loja.
- **`quantidade_disponivel`**: Quantidade de talões disponíveis na loja.
- **`quantidade_recomendada`**: Quantidade recomendada de talões para reabastecimento.

#### 2.8 Tabela `caixa`
Armazena informações sobre os caixas nas lojas.

- **`id_caixa`** (PK): Identificador único do caixa.
- **`cod_loja`** (FK): Referência ao código da loja.
- **`matricula`** (FK): Matrícula do usuário responsável pelo caixa.
- **`estoque`**: Quantidade de produtos no caixa.

#### 2.9 Tabela `saida_taloes`
Registra a saída de talões dos estoques das lojas.

- **`id_saida_talao`** (PK): Identificador único da saída de talões.
- **`codigo_talao`**: Código do talão.
- **`data_saida`**: Data de saída do talão.
- **`matricula`** (FK): Matrícula do usuário que registrou a saída do talão.

#### 2.10 Tabela `estoque_caixa`
Registra o estoque de talões por caixa.

- **`id_estoque_caixa`** (PK): Identificador único do estoque de talões no caixa.
- **`id_caixa`** (FK): Referência ao caixa onde os talões estão armazenados.
- **`quantidade_estoque_caixa`**: Quantidade de talões disponíveis no caixa.

---

## 3. Relacionamentos

- **`perfil_acesso` e `permissoes`**: Relacionamento muitos para muitos através da tabela `perfil_acesso_permissoes`.
- **`usuario` e `loja`**: Relacionamento de um para muitos (um usuário pode estar vinculado a uma loja).
- **`usuario` e `perfil_acesso`**: Relacionamento de um para muitos (um usuário possui um perfil de acesso).
- **`loja` e `usuario`**: Relacionamento de um para muitos (uma loja pode ter vários usuários, incluindo o gerente).
- **`loja` e `envio_taloes`**: Relacionamento de um para muitos (uma loja pode receber várias remessas de talões).
- **`loja` e `estoque_taloes`**: Relacionamento de um para um (cada loja tem um estoque específico de talões).
- **`loja` e `caixa`**: Relacionamento de um para muitos (uma loja pode ter vários caixas).
- **`usuario` e `caixa`**: Relacionamento de um para muitos (um usuário pode ser responsável por vários caixas).
- **`caixa` e `estoque_caixa`**: Relacionamento de um para um (cada caixa tem um estoque de talões).
- **`usuario` e `saida_taloes`**: Relacionamento de um para muitos (um usuário pode registrar várias saídas de talões).

---

## 4. Observações

- A coluna `estoque_minimo` foi removida da tabela `loja` para garantir a conformidade com a 3FN. Ela será calculada dinamicamente em consultas, seja via *view* ou na aplicação.
- O sistema pode ser ampliado para incluir mais funcionalidades de controle de estoques, permissões e registros de atividades, dependendo das necessidades futuras.
