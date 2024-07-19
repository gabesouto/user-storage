# Phase 1 - backend

## stacks
- Nest.js 
- prisma ORM
- Postgres
- Docker
- Docker-compose
- Jest
- Swagger 

## steps
- [x] Create a new nestjs project
- [x] Add prisma ORM
- [x] Add Postgres
- [x] Add Docker-compose
- [ ] define folder structure 










# Descrição do Problema
Inicialmente, é necessário desenvolver uma aplicação Back-end que irá
armazenar, no banco de dados PostgreSQL, cadastros de usuários em uma
plataforma. Para que o cadastro do usuário seja feito com sucesso, a
aplicação deve enviar ao Back-end o nome, e-mail e senha do usuário, além
de alguns dados pessoais.

Além da criação de usuários, deve haver a possibilidade de buscar os
usuários cadastrados. A busca deve possuir a funcionalidade de paginação e
filtragem dos usuários no banco de dados. Também, a aplicação deve possuir
a funcionalidade de alterar e excluir os dados dos usuários.

O banco de dados e a aplicação poderão ser implantados localmente. Deve
haver, no entanto, um script para inicializar a aplicação e o banco de dados.
Após a conclusão do Back-end, deverá ser realizada uma interface em
React.JS onde deve ser possível visualizar os usuários criados em uma
tabela, assim como realizar buscas por nome e e-mail.
Requisitos Obrigatórios

- Node.js - Express
- React.js - Next.js 13
- Prisma ORM
- Docker
- GitHub
- Testes automatizados
● Um README detalhado com instruções claras de como rodar a
aplicação, explicações sobre as decisões técnicas e como utilizar a API
e/ou uso do Swagger para documentar todas as rotas da API.
● Implementação de logs detalhados utilizando bibliotecas como Winston
ou Morgan.
Diferenciais
● Nest.js● Boas práticas de Git (qualidade/frequência de commits, conventional
commits, etc.)
● Swagger
● TDD (comprovado por commits do Git)
● Aplicação de conceitos de DDD
● Boas práticas de OOP (SOLID, etc.)
● Tailwind
● Boas práticas de backend (ex. 12 Factor App)
● Identidade visual da Meu Guru
● Implementar autenticação utilizando JWT (JSON Web Token).
● Proteger as rotas do back-end para que apenas usuários autenticados
possam acessar as funcionalidades de CRUD.
● Implementar controle de acesso baseado em papéis (admin e usuário
comum) para determinadas ações (ex.: apenas administradores podem
editar informações de um usuário).