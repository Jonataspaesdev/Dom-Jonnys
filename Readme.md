Markdown

# Dom Jonnys

Sistema web full-stack para gerenciamento de agendamentos de barbearia, composto por uma API REST em **Spring Boot** (`Backend/`) e uma interface web em **HTML e JavaScript** (`Frontend/`) com área de agendamento e painel administrativo do barbeiro.

## Funcionalidades

- **Agendamento de clientes (`agendamento.html`)**: criação de agendamentos com serviço, data, horário e informações do cliente.
- **Painel do barbeiro (`admin.html`)**: listagem de agendamentos, confirmação de horários (`PUT /api/agendamentos/{id}/confirmar`) e cancelamento/remoção (`DELETE /api/agendamentos/{id}`).
- **Persistência e segurança local**: banco de dados H2, configuração de CORS para desenvolvimento local e integração com Spring Security.

## Tecnologias utilizadas

- **Backend**: Java 17, Spring Boot, Spring Web, Spring Data JPA, Spring Security, H2 Database, Maven (`./mvnw`).
- **Frontend**: HTML5, CSS3, JavaScript (Fetch API).

## Estrutura do projeto

```text
DomJonnys/
├── Backend/
│   ├── src/
│   └── pom.xml
├── Frontend/
│   ├── js/
│   │   ├── admin.js
│   │   └── agendamento.js
│   ├── admin.html
│   └── agendamento.html
└── Readme.md

Como executar o projeto localmente
1. Backend (Spring Boot)

Na pasta Backend/:
Bash

cd Backend
./mvnw spring-boot:run

A API ficará disponível em http://localhost:8080.
2. Frontend

Sirva os arquivos da pasta Frontend/ utilizando um servidor local (como o Live Server no VS Code, ex.: http://127.0.0.1:5500 ou http://localhost:5500) e abra:

    agendamento.html para criar agendamentos;

    admin.html para gerenciar, confirmar ou cancelar agendamentos.
