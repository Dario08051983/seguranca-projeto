## Resumo

Este projeto implementa uma API REST com foco em segurança, utilizando **JSON Web Tokens (JWT)** para autenticação e autorização de usuários. O objetivo principal é substituir o método vulnerável de geração de `session-id` por um sistema mais seguro baseado em **tokens JWT**, além de proteger os endpoints contra acessos não autorizados e aplicar boas práticas de segurança, como a proteção contra **SQL Injection** e a validação de tokens.

Esta aplicação foi desenvolvida em **Node.js** utilizando o framework **Express**, e simula um cenário real de uma Software House onde uma falha de segurança foi descoberta, permitindo o acesso não autorizado a recursos protegidos. A solução envolve a implementação de técnicas modernas de autenticação e a aplicação de controles rigorosos de acesso baseados em perfis de usuários, como administradores e usuários comuns.

## Funcionalidade

A API contém os seguintes recursos e funcionalidades principais:

1. **Autenticação com JWT**: 
   - Os usuários podem realizar login com suas credenciais (username e password) e, ao serem autenticados com sucesso, recebem um token JWT que expira em 1 hora.
   - O token JWT é utilizado para autenticação nas requisições subsequentes aos endpoints protegidos.

2. **Middleware de Autenticação**:
   - Cada requisição enviada aos endpoints protegidos é verificada por um middleware que valida o token JWT presente no cabeçalho `Authorization`.
   - Caso o token seja inválido, expirado ou ausente, a requisição é negada com uma mensagem de erro apropriada.

3. **Controle de Acesso Baseado em Perfis**:
   - Somente usuários com o perfil de **admin** têm acesso a certos endpoints, como o de recuperação de dados de todos os usuários.
   - Usuários com perfis de acesso mais restritos (como "user" ou "colab") não podem acessar esses recursos protegidos.

4. **Proteção Contra SQL Injection**:
   - A API implementa práticas de segurança para proteger contra ataques de SQL Injection ao lidar com consultas de banco de dados.
   - Parâmetros são validados e tratados adequadamente para evitar que usuários mal-intencionados injetem comandos SQL na aplicação.

5. **Endpoint Protegido para Recuperar Dados do Usuário**:
   - Um endpoint adicional foi criado para recuperar os dados do usuário logado com base no token JWT, sem a necessidade de permissões adicionais de perfil.

## Requisitos

- **Node.js** (versão 14.x ou superior)
- **npm** (para instalação das dependências)

## Como Rodar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio


2. Clone este repositório:
   ```bash
   npm install


3. Clone este repositório:
   ```bash
   node app.js

Utilize uma ferramenta de API, como Postman ou Insomnia, para testar os endpoints, iniciando pelo login:

Endpoint de login: POST http://localhost:3000/api/auth/login
Utilize o token JWT gerado para acessar endpoints protegidos como: GET http://localhost:3000/api/users

## Abaixo esta o link para a visualização do projeto, que esta em pdf.
https://drive.google.com/file/d/13-bcevKzXPAThV74Mz8dbaVWYtMw27A1/view?usp=drive_link
