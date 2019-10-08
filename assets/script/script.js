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
let initial; // Primeiro nodo da árvore
let current; // Ponteiro para o nodo que representa o estado atual do jogo
let stack = []; // Array de ponteiros para o nodo - usada para construir a árvore
let nodos = 0; // nodos na árvore
let firstCharacter = 'x'; // Primeiro personagem
let secondCharacter = 'o'; // Segundo personagem

window.onload = function () {
  initialize();
};

function initialize () {
  state = [[], [], []];
  initial = null;
  current = null;
  displayState(state);
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
    player: firstCharacter,
    minimax: null
  }
  stack.push(initial); // Coloca nodo na pilha

  while (stack.length) { // Enquanto houver elementos na pilha
    nodo = stack.pop(); // Retira um nodo
    generateChildren(nodo); // Gera filho deste nodo
  }

  calculateMinimax(initial); // Calcula valores minimax a partir da inicial
  current = initial; // Situação current do jogo
}

function generateChildren(father) {
  let state = [];
  let player = (father.player == secondCharacter) ? firstCharacter : secondCharacter; // Verifica de quem é a vez de jogar na rodada

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (father.state[i][j] == undefined) { // Se encontrou espaço vago no tabuleiro
        state = copyState(father.state); // Gera uma cópia do estado atual
        state[i][j] = player; // Adiciona a jogada
        let nodo = { // Cria um novo nodo para o filho
          father: father,
          state: state,
          children: [],
          player: player,
          minimax: null
        }
        nodo.minimax = itsTerminal(nodo.state, 0); // Se for nodo terminal, recebe valor de utility
        father.children.push(nodo); // adiciona esse nodo no array de children do nodo pai
        nodos++; // incrementa o número de nodos

        if (!nodo.minimax) { // Se o filho não é terminal, vai para a pilha, para gerar os filhos dele
          stack.push(nodo);
        }
      }
    }
  }
}

function calculateMinimax(nodo) { // Calcula o valor minimax de um nodo
  let i, min, max;

  for (i = 0; i < nodo.children.length; i++) { // Percorre todos os filhos do nodo
    if (nodo.children[i].minimax === null) { // Se um filho ainda não tem um valor minimax (não é folha da árvore)
      calculateMinimax(nodo.children[i]); // Chama a função recursivamente para aquele filho
    }
    if (max == undefined || nodo.children[i].minimax > max) { // Guarda o valor max (maior minimax entre os filhos)
      max = nodo.children[i].minimax;
    }
    if (min == undefined || nodo.children[i].minimax < min) { // Guarda o valor minn (menor minimax entre os filhos)
      min = nodo.children[i].minimax;
    }
  }
  if (nodo.player == firstCharacter) {
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
  let whites = 0; // Responsavel por guardar o número de casas em "branco"
  let utility = null; // guarda o valor de utility

  for (let y = 0; y < 3; y++) { // Testa linhas
    if (state[y][0] != undefined && state[y][0] == state[y][1] && state[y][0] == state[y][2]) {
      utility = (state[y][0] == secondCharacter) ? 1 : -1; // utility 1 para CPU e 0 para humano
      break;
    }
  }

  if (!utility) { // Verifica se não encontrou estado terminal no laço anterior
    for (let x = 0; x < 3; x++) { // Testa colunas
      if (state[0][x] != undefined && state[0][x] == state[1][x] && state[0][x] == state[2][x]) {
        utility = (state[0][x] == secondCharacter) ? 1 : -1; // utility 1 para CPU e 0 para humano
        break;
      }
    }
  }

  if (!utility) { // Verifica se não encontrou estado termninal nos laços anteriores
    if (state[1][1] != undefined && ( // Testa diagonais
      (state[0][0] == state[1][1] && state[0][0] == state[2][2]) ||
      (state[0][2] == state[1][1] && state[0][2] == state[2][0])
    )) {
      utility = (state[1][1] == secondCharacter) ? 1 : -1; // utility 1 para CPU e 0 para humano
    }
  }
  
  for (let i = 0; i < 3; i++) { // Conta as casas não jogadas
    for (let j = 0; j < 3; j++) {
      if (state[i][j] == undefined) {
        whites++;
      }
    }
  }

  if (utility) { // Se achou um vencedor
    if (closes) { // Se é para finalizar o jogo
      if (utility > 0) { // utility > 0, venceu CPU
        showMessage("CPU ganhou!", "Obrigado por jogar!");
        initialize();
      } else {
        showMessage("Você ganhou!", "UUAAUUU!!!");
        initialize();
      }
    } else { // Caso não seja para finalizar, retorna utility
      /**
       * Retorna o valor de utility - nó de casas vagas dá
       * um peso maior, favorecendo a escolha da jogada vitoriosa 
       * mais rápida.
       */
      return utility * (whites + 1);
    }
  } else { // Caso não tenha encontrado vencedor
    if (!whites) { // Se não há mais casas vagas, então também é um estado terminal
      if (closes) { // Se é para finalizar o jogo
        showMessage("é empate novamente!", ':-;');
        initialize();
      } else { // Caso não seja para finalizar, irá retornar utility 0 (empate)
        return 0;
      }
    } else { // Caso ainda tenha jogadas disponíveis, apenas irá retornar null
      return null;
    }
  }
}

function playHuman(element) {
  let i = Number(element[0]); // Pega linha a partir da id do elemento
  let j = Number(element[1]); // Pega a coluna a partir da id do elemento
  if (state[i][j] != undefined) { // garantir que a casa ainda não foi jogada
    showMessage("Posição inválida!", i.toString() + ' = ' + j.toString());
    return;
  } else {
    state[i][j] = firstCharacter; // Jogada do humano
    displayState(state); // Atualizas o tabuleiro
  }

  if (!itsTerminal(state, 1)) { // Verifica se jogada do humano resultou em um state terminal
    if (!initial) { // Se o primeiro nodo for Null, árvore ainda não foi gerada (humano começa o jogo)
      generateTree(); // Initial é criado com o estado inicial, já com a jogada do humano
    } else {
      for (i = 0; i < current.children.length; i++) { // Procura nos children do state current, qual representa a situação após a jogada do humano
        if (compareStates(state, current.children[i].state)) {
          current = current.children[i];
          break;
        }
      }
    }
    playCPU(); // Passa a vez para a CPU
  }
}

function playCPU() {
  let max;
  let options = [];
  let r;

  if (!initial) { // Se initial é null, árvore ainda não foi gerada (CPU começa o jogo)
    generateTree();
  }
  /**
   * Avalia qual a melhor opção de jogada, dentre as possíveis (filhas do estado atual)
   */
  for (let i = 0; i < current.children.length; i++) {
    if (current.children[i].minimax != null && (max == undefined || current.children[i].minimax > max)) {
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

itsTerminal(state, 1); // Verifica se atingiu o state terminal, finalizando o jogo
}

/**
 * Funções de display
 */

function displayState(state) { // Atualiza o tabuleiro
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        element = document.getElementById(i.toString() + j.toString());
        if (state[i][j] == undefined) {
          element.children[0].src = 'assets\/images\/jogador0.png';
        } else {
          element.children[0].src = (state[i][j] == firstCharacter) ? 'assets\/images\/jogador1luna.png' : 'assets\/images\/jogador2luna.png';
        }
      }
    }
}

function showMessage(msg, winner = '') {
  console.log(msg + '\n' + winner);
}

/**
 * funções auxiliares
 */

 function copyState(state) {
  let newState = [];
  for (let i = 0; i < state.length; i++) { // Copia elementos do array
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