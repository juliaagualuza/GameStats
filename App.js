import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

import jogos from './games.json';
import estatisticas from './estatisticas.json';

// IMAGEM LOCAL
const fortniteLocal = require('./fortnite.jpg');

export default function App() {

  const [jogoSelecionado, setJogoSelecionado] = useState(null);
  const [busca, setBusca] = useState('');
  const [generoSelecionado, setGeneroSelecionado] = useState('Todos');
  const [favoritos, setFavoritos] = useState([]);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  // QUIZ
  const [mostrarQuiz, setMostrarQuiz] = useState(false);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [resultadoResposta, setResultadoResposta] = useState(null);

  // CAPAS DOS JOGOS
  const capas = {
    "Minecraft":
      "https://upload.wikimedia.org/wikinews/en/7/7a/Minecraft_game_cover.jpeg",

    "Fortnite":
      fortniteLocal,

    "Mario Kart 8":
      "https://www.mariowiki.com/images/c/c2/MK8_JP_Box_Art.jpg",

    "GTA V":
      "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900_2x.jpg",

    "Red Dead Redemption 2":
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900_2x.jpg",

    "The Witcher 3":
      "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900_2x.jpg",

    "God of War":
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_600x900_2x.jpg",

    "Elden Ring":
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900_2x.jpg",

    "The Last of Us":
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900_2x.jpg",

    "FIFA 24":
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/library_600x900_2x.jpg",
  };

  // CONVERTE CAPA PARA O FORMATO CORRETO
  const obterFonteCapa = (capa) => {
    if (typeof capa === 'string') {
      return { uri: capa };
    }

    return capa;
  };

  // DESCRIÇÕES
  const descricoes = {

    "GTA V":
      "Grand Theft Auto V é um jogo de ação e mundo aberto ambientado em Los Santos. O jogador acompanha diferentes personagens enquanto realiza missões, explora a cidade e participa de diversas atividades.",

    "Minecraft":
      "Minecraft é um jogo de construção e sobrevivência em mundo aberto. O jogador pode explorar, coletar recursos, construir estruturas e enfrentar diferentes criaturas.",

    "Red Dead Redemption 2":
      "Red Dead Redemption 2 é uma aventura de mundo aberto ambientada no Velho Oeste. A história acompanha Arthur Morgan e sua gangue enquanto eles enfrentam os desafios de uma sociedade em transformação.",

    "Fortnite":
      "Fortnite é um jogo multiplayer que combina combate, construção e diferentes modos de jogo. O jogador compete contra outros participantes em partidas online.",

    "The Witcher 3":
      "The Witcher 3 é um RPG de mundo aberto que acompanha Geralt de Rívia em uma jornada por diferentes regiões, enfrentando monstros e tomando decisões que influenciam a história.",

    "Mario Kart 8":
      "Mario Kart 8 é um jogo de corrida em que o jogador compete com personagens do universo Mario em diferentes pistas, utilizando veículos e itens especiais para disputar a vitória.",

    "Cyberpunk 2077":
      "Cyberpunk 2077 é um RPG de ação ambientado em Night City. O jogador controla V e explora uma cidade futurista cheia de missões, personagens e possibilidades."
  };

  // PERGUNTAS DO QUIZ
  const perguntasQuiz = [

    {
      pergunta: "Minecraft foi lançado em 2011.",
      resposta: true
    },

    {
      pergunta: "GTA V foi lançado em 2015.",
      resposta: false
    },

    {
      pergunta: "Red Dead Redemption 2 pertence ao gênero Ação.",
      resposta: true
    },

    {
      pergunta: "Fortnite pertence ao gênero Battle Royale.",
      resposta: true
    },

    {
      pergunta: "The Witcher 3 está disponível para PC.",
      resposta: true
    },

    {
      pergunta: "Elden Ring foi lançado em 2022.",
      resposta: true
    },

    {
      pergunta: "The Last of Us pertence ao gênero RPG.",
      resposta: false
    },

    {
      pergunta: "FIFA 24 tem como plataforma Nintendo.",
      resposta: false
    },

    {
      pergunta: "Mario Kart 8 pertence ao gênero Corrida.",
      resposta: true
    },

    {
      pergunta: "God of War possui nota 9.4 no GameStats.",
      resposta: true
    }

  ];

  // FAVORITOS
  const alternarFavorito = (nomeJogo) => {

    if (favoritos.includes(nomeJogo)) {

      setFavoritos(
        favoritos.filter((jogo) => jogo !== nomeJogo)
      );

    } else {

      setFavoritos([
        ...favoritos,
        nomeJogo
      ]);

    }
  };

  const ehFavorito = (nomeJogo) => {
    return favoritos.includes(nomeJogo);
  };

  // FILTRO DOS JOGOS
  const jogosFiltrados = jogos.filter((jogo) => {

    const correspondeBusca = jogo.jogo
      .toLowerCase()
      .includes(busca.toLowerCase());

    const correspondeGenero =
      generoSelecionado === 'Todos' ||
      jogo.genero === generoSelecionado;

    return correspondeBusca && correspondeGenero;
  });

  // INICIAR QUIZ
  const iniciarQuiz = () => {

    setPerguntaAtual(0);
    setPontuacao(0);
    setRespostaSelecionada(null);
    setResultadoResposta(null);
    setMostrarQuiz(true);

  };

  // RESPONDER QUIZ
  const responderQuiz = (resposta) => {

    if (respostaSelecionada !== null) {
      return;
    }

    const acertou =
      resposta === perguntasQuiz[perguntaAtual].resposta;

    setRespostaSelecionada(resposta);
    setResultadoResposta(acertou);

    if (acertou) {
      setPontuacao(pontuacao + 1);
    }

  };

  // PRÓXIMA PERGUNTA
  const proximaPergunta = () => {

    setPerguntaAtual(perguntaAtual + 1);
    setRespostaSelecionada(null);
    setResultadoResposta(null);

  };

  // SAIR DO QUIZ
  const sairDoQuiz = () => {

    setMostrarQuiz(false);
    setPerguntaAtual(0);
    setPontuacao(0);
    setRespostaSelecionada(null);
    setResultadoResposta(null);

  };

  // TELA DO QUIZ
  if (mostrarQuiz) {

    // RESULTADO FINAL
    if (perguntaAtual >= perguntasQuiz.length) {

      return (
        <ScrollView style={styles.container}>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={sairDoQuiz}
          >
            <Text style={styles.textoVoltar}>
              ← Voltar
            </Text>
          </TouchableOpacity>

          <View style={styles.quizResultado}>

            <Text style={styles.quizTitulo}>
              🎉 Quiz finalizado!
            </Text>

            <Text style={styles.quizPontuacao}>
              Você acertou
            </Text>

            <Text style={styles.quizNumero}>
              {pontuacao} de {perguntasQuiz.length}
            </Text>

            <TouchableOpacity
              style={styles.botaoQuiz}
              onPress={iniciarQuiz}
            >
              <Text style={styles.textoBotaoQuiz}>
                Jogar novamente
              </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      );
    }

    // PERGUNTA ATUAL
    const pergunta = perguntasQuiz[perguntaAtual];

    return (
      <ScrollView style={styles.container}>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={sairDoQuiz}
        >
          <Text style={styles.textoVoltar}>
            ← Voltar
          </Text>
        </TouchableOpacity>

        <Text style={styles.quizTitulo}>
          🧠 Quiz Gamer
        </Text>

        <Text style={styles.quizProgresso}>
          Pergunta {perguntaAtual + 1} de {perguntasQuiz.length}
        </Text>

        <View style={styles.cardQuiz}>

          <Text style={styles.textoPergunta}>
            {pergunta.pergunta}
          </Text>

          <TouchableOpacity
            style={[
              styles.botaoResposta,
              respostaSelecionada !== null &&
                pergunta.resposta === true &&
                styles.respostaCorreta
            ]}
            onPress={() => responderQuiz(true)}
            disabled={respostaSelecionada !== null}
          >
            <Text style={styles.textoResposta}>
              ✅ Verdadeiro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.botaoResposta,
              respostaSelecionada !== null &&
                pergunta.resposta === false &&
                styles.respostaCorreta
            ]}
            onPress={() => responderQuiz(false)}
            disabled={respostaSelecionada !== null}
          >
            <Text style={styles.textoResposta}>
              ❌ Falso
            </Text>
          </TouchableOpacity>

          {resultadoResposta !== null && (

            <View>

              <Text
                style={[
                  styles.resultadoResposta,
                  resultadoResposta
                    ? styles.textoAcertou
                    : styles.textoErrou
                ]}
              >
                {resultadoResposta
                  ? '✅ Acertou!'
                  : '❌ Errou!'}
              </Text>

              <TouchableOpacity
                style={styles.botaoProxima}
                onPress={proximaPergunta}
              >
                <Text style={styles.textoBotaoQuiz}>
                  Próxima →
                </Text>
              </TouchableOpacity>

            </View>

          )}

        </View>

        <Text style={styles.pontuacaoAtual}>
          🏆 Pontuação: {pontuacao}
        </Text>

      </ScrollView>
    );
  }

  // TELA DE DETALHES
  if (jogoSelecionado) {

    return (
      <ScrollView style={styles.container}>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => setJogoSelecionado(null)}
        >
          <Text style={styles.textoVoltar}>
            ← Voltar
          </Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>
          🎮 Detalhes
        </Text>

        <View style={styles.cardDetalhes}>

          {capas[jogoSelecionado.jogo] && (
            <Image
              source={obterFonteCapa(capas[jogoSelecionado.jogo])}
              style={styles.capaDetalhes}
            />
          )}

          <View style={styles.tituloDetalhesLinha}>

            <Text style={styles.nomeDetalhes}>
              {jogoSelecionado.jogo}
            </Text>

            <TouchableOpacity
              onPress={() =>
                alternarFavorito(jogoSelecionado.jogo)
              }
            >
              <Text style={styles.coracao}>
                {ehFavorito(jogoSelecionado.jogo)
                  ? '❤️'
                  : '🤍'}
              </Text>
            </TouchableOpacity>

          </View>

          <Text style={styles.descricao}>
            {descricoes[jogoSelecionado.jogo] ||
              'Descrição não disponível para este jogo.'}
          </Text>

          <View style={styles.linhaInfo}>

            <Text style={styles.label}>
              ⭐ Nota
            </Text>

            <Text style={styles.valor}>
              {jogoSelecionado.nota}
            </Text>

          </View>

          <View style={styles.linhaInfo}>

            <Text style={styles.label}>
              🎯 Gênero
            </Text>

            <Text style={styles.valor}>
              {jogoSelecionado.genero}
            </Text>

          </View>

          <View style={styles.linhaInfo}>

            <Text style={styles.label}>
              🎮 Plataforma
            </Text>

            <Text style={styles.valor}>
              {jogoSelecionado.plataforma}
            </Text>

          </View>

          <View style={styles.linhaInfo}>

            <Text style={styles.label}>
              📅 Ano
            </Text>

            <Text style={styles.valor}>
              {jogoSelecionado.ano}
            </Text>

          </View>

        </View>

      </ScrollView>
    );
  }

  // TELA PRINCIPAL
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={true}
    >

      <Text style={styles.titulo}>
        🎮 GameStats
      </Text>

      <Text style={styles.subtitulo}>
        Descubra os melhores jogos
      </Text>

      <TextInput
        style={styles.input}
        placeholder="🔎 Buscar jogo..."
        value={busca}
        onChangeText={setBusca}
      />

      <Text style={styles.filtroTitulo}>
        Filtrar por gênero
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtros}
      >

        {[
          'Todos',
          'Ação',
          'RPG',
          'Sandbox',
          'Battle Royale',
          'Esportes',
          'Corrida'
        ].map((genero) => (

          <TouchableOpacity
            key={genero}
            style={[
              styles.botaoFiltro,
              generoSelecionado === genero &&
                styles.botaoFiltroAtivo
            ]}
            onPress={() =>
              setGeneroSelecionado(genero)
            }
          >

            <Text
              style={[
                styles.textoFiltro,
                generoSelecionado === genero &&
                  styles.textoFiltroAtivo
              ]}
            >
              {genero}
            </Text>

          </TouchableOpacity>

        ))}

      </ScrollView>

      {/* ESTATÍSTICAS */}

      <View style={styles.cardEstatisticas}>

        <Text style={styles.cardTitulo}>
          📊 Estatísticas
        </Text>

        <Text style={styles.cardTexto}>
          🎮 Total de jogos: {estatisticas.total_jogos}
        </Text>

        <Text style={styles.cardTexto}>
          ⭐ Nota média: {estatisticas.nota_media}
        </Text>

        <Text style={styles.cardTexto}>
          🏆 Melhor jogo: {estatisticas.melhor_jogo}
        </Text>

        <Text style={styles.cardTexto}>
          ⭐ Melhor nota: {estatisticas.melhor_nota}
        </Text>

        <Text style={styles.cardTexto}>
          🎯 Melhor gênero: {estatisticas.melhor_genero}
        </Text>

        <Text style={styles.cardTexto}>
          📈 Média do gênero: {estatisticas.media_melhor_genero}
        </Text>

      </View>

      {/* QUIZ */}

      <TouchableOpacity
        style={styles.cardQuizInicio}
        onPress={iniciarQuiz}
      >

        <Text style={styles.cardTitulo}>
          🧠 Quiz Gamer
        </Text>

        <Text style={styles.cardTexto}>
          Teste seus conhecimentos em 10 perguntas de verdadeiro ou falso.
        </Text>

      </TouchableOpacity>

      {/* FAVORITOS */}

      {mostrarFavoritos ? (

        <View>

          <TouchableOpacity
            style={styles.botaoVoltarFavoritos}
            onPress={() => setMostrarFavoritos(false)}
          >
            <Text style={styles.textoVoltarFavoritos}>
              ← Voltar
            </Text>
          </TouchableOpacity>

          <Text style={styles.listaTitulo}>
            ❤️ Meus Favoritos
          </Text>

        </View>

      ) : (

        <TouchableOpacity
          style={styles.cardFavoritos}
          onPress={() => setMostrarFavoritos(true)}
        >

          <Text style={styles.cardTitulo}>
            ❤️ Favoritos
          </Text>

          <Text style={styles.cardTexto}>
            {favoritos.length === 0
              ? 'Você ainda não adicionou jogos aos favoritos.'
              : `${favoritos.length} jogo(s) favorito(s)`}
          </Text>

        </TouchableOpacity>

      )}

      {/* LISTA DE JOGOS */}

      <Text style={styles.listaTitulo}>
        🏆 Jogos
      </Text>

      {(mostrarFavoritos
        ? jogos.filter((jogo) =>
            favoritos.includes(jogo.jogo)
          )
        : jogosFiltrados
      ).map((jogo, index) => (

        <View
          key={jogo.jogo}
          style={styles.cardJogo}
        >

          <TouchableOpacity
            style={styles.areaJogo}
            onPress={() =>
              setJogoSelecionado(jogo)
            }
          >

            {capas[jogo.jogo] && (
              <Image
                source={obterFonteCapa(capas[jogo.jogo])}
                style={styles.capa}
              />
            )}

            <View style={styles.informacoes}>

              <Text style={styles.posicao}>
                {index + 1}º lugar
              </Text>

              <Text style={styles.nome}>
                {jogo.jogo}
              </Text>

              <Text style={styles.cardTexto}>
                ⭐ Nota: {jogo.nota}
              </Text>

              <Text style={styles.cardTexto}>
                🎯 {jogo.genero}
              </Text>

              <Text style={styles.cardTexto}>
                🎮 {jogo.plataforma}
              </Text>

            </View>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoCoracao}
            onPress={() =>
              alternarFavorito(jogo.jogo)
            }
          >

            <Text style={styles.coracaoLista}>
              {ehFavorito(jogo.jogo)
                ? '❤️'
                : '🤍'}
            </Text>

          </TouchableOpacity>

        </View>

      ))}

      {(
        (mostrarFavoritos && favoritos.length === 0) ||
        (!mostrarFavoritos && jogosFiltrados.length === 0)
      ) && (

        <Text style={styles.semResultado}>
          {mostrarFavoritos
            ? '❤️ Você ainda não adicionou nenhum favorito.'
            : '😕 Nenhum jogo encontrado.'}
        </Text>

      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },

  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 14,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  filtroTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  filtros: {
    marginBottom: 20,
  },

  botaoFiltro: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  botaoFiltroAtivo: {
    backgroundColor: '#222',
    borderColor: '#222',
  },

  textoFiltro: {
    fontSize: 14,
    color: '#333',
  },

  textoFiltroAtivo: {
    color: 'white',
    fontWeight: 'bold',
  },

  cardEstatisticas: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
    elevation: 4,
  },

  cardQuizInicio: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
    elevation: 4,
  },

  cardFavoritos: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 18,
    marginBottom: 25,
    elevation: 4,
  },

  cardJogo: {
    backgroundColor: 'white',
    borderRadius: 18,
    marginBottom: 15,
    padding: 12,
    flexDirection: 'row',
    elevation: 3,
  },

  areaJogo: {
    flex: 1,
    flexDirection: 'row',
  },

  botaoCoracao: {
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 4,
  },

  capa: {
    width: 90,
    height: 125,
    borderRadius: 12,
    marginRight: 15,
  },

  capaDetalhes: {
    width: '100%',
    height: 350,
    borderRadius: 15,
    marginBottom: 25,
  },

  informacoes: {
    flex: 1,
    justifyContent: 'center',
  },

  cardTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  cardTexto: {
    fontSize: 16,
    marginBottom: 7,
  },

  listaTitulo: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  posicao: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#777',
  },

  nome: {
    fontSize: 19,
    fontWeight: 'bold',
    marginVertical: 7,
  },

  cardDetalhes: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
    elevation: 4,
  },

  nomeDetalhes: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
  },

  tituloDetalhesLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  coracao: {
    fontSize: 32,
    marginLeft: 10,
  },

  coracaoLista: {
    fontSize: 25,
  },

  descricao: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 20,
  },

  linhaInfo: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 15,
  },

  label: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },

  valor: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  botaoVoltar: {
    marginBottom: 20,
  },

  textoVoltar: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  botaoVoltarFavoritos: {
    marginBottom: 15,
  },

  textoVoltarFavoritos: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  // QUIZ

  quizTitulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  quizProgresso: {
    fontSize: 17,
    color: '#666',
    marginBottom: 20,
  },

  cardQuiz: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    marginBottom: 20,
  },

  textoPergunta: {
    fontSize: 23,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 25,
  },

  botaoResposta: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
  },

  respostaCorreta: {
    backgroundColor: '#dff5e1',
  },

  textoResposta: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  resultadoResposta: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },

  textoAcertou: {
    color: '#1a7f37',
  },

  textoErrou: {
    color: '#c62828',
  },

  botaoProxima: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
  },

  botaoQuiz: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },

  textoBotaoQuiz: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  pontuacaoAtual: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
  },

  quizResultado: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    elevation: 4,
    alignItems: 'center',
  },

  quizPontuacao: {
    fontSize: 20,
    marginTop: 15,
  },

  quizNumero: {
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 10,
  },

  semResultado: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 50,
  },

});
