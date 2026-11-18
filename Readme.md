# 💈 Dom Jonnys — Barbearia, E-commerce, Cursos & Gestão

Sistema web completo para a barbearia **Dom Jonnys**, contendo agendamento de clientes, vitrine de produtos, venda de curso online, controle financeiro de caixa e painel administrativo.

---

## 🛠️ Stack Tecnológica

- **Back-end:** Java 17+ com Spring Boot (Spring Web, Spring Security, Spring Data JPA).
- **Front-end:** HTML5, CSS3 moderno (Flexbox/Grid, Variáveis CSS, Dark Theme) e JavaScript (ES6+ Native Fetch API).
- **Banco de Dados:** PostgreSQL ou MySQL.
- **Segurança:** Spring Security + JWT (JSON Web Tokens) nos Headers HTTP.
- **IDE:** VS Code (Extensões: Extension Pack for Java, Spring Boot Extension Pack, Live Server).

---

## 🛡️ Arquitetura de Segurança & Proteção de Rotas

1. **Spring Security Filter Chain:**
   - Intercepta todas as requisições HTTP antes de chegarem aos Controllers.
2. **Tokens JWT (Bearer Token):**
   - Ao fazer login, o cliente/admin recebe um token enviado no header `Authorization: Bearer <TOKEN>`.
3. **Controle de Acesso por Role (Perfil):**
   - Public: `/` (Home), `/vitrine`, `/login`, `/cadastro`, `/api/auth/**`.
   - Cliente (`ROLE_CLIENTE`): `/agendamento`, `/meu-curso`, `/api/agendamentos/**`.
   - Admin (`ROLE_ADMIN`): `/admin/**`, `/api/admin/caixa/**`, `/api/admin/produtos/**`.

---

## 📂 Estrutura de Pastas no VS Code

```text
dom-jonnys/
├── README.md
├── backend/                  # Projeto Java Spring Boot
│   ├── src/main/java/com/domjonnys/
│   │   ├── config/           # SecurityConfig, JWTFilter
│   │   ├── controller/       # AuthController, AgendamentoController, ProdutoController
│   │   ├── model/            # Cliente, Agendamento, Produto, Curso, Caixa
│   │   ├── repository/       # Interfaces JPA
│   │   └── service/          # Regras de Negócio
│   └── src/main/resources/
│       └── application.yml   # Conexão com Banco de Dados
└── frontend/                 # Páginas HTML/CSS/JS
    ├── css/
    │   └── style.css         # Dark Theme da Dom Jonnys
    ├── js/
    │   ├── main.js           # Lógica da Vitrine e Carrinho
    │   ├── auth.js           # Cadastro, Login e Proteção por JWT
    │   └── agendamento.js    # Lógica de marcação de horários
    ├── index.html            # Landing Page + Vitrines
    ├── agendamento.html      # Área do Cliente (Marcar horário)
    ├── curso.html            # Vitrine e Área do Aluno
    └── login.html            # Login e Cadastro

