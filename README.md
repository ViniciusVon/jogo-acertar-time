# Nome do Projeto

Este projeto foi desenvolvido para a disciplina de [Nome da Disciplina] e tem como objetivo [breve descrição do objetivo do projeto].

## 👥 Integrante

- Vinícius von Glehn Severo | 2312130010 – [@ViniciusVon](https://github.com/ViniciusVon)

## 🚀 Funcionalidades

- [x] Listagem de times
- [x] Edição de times
- [x] Remoção com confirmação
- [x] Criação de times com seleção de país
- [x] Jogo com dados de clubes das maiores ligas do planeta por api externa (necessita de token da página football-data.org)
- [x] Jogo personalizado com seleção de times
- [x] Validações de entrada
- [x] Interface amigável usando Material UI

## 🛠️ Tecnologias utilizadas

- React
- TypeScript
- Material UI (MUI)
- Axios
- ESLint com TypeScript e React Hooks

## 🧰 Estrutura do projeto

```
/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── GuessGame.tsx
│   ├── context/
│   │   └── TeamContext.tsx
│   ├── pages/
│   │   ├── TeamListPage.tsx
│   │   ├── CountryGamePage.tsx
│   │   └── CustomGamePage.tsx
│   ├── App.tsx
│   ├── main.tsx
├── eslint.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## ✅ Requisitos para rodar o projeto

- Node.js (versão recomendada: 18.x ou superior)
- npm ou yarn

## ▶️ Como executar

1. Clone o repositório:

```bash
git clone https://github.com/ViniciusVon/jogo-acertar-time.git
```

2. Acesse a pasta do projeto:

```bash
cd jogo-acertar-time
```

3. Instale as dependências tanto para o frontend quanto para o backend:

```bash
cd frontend
# ou
cd backend
```

```bash
npm install
# ou
yarn install
```

4. Construa o projeto com tanto no frontend quanto no backend:

```bash
npm run build
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O app estará disponível em `http://localhost:5173`.

---

**Importante:** Este repositório está público conforme as diretrizes da disciplina.