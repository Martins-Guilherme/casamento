# API Lista de presentes para o casamento


Uma API RESTful para gerenciar a lista de convidados e presentes de um casamento. Esta aplicação foi desenvolvida com Node.js, Express.js e Prisma, e é otimizada para ser executada em um contêiner Docker.


## Sumário


  * [Tecnologias](#tecnologias)

  * [Pré-requisitos](#pré-requisitos)

  * [Instalação e Configuração](#instalação-e-configuração)

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


#### Convidados (`/convidados`)


  * **`POST /convidados/create`**

      * **Descrição:** Adiciona um novo convidado à lista e vincula ao presente selecionado.
      * **Corpo da Requisição (JSON):**
      * **Resposta (Sucesso):** Status `201 Created`
        ```json
        {
          "nome": "Varela Costa",
          "email": "email123@exemplo.com",
          "telefone": "987654321",
          "mensagem": "Parabéns aos noivos!",
          "presenteId": 9
        }
        ```
      * **Exemplo de Resposta:**
        ```json
        "convidado": {
          "id": 1,
          "nome": "Varela Costa",
          "email": "email123@exemplo.com",
          "telefone": "987654321",
          "mensagem": "Parabéns aos noivos!",
          "token": "8dfa032e-520d-4b05-b0fa-3b886f7550df",
          "usado": true
         },
        "presenteAtualizado": {
            "id": 9,
            "nome": "jabulani",
            "imagem": "https://quatrorodas.abril.com.br/wp-content/uploads/2023/05/QR-763-CARRO-COMPARA-Mobi-x-Kwid-x-C3-ABRE-1.jpg?quality=70&strip=info&w=1280&h=720&crop=1",
            "descricao": "minha Tonga",
            "convidadoId": 1
        }
        ```

  * **`DELETE /convidados/:id?token=<chave de acesso registrada no seu .env>`**

       * **Descrição:** Deletar convidado identificado por seu `id`, para o **administrador**.
       * **Parâmetros da Rota:** `id` (ID do convidado).
       * **Resposta (Sucesso):** Status `200 OK`
       * **Exemplo de Resposta:**
       ```json
        [
        {
          "id":1,
          "nome": "Varela Costa",
          "email": "email123@exemplo.com",
          "telefone": "987654321",
          "mensagem": "Parabéns aos noivos!",
          "token": "8dfa032e-520d-4b05-b0fa-3b886f7550df",
          "usado": true
        }
        ]
       ```

  * **`GET /convidados?token=<chave de acesso registrada no seu .env>`**

      * **Descrição:** Lista todos os convidados para o **administrador**.
      * **Resposta (Sucesso):** Status `200 OK`
      * **Exemplo de Resposta:**
      ```json
      [
      {
        "id":1,
        "nome": "Varela Costa",
        "email": "email123@exemplo.com",
        "telefone": "987654321",
        "mensagem": "Parabéns aos noivos!",
        "token": "8dfa032e-520d-4b05-b0fa-3b886f7550df",
        "usado": true
      }]
     ```

#### Presentes (`/presente e /presentes`)


  * **`POST /presente/creat`**

      * **Descrição:** Adiciona um novo presente à lista.
      * **Corpo da Requisição (JSON):** nome, descrição e imagem.
      * **Resposta (Sucesso):** Status `201 Created`      
      * **Corpo da Requisição (JSON):**
        ```json
        {
          "nome": "Liquidificador",
          "descricao": "Um liquidificador potente para a cozinha",
          "imagem": "https://quatrorodas.abril.com.br/wp-content/uploads/2023/05/QR-763-CARRO-COMPARA-Mobi-x-Kwid-x-C3-ABRE-1.jpg?quality=70&strip=info&w=1280&h=720&crop=1"
        }
        ```
        
  * **`GET /presentes/listar?token=<chave de acesso registrada no seu .env>`**

      * **Descrição:** Lista todos os presentes, para o **administrador**.
      * **Resposta (Sucesso):** Status `200 OK`
      * **Exemplo de Resposta:**
        ```json
        [
          "nome": "Liquidificador",
          "descricao": "Um liquidificador potente para a cozinha",
          "imagem": "https://quatrorodas.abril.com.br/wp-content/uploads/2023/05/QR-763-CARRO-COMPARA-Mobi-x-Kwid-x-C3-ABRE-1.jpg?quality=70&strip=info&w=1280&h=720&crop=1",
          "convidadoId": 1
        ]
        ```
  
  * **`PUT /presentes/unselect/:id?token=<chave de acesso registrada no seu .env>`

    * **Descrição:** Desmarcar o presente selecionado **id** (identificado do presente), para o **administrador**.
    * **Corpo da Requisição (JSON): VAZIO**
    * **Parâmetros da Rota:** `id` (ID do presente).
    * **Resposta (Sucesso):** Status `200 OK`
    * **Exemplo de Resposta:**
      ```json
        {
           "id": 9,
           "nome": "jabulani",
           "imagem": "https://quatrorodas.abril.com.br/wp-content/uploads/2023/05/QR-763-CARRO-COMPARA-Mobi-x-Kwid-x-C3-ABRE-1.jpg?quality=70&strip=info&w=1280&h=720&crop=1",
           "descricao": "minha Tonga",
           "convidadoId": null
       }
      ```
      
  * **`GET /presentes/selected/:id?token=<chave de acesso registrada no seu .env>`

    * **Descrição:** Retorna o status do presente.
    * **Parâmetros da Rota:** `id` (ID do presente).
    * **Corpo da Requisição (JSON): VAZIO**
    * **Resposta (Sucesso):** Status `200 OK`
    * **Exemplo de Resposta:**
      ```json
        {
           "selected": false
       }
      ```
  * **`DELETE /presentes/:id?token=<chave de acesso registrada no seu .env>`**
  
    * **Descrição:** Apagar registro do presente, para o **administrador**.
    * **Parâmetros da Rota:** `id` (ID do presente).
    * **Corpo da Requisição (JSON): VAZIO**
    * **Resposta (Sucesso):** Status `200 OK`
    * **Exemplo de Resposta:**
      ```json
         {
           "id": 3,
           "nome": "Guardanapo",
           "imagem": "https://quatrorodas.abril.com.br/wp-content/uploads/2023/05/QR-763-CARRO-COMPARA-Mobi-x-Kwid-x-C3-ABRE-1.jpg?quality=70&strip=info&w=1280&h=720&crop=1",
           "descricao": "Sei lá se existe",
           "convidadoId": null
         }
      ```

  * **`PUT /presentes/escolher-com-token`**
  
      * **Descrição:** Vincular o presente ao token do convidado, para o **administrador**.
      * **Parâmetros do corpo da Requisição:** `presentId` (ID do presente) `token` (token identificador gerado ao criar o convidado).
      * **Resposta (Sucesso):** Status `200 OK`
      * **Corpo da Requisição (JSON):**
        ```json
        {
            "presentId": 6, 
            "token": "8fb115be-adf3-42d5-b167-1c59525d8dfb" 
        }
        ```

-----

### Autor

  * **Guilherme** - `Martins-Guilherme`
