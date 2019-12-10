/**
 * Objeto nodo:
 * 
    { father: ponteiro para nodo,    
      state: array[3][3],
      children: array de ponteiros para nodo,
      player: char,
      minimax: int }
 */

let state = []; // State do tabuleiro na tela
let end = true; // Variável para controlar se jogo está em curso
let initial; // Primeiro nodo da árvore
let current; // Ponteiro para o nodo que representa o estado atual do jogo
let stack = []; // Array de ponteiros para o nodo - usada para construir a árvore
let nodos = 0; // nodos na
let level = 1; // Nível de dificuldade
let firstCharacter = []; // Primeiro personagem
let secondCharacter = []; // Segundo personagem
let lunaCharacter = "assets/images/jogador1luna.png"; // imagem da Luna
let claudioCharacter = "assets/images/jogador2luna.png"; // imagem do claudio
let audioOnOff = true; // true = audio on | false = audio off
let whoPlay = Math.floor(Math.random() * 2); // Guarda quem joga
let twoPlayers = false; // Se true o jogo é entre dois jogadores se false é com a máquina
let playEffectHome = (audio = new Audio("./assets/audio/click1.wav")); // Audio de seleção
let playMusic = (audio = new Audio("./assets/audio/lunaMusic.mp3")); // Música de fundo
let playEffect = (audio = new Audio("./assets/audio/click.wav")); // Audio da jogada
let totalMove = 0;

/**
 * Elementos do DOM
 */
let selectCharacterEl = document.querySelector("#selectCharacter");
let tableEl = document.querySelector("#tableEl");
let boxMessageEl = document.querySelector("#boxMessage");
let ulPlayEl = document.querySelector("#ulPlay");
let fimJogoEl = document.querySelector("#fimJogo");
let fimJogoImgEl = document.querySelector("#vencedor").children[0];
let computerOnOffEl = document.querySelector("#computerOnOff");
let labelCPUEl = document.querySelector("#labelCPU");
let labelSomEl = document.querySelector("#labelSom");

window.onload = () => {
  showMessage("Selecione seu personagem:", "");
};

function start(player) {
  selectCharacter(player);
  playbackAudio();
  transitionForTable();
  initialize();
}

/**
 * Altera a dificuldade a partir da
 * seleção do usuário
 */
let changeLevel = value => {
  level = value;
  console.log(level);
};

function selectCharacter(player) {
  firstCharacter[0] = player === "luna" ? "x" : "o";
  firstCharacter[1] = player === "luna" ? lunaCharacter : claudioCharacter;
  firstCharacter[2] = player == "luna" ? "Luna" : "Cláudio";
  secondCharacter[0] = firstCharacter[0] === "x" ? "o" : "x";
  secondCharacter[1] = player === "luna" ? claudioCharacter : lunaCharacter;
  secondCharacter[2] = player === "luna" ? "Cláudio" : "Luna";
}

function transitionForTable() {
  if (selectCharacterEl.getElementsByClassName.display !== "none") {
    selectCharacterEl.style.display = "none";
    tableEl.style.display = "grid";
    animateCSS(tableEl, "fadeIn");
  }
}

function initialize() {
  state = [[], [], []];
  initial = null;
  current = null;
  end = false;
  displayState(state);
  if (whoPlay === 0) {
    showMessage("Quem joga é: ", firstCharacter[2]);
  } else {
    showMessage("Quem joga é: ", secondCharacter[2]);
    playCPU();
  }
}

function generateTree() {
  stack = []; // Limpa pilha
  nodos = 0; // zera nodos
  /**
   * Gera nodo inicial a partir do estado do tabuleiro na
   * tela (vazio ou com a primeira jogada)
   */
  initial = {
    father: null,
    state: state,
    children: [],
    player: firstCharacter[0],
    minimax: null
  };
  stack.push(initial); // Coloca nodo na pilha

  while (stack.length) {
    // Enquanto houver elementos na pilha
    nodo = stack.pop(); // Retira um nodo
    generateChildren(nodo); // Gera filho deste nodo
  }

  calculateMinimax(initial); // Calcula valores minimax a partir da inicial
  current = initial; // Situação current do jogo
}

function generateChildren(father) {
  let state = [];
  let player =
    father.player == secondCharacter ? firstCharacter[0] : secondCharacter; // Verifica de quem é a vez de jogar na rodada

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (father.state[i][j] == undefined) {
        // Se encontrou espaço vago no tabuleiro
        state = copyState(father.state); // Gera uma cópia do estado atual
        state[i][j] = player; // Adiciona a jogada
        let nodo = {
          // Cria um novo nodo para o filho
          father: father,
          state: state,
          children: [],
          player: player,
          minimax: null
        };
        nodo.minimax = itsTerminal(nodo.state, 0); // Se for nodo terminal, recebe valor de utility
        father.children.push(nodo); // adiciona esse nodo no array de children do nodo pai
        nodos++; // incrementa o número de nodos

        if (!nodo.minimax) {
          // Se o filho não é terminal, vai para a pilha, para gerar os filhos dele
          stack.push(nodo);
        }
      }
    }
  }
}

function calculateMinimax(nodo) {
  // Calcula o valor minimax de um nodo
  let i, min, max;
  // Level 2 sorteia entre boas jogadas e jogadas ruins
  level2 = Math.floor(Math.random() * 2);
  for (i = 0; i < nodo.children.length; i++) {
    // Percorre todos os filhos do nodo
    if (nodo.children[i].minimax === null) {
      // Se um filho ainda não tem um valor minimax (não é folha da árvore)
      calculateMinimax(nodo.children[i]); // Chama a função recursivamente para aquele filho
    }
    if (level == 3) {
      // Pega apenas as melhores jogadas
      if (max == undefined || nodo.children[i].minimax > max) {
        // Guarda o valor max (maior minimax entre os filhos)
        max = nodo.children[i].minimax;
      }
      if (min == undefined || nodo.children[i].minimax < min) {
        // Guarda o valor minn (menor minimax entre os filhos)
        min = nodo.children[i].minimax;
      }
    } else if (level == 2) {
      if (level2 == 1) {
        if (max == undefined || nodo.children[i].minimax > max) {
          // Guarda o valor max (maior minimax entre os filhos)
          max = nodo.children[i].minimax;
        }
        if (min == undefined || nodo.children[i].minimax < min) {
          // Guarda o valor minn (menor minimax entre os filhos)
          min = nodo.children[i].minimax;
        }
      } else {
        if (max == undefined || nodo.children[i].minimax < max) {
          // Guarda o valor max (maior minimax entre os filhos)
          max = nodo.children[i].minimax;
        }
        if (min == undefined || nodo.children[i].minimax > min) {
          // Guarda o valor minn (menor minimax entre os filhos)
          min = nodo.children[i].minimax;
        }
      }
    } else if (level == 1) {
      // Pega jogadas ruins
      if (max == undefined || nodo.children[i].minimax < max) {
        // Guarda o valor max (maior minimax entre os filhos)
        max = nodo.children[i].minimax;
      }
      if (min == undefined || nodo.children[i].minimax > min) {
        // Guarda o valor minn (menor minimax entre os filhos)
        min = nodo.children[i].minimax;
      }
    }
  }

  if (nodo.player == firstCharacter[0]) {
    nodo.minimax = max; // Se a próxima jogada é da CPU, retorna valor max
  } else {
    nodo.minimax = min; // Caso contrário, retorna valor min
  }
}

/**
 * - Verifica se o estado é terninal, retornando seu valor de utility
 * - Retorna null caso não seja um estado terminal
 * - closes = 0 para calcular o valor de utility durante a geração da árvore
 * - closes = 1 para verificar se o estado do jogo é terminal
 */
function itsTerminal(state, closes) {
  let whites = 0; // Responsável por guardar o número de casas em "branco"
  let utility = null; // guarda o valor de utility

  for (let y = 0; y < 3; y++) {
    // Testa linhas
    if (
      state[y][0] != undefined &&
      state[y][0] == state[y][1] &&
      state[y][0] == state[y][2]
    ) {
      utility = state[y][0] == secondCharacter ? 1 : -1; // utility 1 para CPU e 0 para humano
      if (closes === 1) {
        for (let i = 0; i < 3; i++) {
          document.getElementById(
            y.toString() + i.toString()
          ).style.backgroundColor = "#fff";
        }
      }
      break;
    }
  }

  if (!utility) {
    // Verifica se não encontrou estado terminal no laço anterior
    for (let x = 0; x < 3; x++) {
      // Testa colunas
      if (
        state[0][x] != undefined &&
        state[0][x] == state[1][x] &&
        state[0][x] == state[2][x]
      ) {
        utility = state[0][x] == secondCharacter ? 1 : -1; // utility 1 para CPU e 0 para humano
        if (closes === 1) {
          for (let i = 0; i < 3; i++) {
            document.getElementById(
              i.toString() + x.toString()
            ).style.backgroundColor = "#fff";
          }
        }
        break;
      }
    }
  }

  if (!utility) {
    // Verifica se não encontrou estado termninal nos laços anteriores
    if (
      state[1][1] != undefined && // Testa diagonais
      state[0][0] == state[1][1] &&
      state[0][0] == state[2][2]
    ) {
      utility = state[1][1] == secondCharacter ? 1 : -1; // utility 1 para CPU e 0 para humano
      if (closes === 1) {
        document.getElementById("00").style.backgroundColor = "#fff";
        document.getElementById("11").style.backgroundColor = "#fff";
        document.getElementById("22").style.backgroundColor = "#fff";
      }
    } else if (
      state[1][1] != undefined && // Testa diagonais
      state[0][2] == state[1][1] &&
      state[0][2] == state[2][0]
    ) {
      utility = state[1][1] == secondCharacter ? 1 : -1; // utility 1 para CPU e 0 para humano
      if (closes === 1) {
        document.getElementById("02").style.backgroundColor = "#fff";
        document.getElementById("11").style.backgroundColor = "#fff";
        document.getElementById("20").style.backgroundColor = "#fff";
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    // Conta as casas não jogadas
    for (let j = 0; j < 3; j++) {
      if (state[i][j] == undefined) {
        whites++;
      }
    }
  }

  if (utility) {
    // Se achou um vencedor
    if (closes) {
      // Se é para finalizar o jogo
      if (utility > 0) {
        // utility > 0, venceu CPU
        showMessage("Fim do jogo!");
        end = false;
        setTimeout(() => {
          gameOver(1);
          end = true;
        }, 2000);
      } else {
        showMessage("Fim do jogo!");
        end = true;
        setTimeout(() => {
          gameOver(-1);
        }, 2000);
      }
    } else {
      // Caso não seja para finalizar, retorna utility
      /**
       * Retorna o valor de utility - nó de casas vagas dá
       * um peso maior, favorecendo a escolha da jogada vitoriosa
       * mais rápida.
       */
      return utility * (whites + 1);
    }
  } else {
    // Caso não tenha encontrado vencedor
    if (!whites) {
      // Se não há mais casas vagas, então também é um estado terminal
      if (closes) {
        // Se é para finalizar o jogo
        showMessage("é empate novamente!");
        end = true;
        setTimeout(() => {
          gameOver(0);
          return null;
        }, 2000);
      } else {
        // Caso não seja para finalizar, irá retornar utility 0 (empate)
        return 0;
      }
    } else {
      // Caso ainda tenha jogadas disponíveis, apenas irá retornar null
      return null;
    }
  }
}

function gameOver(end) {
  if (end === 1) {
    showMessage(secondCharacter[2] + " ganhou!");
    secondCharacter[2] + " ganhou!";
    fimJogoImgEl.src =
      secondCharacter[0] === "x"
        ? "assets/images/luna-venceu.png"
        : "assets/images/claudio-venceu.png";
  } else if (end === -1) {
    showMessage(firstCharacter[2] + " ganhou!");
    fimJogoImgEl.src =
      firstCharacter[0] === "x"
        ? "assets/images/luna-venceu.png"
        : "assets/images/claudio-venceu.png";
  } else {
    showMessage("O jogo empatou!");
    fimJogoImgEl.src = "assets/images/Grupo 34.png";
  }
  tableEl.style.display = "none";
  fimJogoEl.style.display = "grid";
}

function playHuman(element) {
  let i = Number(element[0]); // Pega linha a partir da id do elemento
  let j = Number(element[1]); // Pega a coluna a partir da id do elemento
  if (state[i][j] != undefined) {
    // garantir que a casa ainda não foi jogada
    showMessage("Posição inválida!");
    return;
  } else {
    state[i][j] = firstCharacter[0]; // Jogada do humano
    displayState(state); // Atualizas o tabuleiro
  }

  if (!itsTerminal(state, 1)) {
    // Verifica se jogada do humano resultou em um state terminal
    if (!initial) {
      // Se o primeiro nodo for Null, árvore ainda não foi gerada (humano começa o jogo)
      generateTree(); // Initial é criado com o estado inicial, já com a jogada do humano
    } else {
      for (i = 0; i < current.children.length; i++) {
        // Procura nos children do state current, qual representa a situação após a jogada do humano
        if (compareStates(state, current.children[i].state)) {
          current = current.children[i];
          break;
        }
      }
    }
    atualizeWhoPlay(); // Atualiza e coloca na tela quem joga
    if (!end && !twoPlayers) playCPU(); // Passa a vez para a CPU
  }
}

function playCPU() {
  let max;
  let options = [];
  let r;

  if (!initial) {
    // Se initial é null, árvore ainda não foi gerada (CPU começa o jogo)
    generateTree();
  }
  /**
   * Avalia qual a melhor opção de jogada, dentre as possíveis (filhas do estado atual)
   */
  for (let i = 0; i < current.children.length; i++) {
    if (
      current.children[i].minimax != null &&
      (max == undefined || current.children[i].minimax > max)
    ) {
      max = current.children[i].minimax; // salva maior valor minimax dos filhos
    }
  }

  /**
   * Percorre novamente o filhos, checando todos que tenham o mesmo valor minimas ótimo
   */
  for (let i = 0; i < current.children.length; i++) {
    if (current.children[i].minimax == max) {
      options.push(i); // coloca o índice deste filho no array de opções de jogadas
    }
  }
  /**
   * Escolha aleatóriamente um dos índices, para dar mais variedades às jogadas
   */
  r = Math.floor(Math.random() * options.length);
  current = current.children[options[r]];
  state = current.state;
  displayState(state);

  let end = itsTerminal(state, 1); // Verifica se atingiu o state terminal, finalizando o jogo
  if (end === null) {
    atualizeWhoPlay(); // Atualiza e coloca na tela quem joga
  }
}

function changeCharacter() {
  showMessage("Selecione seu personagem:");
  clearBackground();
  fimJogo.style.display = "none";
  animateCSS(fimJogo, "zoomInDown");
  selectCharacterEl.style.display = "grid";
  animateCSS(selectCharacterEl, "zoomInDown");
}

function restart() {
  if (end != true || fimJogoEl.style.display == "grid") {
    clearBackground();
    fimJogo.style.display = "none";
    animateCSS(fimJogo, "zoomInDown");
    tableEl.style.display = "grid";
    animateCSS(tableEl, "zoomInDown");
    initialize();
  }
}

function clearBackground() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      document.getElementById(
        i.toString() + j.toString()
      ).style.backgroundColor = "#FF6400";
    }
  }
}

/**
 * Funções de display
 */

function displayState(state) {
  // Atualiza o tabuleiro
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      element = document.getElementById(i.toString() + j.toString());
      if (state[i][j] == undefined) {
        element.children[0].src = "assets/images/jogador0.png";
      } else {
        if (state) playSoundEffect();
        element.children[0].src =
          state[i][j] === firstCharacter[0]
            ? firstCharacter[1]
            : secondCharacter[1];
      }
    }
  }
}

function showMessage(msg, winner = "") {
  boxMessageEl.innerHTML = msg + winner;
}

function togglePlayer() {
  twoPlayers = !twoPlayers;
  let player = twoPlayers ? "group" : "computer";
  computerOnOffEl.innerHTML = player;
  labelCPUEl.innerHTML = twoPlayers
    ? "Jogar com </br>seu amigo"
    : "Jogar com </br>o Computador";
}

/**
 * funções auxiliares
 */

function copyState(state) {
  let newState = [];
  for (let i = 0; i < state.length; i++) {
    // Copia elementos do array
    newState[i] = state[i].slice(0); // Cecessário para evitar a cópia por referência
  }
  return newState;
}

function compareStates(state1, state2) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (state1[i][j] != state2[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function atualizeWhoPlay() {
  whoPlay = whoPlay === 0 ? 1 : 0;
  if (whoPlay === 0) {
    showMessage("Quem joga é: ", firstCharacter[2]);
  } else {
    showMessage("Quem joga é: ", secondCharacter[2]);
  }
}

/**
 * Efeitos de som
 */

function toggleAudio() {
  audioOnOff = !audioOnOff;
  let icon;
  let el = document.getElementById("audioOnOff");
  if (!audioOnOff) {
    icon = "volume_off";
    el.innerHTML = icon;

    playMusic.pause();
  } else {
    icon = "volume_up";
    el.innerHTML = icon;

    playMusic.play();
  }
}

function playbackAudio() {
  if (audioOnOff) {
    playMusic.currentTime = 0;
    playMusic.loop = true;
    playMusic.autoplay = true;
    playMusic.preload = "none";
    let playPromise = playMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {}).catch(error => {});
    }
  }
}

function soundEffectHome() {
  if (audioOnOff) {
    playEffectHome.currentTime = 0;
    playEffectHome.autoplay = true;
    playEffectHome.preload = "none";
    let playPromise = playEffectHome.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {}).catch(error => {});
    }
  }
}

let playSoundEffect = () => {
  if (audioOnOff) {
    playEffect.currentTime = 0;
    let playPromise = playEffect.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {}).catch(error => {});
    }
  }
};

/**
 * Função para uso da biblioteca animate.css
 */

function animateCSS(element, animationName, callback) {
  element.classList.add("animated", animationName);
  function handleAnimationEnd() {
    element.classList.remove("animated", animationName);
    element.removeEventListener("animationend", handleAnimationEnd);
    if (typeof callback === "function") callback();
  }
  element.addEventListener("animationend", handleAnimationEnd);
}
