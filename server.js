// ============================================================
//  API DE PLAYLIST  -  Relacionando Musicas e Artistas
//  Backend 2DAT2  -  3o Trimestre
//  O frontend ja esta pronto em public/. Complete os TODOs.
// ============================================================
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// ---- LISTA 1: artistas (cada um tem um id) ----
const artistas = [
  {id: 1, nome: "legiao Urbana", pais: "Brasil"},
  {id: 2, nome: "Queen", pais: "Reino Unido"},
  {id: 3, nome: "Shakira", pais: "Colômbia"},
  {id: 4, nome: "The Living Tombstone", pais: "França"},
];

// ---- LISTA 2: musicas (guardam so o artistaId, nao o nome) ----
const musicas = [
  {id: 1, titulo: "Indios", artistaId: 1, duracao: 297  },
  {id: 2, titulo: "Champions", artistaId: 2, duracao: 182 },
  {id: 3, titulo: "waka waka", artistaId: 3, duracao: 211 },
  {id: 4, titulo: "My Ordinary Life" , artistaId: 4, duracao: 246 },
  {id: 5, titulo: "Discord" , artistaId: 4, duracao: 194 },
  {id: 6, titulo: "Fnaf 1" , artistaId: 4, duracao: 178 },
];

// 1) LISTAR ARTISTAS
app.get("/artistas", (req, res) => {
  res.status(200).json(artistas);
});

// 2) LISTAR MÚSICAS (com dados do artista agregados)
app.get("/musicas", (req, res) => {
  const resultado = musicas.map((m) => {
    const artista = artistas.find((a) => a.id === m.artistaId);
    return {
      id: m.id, // Adicionado para manter consistência de ID se precisar no front
      titulo: m.titulo,
      duracao: m.duracao,
      artista: artista ? artista.nome : "Desconhecido", // Mudado de 'artistas' para 'artista' (singular)
      pais: artista ? artista.pais : "-", // Removido o acento da chave 'país' para evitar problemas em algumas propriedades JSON
    };
  });
  res.status(200).json(resultado);
});

// 3) LISTAR MÚSICAS DE UM ARTISTA ESPECÍFICO
app.get("/artistas/:id/musicas", (req, res) => {
  const id = Number(req.params.id);
  
  // Opcional: Verificar se o artista realmente existe antes de filtrar
  const artistaExiste = artistas.some((a) => a.id === id);
  if (!artistaExiste) {
    return res.status(404).json({ erro: "Artista não encontrado" });
  }

  const doArtista = musicas.filter((m) => m.artistaId === id);
  res.status(200).json(doArtista);
});

app.listen(PORT, () => {
  console.log(`Playlist no ar: http://localhost:${PORT}`);
});


// 2) LISTAR MUSICAS  (juntando cada musica com o seu artista)

  // TODO: use map para percorrer 'musicas'.
  //       para cada musica, use find em 'artistas' para achar
  //       aquele cujo id === m.artistaId.
  //       devolva um objeto com: titulo, duracao, artista (nome) e pais.
  //       lembre: find pode devolver undefined -> trate com ? :



