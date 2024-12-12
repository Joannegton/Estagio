# Documentação da API

## Introdução
Esta API fornece serviços para gerenciamento de perfis, lojas, login, exportação de arquivos CSV e controle de estoque. Abaixo estão descritas as rotas, métodos HTTP, parâmetros e exemplos de uso.

---

## Endpoints

### **Perfis**

#### **Criar Perfil**
- **Método:** `POST`
- **URL:** `api/perfis`
- **Parâmetros do Corpo (JSON):**
  ```json
  {
      "nomePerfil": "string",
      "permissoes": ["string"]
  }
  ```
- **Respostas:**
  - `201`: Perfil criado com sucesso.
  - `400`: Nome do perfil ou lista de permissões inválidos.
  - `500`: Erro ao cadastrar perfil.

#### **Listar Perfis**
- **Método:** `GET`
- **URL:** `api/perfis`
- **Respostas:**
  - `200`: Retorna a lista de perfis.
  - `404`: Nenhum perfil encontrado.
  - `500`: Erro ao buscar perfis.

#### **Buscar Perfil por ID**
- **Método:** `GET`
- **URL:** `api/perfis/:id`
- **Respostas:**
  - `200`: Retorna o perfil encontrado.
  - `404`: Perfil não encontrado.
  - `500`: Erro ao buscar perfil.

#### **Atualizar Perfil**
- **Método:** `PUT`
- **URL:** `api/perfis/:id`
- **Parâmetros do Corpo (JSON):**
  ```json
  {
      "permissoes": ["string"]
  }
  ```
- **Respostas:**
  - `200`: Perfil atualizado com sucesso.
  - `400`: Dados inválidos.
  - `500`: Erro ao atualizar perfil.

#### **Deletar Perfil**
- **Método:** `DELETE`
- **URL:** `api/perfis/:id`
- **Respostas:**
  - `200`: Perfil deletado com sucesso.
  - `500`: Erro ao deletar perfil.

---

### **Lojas**

#### **Criar Loja**
- **Método:** `POST`
- **URL:** `api/lojas`
- **Parâmetros do Corpo (JSON):**
  ```json
  {
      "nomeLoja": "string",
      "endereco": "string",
      "telefoneLoja": "string"
  }
  ```
- **Respostas:**
  - `201`: Loja cadastrada com sucesso.
  - `400`: Nome da loja é obrigatório.
  - `500`: Erro ao cadastrar loja.

#### **Listar Lojas**
- **Método:** `GET`
- **URL:** `api/lojas`
- **Respostas:**
  - `200`: Retorna a lista de lojas.
  - `404`: Nenhuma loja encontrada.
  - `500`: Erro ao buscar lojas.

#### **Buscar Loja por ID**
- **Método:** `GET`
- **URL:** `api/lojas/:codLoja`
- **Respostas:**
  - `200`: Retorna a loja encontrada.
  - `404`: Loja não encontrada.
  - `500`: Erro ao buscar loja.

#### **Atualizar Loja**
- **Método:** `PUT`
- **URL:** `api/lojas/:codLoja`
- **Parâmetros do Corpo (JSON):**
  ```json
  {
      "campo": "valor"
  }
  ```
- **Respostas:**
  - `200`: Loja atualizada com sucesso.
  - `404`: Loja não encontrada.
  - `500`: Erro ao atualizar loja.

#### **Deletar Loja**
- **Método:** `DELETE`
- **URL:** `api/lojas/:codLoja`
- **Respostas:**
  - `200`: Loja deletada com sucesso.
  - `404`: Loja não encontrada.
  - `500`: Erro ao deletar loja.

---

### **Login**

#### **Realizar Login**
- **Método:** `POST`
- **URL:** `api/login`
- **Parâmetros do Corpo (JSON):**
  ```json
  {
      "matricula": "string",
      "senha": "string"
  }
  ```
- **Respostas:**
  - `200`: Login bem-sucedido, retorna token e informações do usuário.
  - `401`: Credenciais inválidas.

#### **Recuperar Senha**
- **Método:** `POST`
- **URL:** `api/login/recover`
- **Parâmetros do Corpo (JSON):**
  ```json
  {
      "email": "string"
  }
  ```
- **Respostas:**
  - `200`: Instruções de recuperação enviadas.
  - `500`: Erro ao recuperar senha.

#### **Logout**
- **Método:** `POST`
- **URL:** `api/logout`
- **Parâmetros do Corpo (JSON):**
  ```json
  {
      "matricula": "string"
  }
  ```
- **Respostas:**
  - `200`: Logout realizado com sucesso.
  - `500`: Erro ao realizar logout.

#### **Alterar Senha**
- **Método:** `PUT`
- **URL:** `api/login/change-password`
- **Parâmetros do Corpo (JSON):**
  ```json
  {
      "matricula": "string",
      "senhaAtual": "string",
      "novaSenha": "string"
  }
  ```
- **Respostas:**
  - `200`: Senha alterada com sucesso.
  - `401`: Credenciais inválidas.

---

### **Exportação de CSV**

#### **Exportar Dados**
- **Método:** `POST`
- **URL:** `api/export-csv`
- **Parâmetros do Corpo (JSON):**
  ```json
  {
      "dados": [{ "campo": "valor" }],
      "nomeArquivo": "string"
  }
  ```
- **Respostas:**
  - `200`: Retorna o arquivo CSV.
  - `500`: Erro ao exportar dados.

---

### **Estoque**

#### **Listar Estoque**
- **Método:** `GET`
- **URL:** `api/estoque`
- **Respostas:**
  - `200`: Retorna a lista de estoque.
  - `404`: Estoque não encontrado.
  - `500`: Erro ao buscar estoque.

#### **Buscar Estoque por Loja**
- **Método:** `GET`
- **URL:** `api/estoque/:codLoja`
- **Respostas:**
  - `200`: Retorna o estoque da loja.
  - `500`: Erro ao buscar estoque.

---
