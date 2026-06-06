// app.js — Quixa Tour | Lógica dinâmica com fetch GET

const API_BASE = 'http://localhost:3000/api';

// ─── UTILITÁRIOS ─────────────────────────────────────────────────────────────

function estrelas(nota) {
  const cheia = '★';
  const vazia = '☆';
  const total = 5;
  return cheia.repeat(Math.round(nota)) + vazia.repeat(total - Math.round(nota));
}

function criarCardPonto(ponto) {
  return `
    <article class="card-ponto" data-id="${ponto.id}">
      <figure>
        <img src="${ponto.imagem}" alt="${ponto.nome}" onerror="this.src='https://via.placeholder.com/640x360?text=${encodeURIComponent(ponto.nome)}'">
        <figcaption>${ponto.categoria}</figcaption>
      </figure>
      <div class="card-body">
        <h3>${ponto.nome}</h3>
        <p>${ponto.descricao}</p>
        <p class="horario">🕐 ${ponto.horario}</p>
        <p class="avaliacao">${estrelas(ponto.avaliacao)} <span>${ponto.avaliacao.toFixed(1)}</span></p>
      </div>
    </article>
  `;
}

function criarCardServico(servico) {
  return `
    <article class="card-servico">
      <div class="servico-tipo">${servico.tipo}</div>
      <h3>${servico.nome}</h3>
      <p>${servico.descricao}</p>
      <p class="distancia">📍 ${servico.distancia}</p>
      <p class="telefone">📞 ${servico.telefone}</p>
    </article>
  `;
}

function criarCardAvaliacao(av) {
  return `
    <article class="card-avaliacao">
      <div class="av-header">
        <strong>${av.autor}</strong>
        <span class="av-nota">${estrelas(av.nota)}</span>
        <span class="av-data">${new Date(av.data).toLocaleDateString('pt-BR')}</span>
      </div>
      <p>${av.comentario}</p>
    </article>
  `;
}

// ─── CARREGAMENTO POR PÁGINA ──────────────────────────────────────────────────

async function carregarCatalogo() {
  const container = document.getElementById('catalogo-lista');
  if (!container) return;

  container.innerHTML = '<p class="loading">Carregando pontos turísticos...</p>';

  try {
    const res = await fetch(`${API_BASE}/pontos`);
    const pontos = await res.json();
    container.innerHTML = pontos.map(criarCardPonto).join('');
  } catch (err) {
    container.innerHTML = '<p class="erro">Não foi possível carregar os dados. Verifique se o servidor está rodando.</p>';
    console.error('Erro ao carregar catálogo:', err);
  }
}

async function carregarServicos() {
  const container = document.getElementById('servicos-lista');
  if (!container) return;

  container.innerHTML = '<p class="loading">Carregando serviços...</p>';

  try {
    const res = await fetch(`${API_BASE}/servicos`);
    const servicos = await res.json();
    container.innerHTML = servicos.map(criarCardServico).join('');
  } catch (err) {
    container.innerHTML = '<p class="erro">Não foi possível carregar os serviços. Verifique se o servidor está rodando.</p>';
    console.error('Erro ao carregar serviços:', err);
  }
}

async function carregarAvaliacoes() {
  const container = document.getElementById('avaliacoes-lista');
  if (!container) return;

  container.innerHTML = '<p class="loading">Carregando avaliações...</p>';

  try {
    const res = await fetch(`${API_BASE}/avaliacoes`);
    const avaliacoes = await res.json();
    container.innerHTML = avaliacoes.map(criarCardAvaliacao).join('');
  } catch (err) {
    container.innerHTML = '<p class="erro">Não foi possível carregar as avaliações. Verifique se o servidor está rodando.</p>';
    console.error('Erro ao carregar avaliações:', err);
  }
}

// ─── INICIALIZAÇÃO ────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  carregarCatalogo();
  carregarServicos();
  carregarAvaliacoes();
});
