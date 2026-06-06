# Quixa Tour 🪨

Sistema Integrado de Apoio ao Turismo Local — Quixadá, CE.

## Estrutura do Projeto

```
quixatour/
├── server.js        ← Backend (Node.js + Express)
├── app.js           ← Frontend JS (fetch, DOM dinâmico)
├── style.css        ← Estilos (inclui cards dinâmicos)
├── index.html       ← Página inicial
├── sobre.html       ← Sobre o projeto
├── servicos.html    ← Radar de serviços (dados via API)
├── catalogo.html    ← Catálogo turístico (dados via API)
├── contato.html     ← Formulário de contato
└── package.json
```

## Como rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o servidor backend

```bash
node server.js
```

O servidor sobe em `http://localhost:3000`

### 3. Abrir o frontend

Abra `index.html` no navegador (pode abrir direto pelo sistema de arquivos ou usar uma extensão como Live Server no VS Code).

> ⚠️ O frontend precisa do servidor rodando para carregar os dados dinâmicos.

---

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/pontos` | Lista todos os pontos turísticos |
| GET | `/api/pontos/:id` | Detalhe de um ponto específico |
| GET | `/api/servicos` | Lista os serviços do radar de entorno |
| GET | `/api/avaliacoes` | Lista todas as avaliações |
| GET | `/api/avaliacoes?pontoId=1` | Filtra avaliações por ponto |

### Exemplos de resposta

```json
// GET /api/pontos
[
  {
    "id": 1,
    "nome": "Monólitos de Quixadá",
    "categoria": "Natureza",
    "descricao": "Formações rochosas graníticas...",
    "horario": "Aberto 24h",
    "avaliacao": 4.9,
    "imagem": "https://..."
  }
]
```

## Páginas com conteúdo dinâmico

- **`catalogo.html`** — Carrega pontos turísticos via `GET /api/pontos` e avaliações via `GET /api/avaliacoes`
- **`servicos.html`** — Carrega serviços do radar via `GET /api/servicos`

## Tecnologias

- **Backend:** Node.js + Express + CORS
- **Frontend:** HTML5 semântico, CSS3 (variáveis, flexbox, grid, animações, media queries), JavaScript ES6+ (fetch, async/await, template literals)
