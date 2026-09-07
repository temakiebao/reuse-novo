This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Integrantes  
- Gustavo Galvão – RM: 565969  
- Lucas Tamura – RM: 563249  

## Objetivo da Sprint
Nesta Sprint, nosso time criou a base do aplicativo mobile ReUse. O foco principal foi estabelecer uma organização de interface, usando os componentes do React Native. Com o foco em facilitar o acesso a componentes de hardware de forma sustentável e econômica.

## Desafio
O objetivo é enriquecer o nosso app em React Native para utilizar/consumir APIs externas. Além disso, vamos utilizar os recursos de autenticação, sessões e caching local. 

## YOUTUBE LINK


## Ferramentas utilizadas  
React NextJS, Prisma OR e PostgreSQL

## INSTRUÇÕES PARA AQUELES QUE QUEREM RODAR O PROJETO PURO
Siga estas instruções simples para configurar o ambiente e testar a plataforma:

1 -  Clone o repositório no terminal:

git clone [[https://github.com/seu-usuario/ReUse-App-Firebase-API](https://github.com/seu-usuario/ReUse-App-Firebase-API)]

2 - Instale as dependências no terminal do VS Code: 

"npm install"

3 - Configure as variáveis de ambiente:
Crie um arquivo chamado .env na raiz do projeto. Adicione a sua string de conexão com o banco de dados PostgreSQL:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/reuse_db?schema=public"

4 - Sincronize o banco de dados:
npx prisma generate
npx prisma db push

5 - Inicie o servidor de desenvolvimento:
npm run dev

6 - Acesse a plataforma:
Acesse http://localhost:3000 para navegar pelo ReUse


## Estrutura do projeto

reuse-novo/
├── prisma/
│   └── schema.prisma
├── public/
│   └── seja_bem_vindo.gif
├── src/ (ou na raiz, dependendo da sua configuração inicial)
│   ├── lib/
│   │   └── prisma.ts
│   └── app/
│       ├── components/
│       │   ├── Header.tsx
│       │   └── Header.module.css
│       ├── cadastro/
│       │   └── page.tsx
│       ├── produto/
│       │   └── [id]/
│       │       └── page.tsx
│       ├── page.tsx
│       └── page.module.css
├── package.json
└── next.config.js