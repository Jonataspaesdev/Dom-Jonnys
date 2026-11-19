# Dom Jonnys

Sistema web full-stack para gerenciamento de agendamentos de barbearia, composto por uma API REST em **Spring Boot** (`Backend/`) e uma interface web em **HTML e JavaScript** (`Frontend/`) com tela de agendamento para clientes e painel administrativo para o barbeiro.

## Funcionalidades

- **Agendamento de clientes (`agendamento.html` / `agendamento.js`)**: criação de agendamentos com cliente/contato, serviço, data e horário, iniciando com status `PENDENTE`.
- **Prevenção de conflitos de horário**: validação no backend (`409 Conflict`) via `AgendamentoRepository` (`existsByDataAndHorario`) com exibição da mensagem de conflito na interface.
- **Painel do barbeiro (`admin.html` / `admin.js`)**: listagem de agendamentos (`GET /api/agendamentos`), confirmação (`PUT /api/agendamentos/{id}/confirmar`) e cancelamento/remoção (`DELETE /api/agendamentos/{id}`).
- **Persistência e segurança local**: banco H2, configuração de CORS e integração com Spring Security.

## Tecnologias utilizadas

- **Backend**: Java 17, Spring Boot, Spring Web, Spring Data JPA, Spring Security, H2 Database, Maven (`./mvnw`).
- **Frontend**: HTML5, CSS3, JavaScript (`Fetch API`).

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

Como executar localmente
1. Backend (Spring Boot)
Bash

cd Backend
./mvnw spring-boot:run

A API ficará disponível em http://localhost:8080.
2. Frontend

Sirva a pasta Frontend/ com um servidor local (como o Live Server no VS Code, em http://127.0.0.1:5500 ou http://localhost:5500) e acesse:

    agendamento.html para criar agendamentos;

    admin.html para listar, confirmar ou cancelar agendamentos.
