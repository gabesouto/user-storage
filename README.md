# User Storage

![User Storage](https://github.com/gabesouto/user-storage/blob/main/Screenshot%20from%202024-07-21%2020-47-20.png)

## Sumário
- [Descrição](#descrição)
- [Decisões Técnicas](#decisões-técnicas)
- [Metodologias Empregadas](#metodologias-empregadas)
- [Tecnologias](#tecnologias)
- [API](#api)
- [Autenticação](#autenticação-e-uso-da-api)
- [Rodando Localmente o Projeto](#rodando-localmente-o-projeto)

## Descrição

Aplicação full-stack para gerenciamento de usuários com uma interface gráfica para manipulação de dados.

## Decisões Técnicas

- **Escolha do Framework**: Optei por utilizar o NestJS para o backend, mesmo sem experiência prévia com o framework. Acredito que essa foi uma boa oportunidade para demonstrar minha capacidade de aprender rapidamente e aplicar novos conhecimentos.

- **Modelo de Dados**: Para gerenciar os usuários da Meu Guru, implementei uma segunda tabela chamada 'staff', com os papéis de 'member' e 'admin'. Apenas administradores têm permissão para alterar dados dos usuários, enquanto os membros da staff têm acesso restrito.

## Metodologias Empregadas

- **TDD (Test-Driven Development)**: Todo o backend foi desenvolvido seguindo TDD. Os testes foram escritos antes da implementação das funcionalidades, garantindo que o código atenda aos requisitos e seja testável desde o início.

- **Git Workflow**: O desenvolvimento seguiu as práticas do Git Workflow, com a cronologia do projeto documentada nas <strong>Issues</strong> e <strong>Pull Requests</strong>. Isso facilita o rastreamento das mudanças e a colaboração.

- **Estruturação de Pastas**: O backend foi estruturado em módulos conforme os padrões da documentação oficial do NestJS.

## Tecnologias

- **NestJS**: Utilizado para o backend. Escolhido para aprender um novo framework e demonstrar minha capacidade de adaptação.

- **Winston**: Usado para logging, seguindo a recomendação do teste. Winston é uma biblioteca versátil para registrar informações em diferentes formatos e destinos.

- **Swagger**: Usado para documentar e testar a API. A documentação interativa está disponível em [localhost:3001/api](http://localhost:3001/api).

- **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados dos usuários, garantindo integridade e performance nas operações de CRUD.

- **bcrypt**: Utilizado para hashing de senhas, proporcionando uma camada adicional de segurança.

- **JWT (JSON Web Token)**: Usado para autenticação e autorização, garantindo que apenas usuários autenticados e autorizados possam acessar certas rotas e funcionalidades.

- **Prisma**: ORM utilizado para interagir com o banco de dados PostgreSQL, facilitando a manipulação de dados com uma abordagem baseada em schema.

## API

A API foi documentada com Swagger para facilitar a exploração e o teste dos endpoints. A documentação pode ser acessada em [localhost:3001/api](http://localhost:3001/api). Inclui detalhes sobre os endpoints disponíveis, parâmetros esperados e formatos de resposta, fornecendo uma visão clara e completa das funcionalidades da API.

## Autenticação e Uso da API

As rotas de interação com o endpoint `/users` exigem autenticação JWT. Para acessar essas rotas, o usuário deve incluir um token JWT válido no cabeçalho da solicitação.

Algumas rotas são restritas e só podem ser acessadas por usuários com a role `admin`. Rotas que exigem a role `admin` incluem operações sensíveis, como exclusão de usuários e atualização de informações críticas, garantindo que apenas usuários com privilégios apropriados possam realizar essas ações.

Para obter um token JWT, o usuário deve passar pelas rotas de autenticação fornecidas pela API, como a rota de login. O token JWT deve ser incluído no cabeçalho `Authorization` das solicitações, no formato `Bearer <token>`.

Para testar a aplicação, acesse o endpoint [localhost:3001/api](http://localhost:3001/api). No arquivo `backend/prisma/seeders.ts`, há um script com e-mails e senhas para membros 'admin'. Utilize um desses e-mails e senhas para fazer login e acessar todos os recursos da aplicação, ou utilize o exemplo fornecido no Swagger.

Não é possível se cadastrar como um 'admin'.

## Rodando localmente o projeto

1. Clone o repositório

    ```bash
   git clone git@github.com:gabesouto/user-storage.git
    ```

2. Navegue para o repositório

    ```bash
    cd user-storage
    ```

3. Instale as depêndencias

    ```bash
    npm run install:apps
    ```
4. Adicione as suas credencias do PostgreSQL ao arquivo <Strong>.env-example</Strong> e renomeie ele para <Strong>.env</Strong>

5. Inicia o banco de dados com o docker compose. Dependendo da sua versão do docker compose talvez seja necessário utilizar `docker compose` ao invés de `docker-compose`

    ```bash
    cd backend && npm run db:reset
    ```

6. Inicie a aplicação em dois terminais seperados, um para cada serviço.
   /backend

    ```bash
    npm run dev
    ```
7. Inicie a aplicação no frontend
  /frontend

    ```bash
    npm run dev
    ```
