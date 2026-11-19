Markdown

# Dom Jonnys

Sistema web full-stack para gerenciamento de agendamentos de barbearia, composto por uma API REST em **Spring Boot** (`Backend/`) e uma interface web em **HTML e JavaScript** (`Frontend/`) com tela de agendamento para clientes e painel administrativo para o barbeiro.

## Funcionalidades

- **Agendamento de clientes (`agendamento.html` / `agendamento.js`)**: criação de agendamentos com cliente/contato, serviço, data e horário, iniciando com status `PENDENTE`.
- **Regras de funcionamento e validação**: bloqueio de domingos, feriados e horários fora do expediente (`09:00` às `19:00`) no frontend e no backend (`400 Bad Request`).
- **Prevenção de conflitos de horário**: validação no backend (`409 Conflict`) via `AgendamentoRepository` (`existsByDataAndHorario`) com exibição da mensagem de conflito na interface.
- **Painel do barbeiro (`admin.html` / `admin.js`)**: listagem ordenada de agendamentos (`GET /api/agendamentos`), data formatada no padrão `DD/MM/AAAA`, proteção básica contra XSS, confirmação (`PUT /api/agendamentos/{id}/confirmar`) e cancelamento/remoção (`DELETE /api/agendamentos/{id}`).
- **Persistência e segurança local**: banco H2, configuração de CORS e integração com Spring Security.

## Regras de funcionamento

- **Dias de atendimento**: de **segunda-feira a sábado**.
- **Horário de funcionamento**: das **09:00 às 19:00**.
- **Fechamentos**: não há atendimento aos **domingos** nem em **feriados**.
- **Conflito de horário**: não é permitido registrar dois agendamentos na mesma data e no mesmo horário (`409 Conflict`).

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
