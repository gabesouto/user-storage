# User Storage

## Sumário
- [Descrição](#descrição)
- [Metodologias Empregadas](#metodologias-empregadas)
- [Tecnologias e Decisões Técnicas](#tecnologias-e-decisões-técnicas)
- [API](#api)
- [Autenticação](#autenticação)
- [Rodando Localmente o Projeto](#rodando-localmente-o-projeto)

## Descrição

Aplicação full-stack com sistema de gerenciamento de usuários e interface gráfica para manipulação de dados

## Metodologias Empregadas

- **TDD (Test-Driven Development)**: Todo o backend foi desenvolvido seguindo os princípios de TDD. Testes foram escritos antes da implementação das funcionalidades, garantindo que o código atende aos requisitos e é testável desde o início.

- **Git Workflow**: Todo o desenvolvimento da aplicação seguiu os princípios e práticas do Git Workflow. A cronologia do projeto está documentada nas <strong>Issues</strong> e nos <strong>Pull Requests</strong> já finalizados, o que facilita o rastreamento das mudanças e a colaboração.

## Tecnologias e Decisões Técnicas

- **NestJS**: Escolhi o NestJS para o backend ainda que eu não tivesse experiência prévia com esse framework, acredito muito na minha capacidade de aprender sob pressão e entendi que essa era uma oportunidade boa de aprendizado.



## API

A API foi documentada com Swagger para facilitar a exploração e o teste dos endpoints. Você pode acessar a documentação interativa em [localhost:3001/api](http://localhost:3001/api). A documentação inclui detalhes sobre os endpoints disponíveis, os parâmetros esperados e os formatos de resposta, fornecendo uma visão clara e completa das funcionalidades da API.



## Autenticação

As rotas de interação com o endpoint `/users` exigem autenticação JWT (JSON Web Token). Para acessar essas rotas, o usuário deve incluir um token JWT válido no cabeçalho da solicitação. 

Além disso, algumas rotas são restritas e só podem ser acessadas por usuários com a role `admin`. As rotas que exigem a role `admin` incluem operações sensíveis, como a exclusão de usuários e a atualização de informações críticas. Isso garante que apenas usuários com privilégios apropriados possam realizar essas ações.

Para obter um token JWT, o usuário deve passar pelas rotas de autenticação fornecidas pela API, como a rota de login. O token JWT deve ser incluído no cabeçalho `Authorization` das solicitações, utilizando o formato `Bearer <token>`.

Ao rodar a aplicação e acessar o endpoint [localhost:3001/api](http://localhost:3001/api) será possível mais facilmente entender esse fluxo.

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
