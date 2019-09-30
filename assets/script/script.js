// Variáveis
let game; // situação do jogo
let board; // situação da view
let audioOnOff = true; // true = audio on | false = audio off
let gameLevel = 1; // Guarda o nível de dificuldade
let myCharacter; // meu Jogador
let computerCharacter; // computador || outro player
let machineOnOff = true; // Jogo contra a máquina -> on - true | off = false
let inProgress; // verifica se o jogo está em andamento
let totalMove; // Contador do números de jogadas
let whoStarts; // 0 = jogador 1 = cpu
let checkTheVictory; // verifica condição de vitória
let whoPlays = 0; // 0 = jogador 1 = cpu
let playEffectHome = audio = new Audio('./assets/audio/click1.wav'); // Audio da jogada
let playMusic = audio = new Audio('./assets/audio/lunaMusic.mp3'); // Música de fundo
let playEffect = audio = new Audio('./assets/audio/click.wav'); // Audio da jogada

// Elementos
let introEl = document.querySelector('#intro');
let containerEl = document.querySelector('#container');
let loaderEl = document.querySelector('.intro-loader');
let selectCharacterEl = document.querySelector('#selectCharacter');
let tableEl = document.querySelector('#tableEl');
let cel1El = document.getElementById('cel1');
let cel2El = document.getElementById('cel2');
let cel3El = document.getElementById('cel3');
let cel4El = document.getElementById('cel4');
let cel5El = document.getElementById('cel5');
let cel6El = document.getElementById('cel6');
let cel7El = document.getElementById('cel7');
let cel8El = document.getElementById('cel8');
let cel9El = document.getElementById('cel9');
let whoPlayerEl = document.getElementById('whoPlayer');
let whoStartsEl = document.getElementById('whoStarts');
let whoPlayEl = document.getElementById('whoPlay');
let whoWinEl = document.getElementById('whoWin');
let btnPlayEl = document.getElementById('play');
let LabelPlayEl = document.getElementById('labelPlay');
let ulNivelEl = document.getElementById('ulNivel');
let fimJogoEl = document.getElementById('fimJogo');
let vencedorEl = document.getElementById('vencedor');
let ulPlayEl = document.getElementById('ulPlay')

// Funções

// Função para utilizar com o animate.css
function animateCSS(element, animationName, callback) {
  element.classList.add('animated', animationName);
  function handleAnimationEnd() {
    element.classList.remove('animated', animationName)
    element.removeEventListener('animationend', handleAnimationEnd)
    if (typeof callback === 'function') callback()
  }
  element.addEventListener('animationend', handleAnimationEnd)
}

// let loader = () => {
//   setTimeout(() => {
//     loaderEl.style.opacity = 1;
//     animateCSS(loaderEl, 'flipInX', () => {
//       setTimeout(() => {
//         animateCSS(introEl, 'flipOutX');
//       }, 6000);
//     });
//     setTimeout(() => {
//       introEl.style.display = 'none';
//       containerEl.style.display = 'block';
//       animateCSS(container, 'fadeIn');
//     }, 8000);
//   }, 2000);
// }

let toggleAudio = () => {
  audioOnOff = !audioOnOff;
  let icon;
  let el = document.getElementById('audioOnOff');
  if (!audioOnOff) {
    icon = 'volume_off';
    el.innerHTML = icon;
    playMusic.pause();
  } else {
    icon = 'volume_up';
    el.innerHTML = icon;
    playMusic.play();
  }
}

let togglePlayer = () => {
  machineOnOff = !machineOnOff;
  let icon;
  let el = document.getElementById('computerOnOff');
  let label = document.getElementById('labelCPU');
  if (!machineOnOff) {
    icon = 'sports_kabaddi';
    el.innerHTML = icon;
    label.innerHTML = 'Jogador'
    ulNivelEl.style.display = 'none';
  } else {
    icon = 'computer';
    el.innerHTML = icon;
    label.innerHTML = 'CPU'
    ulNivelEl.style.display = 'block';
  }
}

let play = (position) => {
  if (inProgress && whoPlays === 0) {
    switch (position) {
      case 'cel1':
        if (game[0][0] === "") {
            game[0][0] = myCharacter;
            whoPlays = 1;
        }
        break;
      case 'cel2':
        if (game[0][1] === "") {
          game[0][1] = myCharacter;
          whoPlays = 1;
        }
        break;
      case 'cel3':
        if (game[0][2] === "") {
          game[0][2] = myCharacter;
          whoPlays = 1;
        }
        break;
      case 'cel4':
        if (game[1][0] === "") {
          game[1][0] = myCharacter;
          whoPlays = 1;
        }
        break;
      case 'cel5':
        if (game[1][1] === "") {
          game[1][1] = myCharacter;
          whoPlays = 1;
        }
        break;
      case 'cel6':
        if (game[1][2] === "") {
          game[1][2] = myCharacter;
          whoPlays = 1;
        }
        break;
      case 'cel7':
        if (game[2][0] === "") {
          game[2][0] = myCharacter;
          whoPlays = 1;
        }
        break;
      case 'cel8':
        if (game[2][1] === "") {
          game[2][1] = myCharacter;
          whoPlays = 1;
        }
        break;
      case 'cel9':
        if (game[2][2] === "") {
          game[2][2] = myCharacter;
          whoPlays = 1;
        }
        break;
    }
    if (whoPlays === 1) {
      checkTheVictory = verifyVictory();
      console.log('checkTheVictory', checkTheVictory);      
      totalMove++;
      console.log('totalMove', totalMove);
      updateBoard();
      endGame();
      cpuMoves();
      updateWhoPlays();
    }
  } else if (inProgress && whoPlays === 1 && !machineOnOff) {
    switch (position) {
      case 'cel1':
        if (game[0][0] === "") {
          game[0][0] = computerCharacter;
          whoPlays = 0;
        }
        break;
      case 'cel2':
        if (game[0][1] === "") {
          game[0][1] = computerCharacter;
          whoPlays = 0;
        }
        break;
      case 'cel3':
        if (game[0][2] === "") {
          game[0][2] = computerCharacter;
          whoPlays = 0;
        }
        break;
      case 'cel4':
        if (game[1][0] === "") {
          game[1][0] = computerCharacter;
          whoPlays = 0;
        }
        break;
      case 'cel5':
        if (game[1][1] === "") {
          game[1][1] = computerCharacter;
          whoPlays = 0;
        }
        break;
      case 'cel6':
        if (game[1][2] === "") {
          game[1][2] = computerCharacter;
          whoPlays = 0;
        }
        break;
      case 'cel7':
        if (game[2][0] === "") {
          game[2][0] = computerCharacter;
          whoPlays = 0;
        }
        break;
      case 'cel8':
        if (game[2][1] === "") {
          game[2][1] = computerCharacter;
          whoPlays = 0;
        }
        break;
      case 'cel9':
        if (game[2][2] === "") {
          game[2][2] = computerCharacter;
          whoPlays = 0;
        }
        break;
    }
    if (whoPlays === 0) {
      checkTheVictory = verifyVictory();
      console.log('checkTheVictory', checkTheVictory);
      totalMove++;
      console.log('totalMove', totalMove);
      updateBoard();
      endGame();
      cpuMoves();
      updateWhoPlays();
    }
  }
}

let cleanLastWin = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j].children[0].style.backgroundColor = '#FF6400';
    }
  }
}

let changeCharacter = () => {
  cleanLastWin();
  fimJogoEl.style.display = 'none';
  selectCharacterEl.style.display = 'grid';
}

let theEndRestart = () => {
  cleanLastWin();
  fimJogoEl.style.display = 'none';
  tableEl.style.display = 'grid';
  player = (myCharacter === 'x') ? 'luna' : 'claudio';
  start(player);
}

let restart = () => {
  cleanLastWin();
  player = (myCharacter === 'x') ? 'luna' : 'claudio';
  start(player);
}

let playEffectHomeFunc = () => {
  if (audioOnOff) {
    playEffectHome.currentTime = 0;
    playEffectHome.autoplay = true;
    playEffectHome.preload = 'none';
    let playPromise = playEffectHome.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
      }).catch(error => {
      });
    }
  }
}

let playEffectFunction = () => {
  if (audioOnOff) {
    playEffect.currentTime = 0;
    let playPromise = playEffect.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
      }).catch(error => {
      });
    }
  }
}

let playbackAudio = () => {
  console.log('playBackAudio')
  if (audioOnOff) {
    playMusic.currentTime = 0;
    playMusic.loop = true;
    playMusic.autoplay = true;
    playMusic.preload = 'none';
    let playPromise = playMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
      }).catch(error => {
      });
    }
  }
}

/**
 * Altera a dificuldade a partir da 
 * seleção do usuário
 */
let changeLevel = (value) => {
  gameLevel = value;
  console.log(gameLevel);  
}

/**
 * Define quem inicia
 */
let firstPlayer = () => {
  if (!whoStarts) {
    return whoStarts = Math.floor(Math.random() * 2);
  } else {
    return whoStarts = (whoStarts === 0) ? 1 : 0;
  }
}

let cpuMoves = () => {
  if (inProgress === true && machineOnOff) {
    setTimeout(() => {
      let i, j;
      if (gameLevel == 1) {
        console.log('Entrou level 1');
        
        do {
          i = Math.round(Math.random() * 2);
          j = Math.round(Math.random() * 2);
        } while (game[i][j]);
        game[i][j] = computerCharacter;
      } else if (gameLevel == 2) {
        console.log('entrou level 2');
        // Ataque
        // Linha 1
        if (game[0][0] === myCharacter && game[0][1] === myCharacter && game[0][2] === '') {
          game[0][2] = computerCharacter;
        } else if (game[0][0] === myCharacter && game[0][2] === myCharacter && game[0][1] === '') {
          game[0][1] = computerCharacter;
        } else if (game[0][1] === myCharacter && game[0][2] === myCharacter && game[0][0] === '') {
          game[0][0] = computerCharacter;
        } else if (game[1][0] === myCharacter && game[1][1] === myCharacter && game[1][2] === '') {
          game[1][2] = computerCharacter;
        } else if (game[1][0] === myCharacter && game[1][2] === myCharacter && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[1][1] === myCharacter && game[1][2] === myCharacter && game[1][0] === '') {
          game[1][0] = computerCharacter;
        } else if (game[2][0] === myCharacter && game[2][1] === myCharacter && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[2][0] === myCharacter && game[2][2] === myCharacter && game[2][1] === '') {
          game[2][1] = computerCharacter;
        } else if (game[2][1] === myCharacter && game[2][2] === myCharacter && game[2][0] === '') {
          game[2][0] = computerCharacter;
        } else if (game[0][0] === myCharacter && game[1][0] === myCharacter && game[2][0] === '') {
          game[2][0] = computerCharacter;
        } else if (game[0][0] === myCharacter && game[2][0] === myCharacter && game[1][0] === '') {
          game[1][0] = computerCharacter;
        } else if (game[1][0] === myCharacter && game[2][0] === myCharacter && game[0][0] === '') {
          game[0][0] = computerCharacter;
          //corrigir aqui
        } else if (game[0][1] === myCharacter && game[1][1] === myCharacter && game[2][1] === '') {
          game[2][1] = computerCharacter;
        } else if (game[0][1] === myCharacter && game[2][1] === myCharacter && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[1][1] === myCharacter && game[2][1] === myCharacter && game[0][1] === '') {
          game[0][1] = computerCharacter;
        } else if (game[0][2] === myCharacter && game[1][2] === myCharacter && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[0][2] === myCharacter && game[2][2] === myCharacter && game[1][2] === '') {
          game[1][2] = computerCharacter;
        } else if (game[1][2] === myCharacter && game[2][2] === myCharacter && game[0][2] === '') {
          game[0][2] = computerCharacter;
        } else if (game[0][0] === myCharacter && game[1][1] === myCharacter && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[0][0] === myCharacter && game[2][2] === myCharacter && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[1][1] === myCharacter && game[2][2] === myCharacter && game[0][0] === '') {
          game[0][0] = computerCharacter;
        } else if (game[0][2] === myCharacter && game[1][1] === myCharacter && game[2][0] === '') {
          game[2][0] = computerCharacter;
        } else if (game[0][2] === myCharacter && game[2][0] === myCharacter && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[2][0] === myCharacter && game[1][1] === myCharacter && game[0][2] === '') {
          game[0][2] = computerCharacter;
        } else if (game[0][0] === computerCharacter && game[0][1] === computerCharacter && game[0][2] === '') {
          game[0][2] = computerCharacter;
        } else if (game[0][0] === computerCharacter && game[0][2] === computerCharacter && game[0][1] === '') {
          game[0][1] = computerCharacter;
        } else if (game[0][1] === computerCharacter && game[0][2] === computerCharacter && game[0][0] === '') {
          game[0][0] = computerCharacter;
        } else if (game[1][0] === computerCharacter && game[1][1] === computerCharacter && game[1][2] === '') {
          game[1][2] = computerCharacter;
        } else if (game[1][0] === computerCharacter && game[1][2] === computerCharacter && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[1][1] === computerCharacter && game[1][2] === computerCharacter && game[1][0] === '') {
          game[1][0] = computerCharacter;
        } else if (game[2][0] === computerCharacter && game[2][1] === computerCharacter && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[2][0] === computerCharacter && game[2][2] === computerCharacter && game[2][1] === '') {
          game[2][1] = computerCharacter;
        } else if (game[2][1] === computerCharacter && game[2][2] === computerCharacter && game[2][0] === '') {
          game[2][0] = computerCharacter;
        } else if (game[0][0] === computerCharacter && game[1][0] === computerCharacter && game[2][0] === '') {
          game[2][0] = computerCharacter;
        } else if (game[0][0] === computerCharacter && game[2][0] === computerCharacter && game[1][0] === '') {
          game[1][0] = computerCharacter;
        } else if (game[1][0] === computerCharacter && game[2][0] === computerCharacter && game[0][0] === '') {
          game[0][0] = computerCharacter;
        } else if (game[0][1] === computerCharacter && game[1][1] === computerCharacter && game[2][1] === '') {
          game[2][1] = computerCharacter;
        } else if (game[0][1] === computerCharacter && game[2][1] === computerCharacter && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[1][1] === computerCharacter && game[2][1] === computerCharacter && game[0][1] === '') {
          game[0][1] = computerCharacter;
        } else if (game[0][2] === computerCharacter && game[1][2] === computerCharacter && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[0][2] === computerCharacter && game[2][2] === computerCharacter && game[1][2] === '') {
          game[1][2] = computerCharacter;
        } else if (game[1][2] === computerCharacter && game[2][2] === computerCharacter && game[0][2] === '') {
          game[0][2] = computerCharacter;
        } else if (game[0][0] === computerCharacter && game[1][1] === computerCharacter && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[0][0] === computerCharacter && game[2][2] === computerCharacter && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[1][1] === computerCharacter && game[2][2] === computerCharacter && game[0][0] === '') {
          game[0][0] = computerCharacter;
        } else if (game[0][2] === computerCharacter && game[1][1] === computerCharacter && game[2][0] === '') {
          game[2][0] = computerCharacter;
        } else if (game[0][2] === computerCharacter && game[2][0] === computerCharacter && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[2][0] === computerCharacter && game[1][1] === computerCharacter && game[0][2] === '') {
          game[0][2] = computerCharacter;
        } else {
          if (totalMove < 8) {
            do {
              i = Math.round(Math.random() * 2);
              j = Math.round(Math.random() * 2);
            } while (game[i][j]);
            game[i][j] = computerCharacter;
          } else {
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                if (game[i][j] == '') {
                  game[i][j] = computerCharacter;
                }
              }
            }
          }
        }
      } else {
        // Não implementado
        console.log('level 3 não implementado'); 
      }
      checkTheVictory = verifyVictory();
      totalMove++;
      console.log('totalMove', totalMove);
      updateBoard();
      endGame();
      whoPlays = 0;
      updateWhoPlays();
    }, Math.random() * 2000);
  }
}

let updateWhoPlays = () => {
  if (totalMove !== 0) {
    whoStartsEl.style.display = 'none';
    whoWinEl.style.display = 'none';
    whoPlayEl.style.display = 'block';
    if (machineOnOff) {
      if (whoPlays === 0 && myCharacter === 'x' || whoPlays === 0 && myCharacter === 'o') {
        whoPlayEl.innerHTML = 'Quem joga: Você';
      } else {
        whoPlayEl.innerHTML = 'Quem joga: Computador'
      }
    } else {
      let character
      if (whoPlays === 0) {
        console.log('entrou character 1', myCharacter);
        
        character = (myCharacter === 'x') ? 'Luna' : 'Cláudio';
        whoPlayEl.innerHTML = 'Quem joga: '+ character;
      } else {
        console.log('entrou character 2', computerCharacter);
        character = (computerCharacter === 'x') ? 'Luna' : 'Cláudio';
        whoPlayEl.innerHTML = 'Quem joga: '+ character;
      }
    }
  }
}

let endGame = () => {
  console.log('endGame: ', checkTheVictory);
  ulPlayEl.style.display = 'none';
  /**
   * Caso alguém tenha vencido
   */
  if (checkTheVictory !== '') {

    let win = (checkTheVictory === 'x') ? 'Luna' : 'Claudio';
    setTimeout(() => {
      whoPlayEl.style.display = 'none';
      whoWinEl.style.display = 'block';
      whoWinEl.innerHTML = win + ' ganhou!!!'
      tableEl.style.display = 'none';
      fimJogoEl.style.display = 'grid';
      vencedorEl.children[0].innerHTML = 'Parabéns ' + win;
      let winImg = (win === 'Luna') ? 'assets/images/luna-venceu.png' : 'assets/images/claudio-venceu.png'
      vencedorEl.children[1].setAttribute('src', winImg);
    }, 1000);
    inProgress = false;
  }
  /**
   * Caso tenha empatado
   */
  if (checkTheVictory === '' && totalMove === 9) {
     console.log('entrou endGame');     
    setTimeout(() => {
      whoPlayEl.style.display = 'none';
      whoWinEl.style.display = 'block';
      whoWinEl.innerHTML = 'O Jogo Empatou!!!';
      tableEl.style.display = 'none';
      fimJogoEl.style.display = 'grid';
      vencedorEl.children[0].innerHTML = 'Bom jogo!'
      vencedorEl.children[1].setAttribute('src', 'assets/images/Grupo 34.png')
    }, 1000);
    inProgress = false;
  }
}

let updateBoard = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (game[i][j] === 'x') {
        board[i][j].style.backgroundColor = '#FF6400';
        board[i][j].children[0].src = './assets/images/jogador1luna.png';
        board[i][j].children[0].classList.add('animated', 'bounceIn', 'faster');
        board[i][j].style.cursor = 'default';
        playEffectFunction();
      } else if (game[i][j] === 'o') {
        board[i][j].style.backgroundColor = '#FF6400';
        board[i][j].children[0].src = './assets/images/jogador2luna.png';
        board[i][j].children[0].classList.add('animated', 'bounceIn', 'faster');
        board[i][j].style.cursor = 'default';
        playEffectFunction();
      } else {
        board[i][j].style.backgroundColor = '#FF6400';
        board[i][j].children[0].src = './assets/images/jogador0.png';
        board[i][j].style.background = 'none';
        board[i][j].style.cursor = 'pointer';
      }
    }
  }
}

let verifyVictory = () => {
  for (let i = 0; i < 3; i++) {
    console.log('antes do if 1', 'player: ' + game[i][0], 'player: ' + game[i][1], 'player: ' + game[i][2]);
    if (game[i][0] === game[i][1] && game[i][1] === game[i][2]) {
      if (game[i][0] === 'x' || game[i][0] === 'o') {
        board[i][0].children[0].style.backgroundColor = 'white';
        board[i][1].children[0].style.backgroundColor = 'white';
        board[i][2].children[0].style.backgroundColor = 'white';
        console.log('verify 1', game[i][0]);
        console.log(game[i][0], game[i][1], game[i][2]);
        return game[i][0];
      }
    }
  }
  for (let j = 0; j < 3; j++) {
    console.log('antes do if 2', 'player: ' + game[0][j], 'player: ' + game[1][j], 'player: ' + game[2][j]);
    if (game[0][j] === game[1][j] && game[1][j] === game[2][j]) {
      if (game[0][j] === 'x' || game[0][j] === 'o') {
        board[0][j].children[0].style.backgroundColor = 'white';
        board[1][j].children[0].style.backgroundColor = 'white';
        board[2][j].children[0].style.backgroundColor = 'white';
        console.log('verify 2', game[0][j]);
        return game[0][j];
      }
    }
  }
  if (game[0][0] === game[1][1] && game[1][1] === game[2][2]) {
    if (game[0][0] === 'x' || game[0][0] === 'o') {
      board[0][0].children[0].style.backgroundColor = 'white';
      board[1][1].children[0].style.backgroundColor = 'white';
      board[2][2].children[0].style.backgroundColor = 'white';
      console.log('verify 3');
      return game[0][0];
    }
  }
  if (game[0][2] === game[1][1] && game[1][1] === game[2][0]) {
    if (game[0][2] === 'x' || game[0][2] === 'o') {
      board[0][2].children[0].style.backgroundColor = 'white';
      board[1][1].children[0].style.backgroundColor = 'white';
      board[2][0].children[0].style.backgroundColor = 'white';
      console.log('verify 4');
      return game[0][2];
    }
  }
  return '';
}

let start = (player) => {
  console.log(player);
  if (selectCharacterEl.style.display !== 'none') {
    console.log('entrou aqui');
    selectCharacterEl.style.display = 'none';
    tableEl.style.display = 'grid';
    animateCSS(tableEl, 'zoomInDown');
  }
  playbackAudio();
  if (player) {
    myCharacter = (player === 'luna') ? 'x' : 'o';
    computerCharacter = (myCharacter === 'o') ? 'x' : 'o';
  }
  console.log('myCharacter: ', myCharacter);
  console.log('computerCharacter: ', computerCharacter);
  inProgress = true;
  totalMove = 0;
  whoStarts = firstPlayer();
  console.log('Quem começa: ', whoStarts);
  game = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  board = [
    [cel1El, cel2El, cel3El],
    [cel4El, cel5El, cel6El],
    [cel7El, cel8El, cel9El]
  ];
  updateBoard();
  whoPlayerEl.style.display = 'none';
  whoPlayEl.style.display = 'none';
  whoWinEl.style.display = 'none';
  if (whoStarts === 0 && myCharacter === 'x' || whoStarts === 0 && myCharacter === 'o' ) {
    whoPlays = whoStarts;
    whoStartsEl.style.display = 'block';
    whoStartsEl.innerHTML = 'Você inicia!';
  } else {
    whoPlays = whoStarts;
    whoStartsEl.style.display = 'block';
    whoStartsEl.innerHTML = "Computador inicia!";
    cpuMoves();
  }
  activeButtonPlay();
}

let activeButtonPlay = () => {
  btnPlayEl.removeAttribute('disabled');
  btnPlayEl.classList.remove('disabled');
  LabelPlayEl.classList.remove('disabled');
}

// document.addEventListener('DOMContentLoaded', loader(), false);