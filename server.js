const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ─── DADOS ───────────────────────────────────────────────────────────────────

const pontos = [
  {
    id: 1,
    nome: "Monólitos de Quixadá",
    categoria: "Natureza",
    descricao: "Formações rochosas graníticas únicas no mundo, símbolo da cidade. Excelentes para escalada e contemplação.",
    horario: "Aberto 24h (acesso ao mirante: 6h–18h)",
    avaliacao: 4.9,
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Monolitos_quixada.jpg/640px-Monolitos_quixada.jpg"
  },
  {
    id: 2,
    nome: "Açude do Cedro",
    categoria: "Histórico",
    descricao: "Inaugurado em 1906, foi o primeiro açude construído pelo governo federal no Brasil. Paisagem belíssima e rica história.",
    horario: "Seg–Dom: 7h–17h",
    avaliacao: 4.7,
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Acude_cedro_quixada.jpg/640px-Acude_cedro_quixada.jpg"
  },
  {
    id: 3,
    nome: "Serra do Estevão",
    categoria: "Natureza",
    descricao: "Trilha com vista panorâmica da cidade e do Açude do Cedro. Local perfeito para caminhadas ao amanhecer.",
    horario: "Recomendado: 5h30–9h",
    avaliacao: 4.8,
    imagem: "https://via.placeholder.com/640x360?text=Serra+do+Estevc3a3o"
  },
  {
    id: 4,
    nome: "Gruta de Nossa Senhora de Lourdes",
    categoria: "Religioso",
    descricao: "Santuário encravado nas rochas, ponto de peregrinação e espiritualidade. Arquitetura integrada à pedra nativa.",
    horario: "Seg–Dom: 6h–18h",
    avaliacao: 4.6,
    imagem: "https://via.placeholder.com/640x360?text=Gruta+de+Lourdes"
  },
  {
    id: 5,
    nome: "Museu de Monteiro Lobato",
    categoria: "Cultural",
    descricao: "Espaço dedicado ao escritor que morou em Quixadá. Acervo com manuscritos, fotos históricas e objetos pessoais.",
    horario: "Ter–Sáb: 8h–12h / 14h–17h",
    avaliacao: 4.5,
    imagem: "https://via.placeholder.com/640x360?text=Museu+Monteiro+Lobato"
  }
];

const servicos = [
  {
    id: 1,
    nome: "Restaurante Pedra & Sabor",
    tipo: "Restaurante",
    descricao: "Culinária regional sertaneja. Especialidade em carne de sol e feijão verde.",
    distancia: "120m do Açude do Cedro",
    telefone: "(88) 99900-0001"
  },
  {
    id: 2,
    nome: "Pousada Monólito",
    tipo: "Hospedagem",
    descricao: "Vista privilegiada para as pedras. Café da manhã incluso com tapioca e queijo coalho.",
    distancia: "300m dos Monólitos",
    telefone: "(88) 99900-0002"
  },
  {
    id: 3,
    nome: "Guias do Sertão",
    tipo: "Guia Turístico",
    descricao: "Trilhas guiadas pelos monólitos e serras. Grupos de até 10 pessoas. Agendamento prévio.",
    distancia: "Centro da cidade",
    telefone: "(88) 99900-0003"
  },
  {
    id: 4,
    nome: "Arte Sertaneja",
    tipo: "Artesanato",
    descricao: "Loja de artesanato local: cerâmica, cordel, bordados e esculturas em pedra-sabão.",
    distancia: "50m da Praça Central",
    telefone: "(88) 99900-0004"
  }
];

const avaliacoes = [
  { id: 1, autor: "Maria S.", pontoId: 1, nota: 5, comentario: "Simplesmente incrível! As pedras ao pôr do sol são inesquecíveis.", data: "2026-05-20" },
  { id: 2, autor: "João P.", pontoId: 2, nota: 5, comentario: "Muito histórico. Guia explica muito bem a construção do açude.", data: "2026-04-15" },
  { id: 3, autor: "Ana R.", pontoId: 1, nota: 4, comentario: "Lindo demais! A trilha é um pouco íngreme mas vale cada passo.", data: "2026-05-30" },
  { id: 4, autor: "Carlos M.", pontoId: 3, nota: 5, comentario: "Vista 360° da cidade. Fui no nascer do sol e foi mágico.", data: "2026-06-01" },
  { id: 5, autor: "Fernanda L.", pontoId: 4, nota: 4, comentario: "Lugar muito bonito e tranquilo. Recomendo visitar no fim de tarde.", data: "2026-05-10" }
];

// ─── ROTAS ────────────────────────────────────────────────────────────────────

// Rota 1: Lista todos os pontos turísticos
app.get('/api/pontos', (req, res) => {
  res.json(pontos);
});

// Rota 2: Lista todos os serviços do radar de entorno
app.get('/api/servicos', (req, res) => {
  res.json(servicos);
});

// Rota 3: Lista avaliações (opcionalmente filtradas por pontoId)
app.get('/api/avaliacoes', (req, res) => {
  const { pontoId } = req.query;
  if (pontoId) {
    const filtradas = avaliacoes.filter(a => a.pontoId === parseInt(pontoId));
    return res.json(filtradas);
  }
  res.json(avaliacoes);
});

// Rota 4 (bônus): Detalhe de um ponto específico
app.get('/api/pontos/:id', (req, res) => {
  const ponto = pontos.find(p => p.id === parseInt(req.params.id));
  if (!ponto) return res.status(404).json({ erro: 'Ponto não encontrado' });
  res.json(ponto);
});

// ─── START ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Quixa Tour API rodando em http://localhost:${PORT}`);
});
