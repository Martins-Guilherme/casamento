# API Lista de presentes para o casamento

Uma API RESTful para gerenciar a lista de convidados e presentes de um casamento. Esta aplicação foi desenvolvida com Node.js, Express.js e Prisma, e é otimizada para ser executada em um contêiner Docker.

## Sumário

  * [Tecnologias](#tecnologias)
  * [Pré-requisitos](#Pré-requisitos)
  * [Instalação e Configuração](#Instalação-e-Configuração)
  * [API Endpoints](#api-endpoints)
  * [Autor](#autor)

-----

### Tecnologias

  * **Node.js:** Ambiente de execução
  * **Express.js:** Framework web para rotas
  * **Prisma:** ORM (Mapeador Objeto-Relacional)
  * **PostgreSQL:** Banco de dados (via Neon.tech)
  * **Docker:** Conteinerização
  * **Render:** Plataforma de deploy

### Pré-requisitos

Antes de começar, certifique-se de que você tem instalado:

  * [Node.js](https://nodejs.org/)
  * [npm](https://www.npmjs.com/)
  * [Docker](https://www.docker.com/)
  * [Git](https://git-scm.com/)

### Instalação e Configuração

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure o arquivo `.env`:**
    Crie um arquivo `.env` na raiz do projeto e adicione a sua URL de conexão do banco de dados (obtida do Neon):

    ```env
    DATABASE_URL="sua-string-de-conexao-aqui"
    ```

4.  **Rode as migrações do banco de dados:**
    Isso criará a estrutura das tabelas no seu banco de dados.

    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Gere o Prisma Client:**
    Apesar das migrações, é uma boa prática rodar o comando de geração do cliente manualmente.

    ```bash
    npx prisma generate
    ```

### Como Rodar a Aplicação

  * **Modo de Desenvolvimento (sem Docker):**

    ```bash
    npm run dev
    ```

    A API estará disponível em `http://localhost:5000`.

  * **Modo de Produção (com Docker):**
    Para construir e rodar a aplicação em um contêiner Docker:

    ```bash
    docker build -t casamento-api .
    docker run -p 5000:5000 casamento-api
    ```

    A API estará disponível em `http://localhost:5000`.

-----

### API Endpoints

A seguir, a documentação das rotas principais da API.

#### Convidados (`/api/convidados`)

  * **`POST /api/convidados`**

      * **Descrição:** Adiciona um novo convidado à lista.
      * **Corpo da Requisição (JSON):**
        ```json
        {
          "nome": "João da Silva",
          "email": "joao.silva@email.com",
          "confirmado": true
        }
        ```
      * **Resposta (Sucesso):** Status `201 Created`

  * **`GET /api/convidados`**

      * **Descrição:** Lista todos os convidados.
      * **Resposta (Sucesso):** Status `200 OK`
      * **Exemplo de Resposta:**
        ```json
        [
          { "id": 1, "nome": "João da Silva", "email": "joao.silva@email.com", "confirmado": true },
          { "id": 2, "nome": "Maria de Souza", "email": "maria.souza@email.com", "confirmado": false }
        ]
        ```

#### Presentes (`/api/presentes`)

  * **`POST /api/presentes`**

      * **Descrição:** Adiciona um novo presente à lista.
      * **Corpo da Requisição (JSON):**
        ```json
        {
          "nome": "Liquidificador",
          "descricao": "Um liquidificador potente para a cozinha",
          "valor": 150.00,
          "disponivel": true
        }
        ```
      * **Resposta (Sucesso):** Status `201 Created`

  * **`GET /api/presentes`**

      * **Descrição:** Lista todos os presentes.
      * **Resposta (Sucesso):** Status `200 OK`
      * **Exemplo de Resposta:**
        ```json
        [
          { "id": 1, "nome": "Liquidificador", "disponivel": true },
          { "id": 2, "nome": "Jogo de Toalhas", "disponivel": false }
        ]
        ```

  * **`PUT /api/presentes/:id`**

      * **Descrição:** Atualiza o status de um presente (ex: para "presenteado").
      * **Parâmetros da Rota:** `id` (ID do presente)
      * **Corpo da Requisição (JSON):**
        ```json
        {
          "disponivel": false
        }
        ```
      * **Resposta (Sucesso):** Status `200 OK`

-----

### Autor

  * **Guilherme** - `Martins-Guilherme`
