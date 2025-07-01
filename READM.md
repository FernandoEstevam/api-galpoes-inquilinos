![License](https://img.shields.io/badge/license-MIT-blue.svg)

# 🏢 API de Gestão de Inquilinos e Galpões

API RESTful para controle de galpões alugados e inquilinos, com contratos, reajustes, renovações e valores. Ideal para administradoras ou proprietários gerenciarem contratos de aluguel de imóveis industriais.

---

## 📦 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/) ou PostgreSQL
- [Zod](https://zod.dev/) para validação
- [Swagger UI](https://swagger.io/tools/swagger-ui/) com `@fastify/swagger`

---

## 🚀 Como Rodar o Projeto

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/api-galpoes-inquilinos.git
cd api-galpoes-inquilinos

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env

# 4. Rodar o banco com Prisma
npx prisma migrate dev --name init

# 5. Iniciar o servidor
npm run dev


## 📝 Licença

Este projeto está licenciado sob os termos da Licença MIT.  
MIT © 2025 Fernando Estevam