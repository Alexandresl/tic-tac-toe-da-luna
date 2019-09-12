// Variáveis necessárias
let game; // situação do jogo
let board; // situação da view
let myCharacter;
let computerCharacter;
let whoPlays = 0; // 0 = jogador 1 = cpu
let checkTheVictory; // verifica condição de vitória
let inProgress; // verifica se o jogo está em andamento
let gameLevel = 1; // Guarda o nível de dificuldade
let totalMove; // Contador do números de jogadas da CPU
let whoStarts = 0; // 0 = jogador 1 = cpu
let fullLine; // mostra vistoria
let playEffect = audio = new Audio('./assets/audio/click.wav'); // Audio da jogada
let playEffectHome = audio = new Audio('./assets/audio/click1.wav'); // Audio da jogada
let playMusic = audio = new Audio('./assets/audio/lunaMusic.mp3'); // Música de fundo
let audioOnOff = true; // Silencia efeito

// Elementos
let whoStartsEl = document.getElementById('whoStarts');
let whoWinEl = document.getElementById('whoWin');
let whoPlayEl = document.getElementById("whoPlay");
let selectCharacterEl = document.getElementById('selectCharacter');
let boardEl = document.getElementById('board');
let cel1El = document.getElementById('cel1');
let cel2El = document.getElementById('cel2');
let cel3El = document.getElementById('cel3');
let cel4El = document.getElementById('cel4');
let cel5El = document.getElementById('cel5');
let cel6El = document.getElementById('cel6');
let cel7El = document.getElementById('cel7');
let cel8El = document.getElementById('cel8');
let cel9El = document.getElementById('cel9');
let btnAudioEl = document.querySelector('.audioElOn')
let btnMachineEl = document.querySelector('.machineEl');
let btnLevelEl = document.querySelector('.levelEl1');
let btnPlayEl = document.querySelector('.playEl');

function toggleAudio() {
  audioOnOff = !audioOnOff;
  if (!audioOnOff) {
    btnAudioEl.classList.remove('audioElOn');
    btnAudioEl.classList.add('audioElOff');
    playMusic.pause();
  } else {
    btnAudioEl.classList.remove('audioElOff');
    btnAudioEl.classList.add('audioElOn');
    if (playMusic.paused === true) {
      playMusic.play();
    }
    
  }
}

function play(position) {
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
      updateBoard();
      endGame();
      totalMove++;
      cpuMoves();
      updateWhoPlays();
    }
  }
}

function playEffectFunction() {
  if (audioOnOff) {
    playEffect.currentTime = 0;
    let playPromise = playEffect.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
      })
        .catch(error => {
          
        });
    }
  }
}

function level() {
  switch (gameLevel) {
    case 1:
      gameLevel = 2;
      btnLevelEl.classList.remove('levelEl1');
      btnLevelEl.classList.add('levelEl2');
      break;
    case 2:
      gameLevel = 3;
      btnLevelEl.classList.remove('levelEl2');
      btnLevelEl.classList.add('levelEl3');
      break;
    case 3:
      gameLevel = 1;
      btnLevelEl.classList.remove('levelEl3');
      btnLevelEl.classList.add('levelEl1');
      break;
  }
}

function playEffectHomeFunc() {
  if (audioOnOff) {
    playEffectHome.currentTime = 0;
    let playPromise = playEffectHome.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
      }) .catch(error => {
      });
    }
  }
}


function cpuMoves() {
  if (inProgress === true) {
    setTimeout(() => {
      var i, j;
      if (gameLevel === 1) {
        do {
          i = Math.round(Math.random() * 2);
          j = Math.round(Math.round(Math.random() * 2))
        } while (game[i][j]);
        game[i][j] = computerCharacter;
      } else if (gameLevel === 2) {
        // Ataque
        // Linha 1
        if (game[0][0] === 'o' && game[0][1] === 'o' && game[0][2] === '') {
          game[0][2] = computerCharacter;
        } else if (game[0][0] === 'o' && game[0][2] === 'o' && game[0][1] === '') {
          game[0][1] = computerCharacter;
        } else if (game[0][1] === 'o' && game[0][2] === 'o' && game[0][0] === '') {
          game[0][0] = computerCharacter;
        } else if (game[1][0] === 'o' && game[1][1] === 'o' && game[1][2] === '') {
          game[1][2] = computerCharacter;
        } else if (game[1][0] === 'o' && game[1][2] === 'o' && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[1][1] === 'o' && game[1][2] === 'o' && game[1][0] === '') {
          game[1][0] = computerCharacter;
        } else if (game[2][0] === 'o' && game[2][1] === 'o' && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[2][0] === 'o' && game[2][2] === 'o' && game[2][1] === '') {
          game[2][1] = computerCharacter;
        } else if (game[2][1] === 'o' && game[2][2] === 'o' && game[2][0] === '') {
          game[2][0] = computerCharacter;
        } else if (game[0][0] === 'o' && game[1][0] === 'o' && game[2][0] === '') {
          game[2][0] = computerCharacter;
        } else if (game[0][0] === 'o' && game[2][0] === 'o' && game[1][0] === '') {
          game[1][0] = computerCharacter;
        } else if (game[1][0] === 'o' && game[2][0] === 'o' && game[0][0] === '') {
          game[0][0] = computerCharacter;
        } else if (game[1][1] === 'o' && game[1][1] === 'o' && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[1][1] === 'o' && game[1][1] === 'o' && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[1][1] === 'o' && game[1][1] === 'o' && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[2][2] === 'o' && game[2][2] === 'o' && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[2][2] === 'o' && game[2][2] === 'o' && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[2][2] === 'o' && game[2][2] === 'o' && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[0][0] === 'o' && game[1][1] === 'o' && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[0][0] === 'o' && game[2][2] === 'o' && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[1][1] === 'o' && game[2][2] === 'o' && game[0][0] === '') {
          game[0][0] = computerCharacter;
        } else if (game[0][2] === 'o' && game[1][1] === 'o' && game[2][0] === '') {
          game[2][0] = computerCharacter;
        } else if (game[0][2] === 'o' && game[2][0] === 'o' && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[2][0] === 'o' && game[1][1] === 'o' && game[0][2] === '') {
          game[0][2] = computerCharacter;
        } else if (game[0][0] === 'x' && game[0][1] === 'x' && game[0][2] === '') {
          game[0][2] = computerCharacter;
        } else if (game[0][0] === 'x' && game[0][2] === 'x' && game[0][1] === '') {
          game[0][1] = computerCharacter;
        } else if (game[0][1] === 'x' && game[0][2] === 'x' && game[0][0] === '') {
          game[0][0] = computerCharacter;
        } else if (game[1][0] === 'x' && game[1][1] === 'x' && game[1][2] === '') {
          game[1][2] = computerCharacter;
        } else if (game[1][0] === 'x' && game[1][2] === 'x' && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[1][1] === 'x' && game[1][2] === 'x' && game[1][0] === '') {
          game[1][0] = computerCharacter;
        } else if (game[2][0] === 'x' && game[2][1] === 'x' && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[2][0] === 'x' && game[2][2] === 'x' && game[2][1] === '') {
          game[2][1] = computerCharacter;
        } else if (game[2][1] === 'x' && game[2][2] === 'x' && game[2][0] === '') {
          game[2][0] = computerCharacter;
        } else if (game[0][0] === 'x' && game[1][0] === 'x' && game[2][0] === '') {
          game[2][0] = computerCharacter;
        } else if (game[0][0] === 'x' && game[2][0] === 'x' && game[1][0] === '') {
          game[1][0] = computerCharacter;
        } else if (game[1][0] === 'x' && game[2][0] === 'x' && game[0][0] === '') {
          game[0][0] = computerCharacter;
        } else if (game[1][1] === 'x' && game[1][1] === 'x' && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[1][1] === 'x' && game[1][1] === 'x' && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[1][1] === 'x' && game[1][1] === 'x' && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[2][2] === 'x' && game[2][2] === 'x' && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[2][2] === 'x' && game[2][2] === 'x' && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[2][2] === 'x' && game[2][2] === 'x' && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[0][0] === 'x' && game[1][1] === 'x' && game[2][2] === '') {
          game[2][2] = computerCharacter;
        } else if (game[0][0] === 'x' && game[2][2] === 'x' && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[1][1] === 'x' && game[2][2] === 'x' && game[0][0] === '') {
          game[0][0] = computerCharacter;
        } else if (game[0][2] === 'x' && game[1][1] === 'x' && game[2][0] === '') {
          game[2][0] = computerCharacter;
        } else if (game[0][2] === 'x' && game[2][0] === 'x' && game[1][1] === '') {
          game[1][1] = computerCharacter;
        } else if (game[2][0] === 'x' && game[1][1] === 'x' && game[0][2] === '') {
          game[0][2] = computerCharacter;
        } else {
          if (totalMove < 8) {
            do {
              i = Math.round(Math.random() * 2);
              j = Math.round(Math.round(Math.random() * 2))
            } while (game[i][j]);
            game[i][j] = computerCharacter;
          } else {
            for (var i = 0; i < 3; i++) {
              for (var j = 0; j < 3; j++) {
                if (game[i][j] == '') {
                  game[i][j] = computerCharacter;
                }
              }
            }
          }
        }
      } else {
        // Não implementado
      }

      checkTheVictory = verifyVictory();
      updateBoard();
      totalMove++;
      endGame();
      whoPlays = 0;
      updateWhoPlays();
    }, (Math.random() * 2000));
  }

}

function updateWhoPlays() {
  if (totalMove !== 0) {
    whoStartsEl.style.display = 'none';
    whoWinEl.style.display = 'none';
    whoPlayEl.style.display = 'block';
    if (whoPlays === 0 && myCharacter === 'x' || whoPlays === 1 && myCharacter === 'o') {
      whoPlayEl.innerHTML = "Quem joga: Você";
    } else {
      whoPlayEl.innerHTML = "Quem joga: Computador";
    }
  }
}

function endGame() {
  if (checkTheVictory !== '') {
    win = (checkTheVictory === 'x') ? 'Luna' : 'Claudio';
    setTimeout(() => {
      whoStartsEl.style.display = 'none';
      whoPlayEl.style.display = 'none';
      whoWinEl.style.display = 'block';
      whoWinEl.innerHTML = win + ' Ganhou!!!';
    }, 10);
    inProgress = false;
  }
  if (checkTheVictory === '' && totalMove === 10 && whoStarts === 0 ||
    checkTheVictory === '' && totalMove === 9 && whoStarts === 1) {
    setTimeout(() => {
      whoStartsEl.style.display = 'none';
      whoPlayEl.style.display = 'none';
      whoWinEl.style.display = 'block';
      whoWinEl.innerHTML = 'O jogo empatou!!!';
    }, 10);

  }

}

function verifyVictory() {
  for (let i = 0; i < 3; i++) {
    if (game[i][0] === game[i][1] && game[i][1] === game[i][2]) {
      if (game[i][0] === 'x' || game[i][0] === 'o') {
        board[i][0].children[0].style.backgroundColor = 'white';
        board[i][1].children[0].style.backgroundColor = 'white';
        board[i][2].children[0].style.backgroundColor = 'white';
      }

      return game[i][0];
    }
  }
  for (let j = 0; j < 3; j++) {
    if (game[0][j] === game[1][j] && game[1][j] === game[2][j]) {
      if (game[0][j] === 'x' || game[0][j] === 'o') {
        board[0][j].style.backgroundColor = 'white';
        board[1][j].style.backgroundColor = 'white';
        board[2][j].style.backgroundColor = 'white';
      }
      return game[0][j];
    }
  }
  if (game[0][0] === game[1][1] && game[1][1] === game[2][2]) {
    if (game[0][0] === 'x' || game[0][0] === 'o') {
      board[0][0].style.backgroundColor = 'white';
      board[1][1].style.backgroundColor = 'white';
      board[2][2].style.backgroundColor = 'white';
    }
    return game[0][0];
  }
  if (game[0][2] === game[1][1] && game[1][1] === game[2][0]) {
    if (game[0][2] === 'x' || game[0][2] === 'o') {
      board[0][2].style.backgroundColor = 'white';
      board[1][1].style.backgroundColor = 'white';
      board[2][0].style.backgroundColor = 'white';
    }
    return game[0][2];
  }
  return '';
}

function updateBoard() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (game[i][j] == 'x') {
        board[i][j].children[0].src = './assets/images/jogador1luna.png';
        board[i][j].children[0].classList.add('animated', 'bounceIn', 'faster');
        board[i][j].style.cursor = 'default';
        playEffectFunction();
      } else if (game[i][j] === 'o') {
        board[i][j].children[0].src = './assets/images/jogador2luna.png';
        board[i][j].children[0].classList.add('animated', 'bounceIn', 'faster');
        board[i][j].style.cursor = 'default';
        playEffectFunction();
      } else {
        board[i][j].children[0].src = './assets/images/jogador0.png';
        board[i][j].style.background = 'none';
        board[i][j].style.cursor = 'pointer'
      }
    }
  }

}

function activePlay() {
  btnPlayEl.removeAttribute('disabled');
  btnPlayEl.classList.remove('disabled');
}

function start(jogador) {
  playBackAudio();
  activePlay();
  selectCharacterEl.style.display = 'none';
  boardEl.style.display = 'block';
  boardEl.classList.add('animated', 'fadeIn', 'slower');
  if (jogador) {
    myCharacter = (jogador === 'luna') ? 'x' : 'o';
    computerCharacter = (myCharacter === 'o') ? 'x' : 'o';
  }
  inProgress = true;
  totalMove = 0;
  if (myCharacter === 'x') {
    whoStarts = (whoStarts === 0) ? 1 : 0;
  }
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
  whoPlayEl.style.display = 'none';
  whoWinEl.style.display = 'none';
  if (whoStarts === 0 && myCharacter === 'x' || whoStarts === 1 && myCharacter === 'o') {
    whoStarts = 0;
    whoPlays = whoStarts;
    whoStartsEl.style.display = 'block';
    whoStartsEl.innerHTML = "Você inicia!";
  } else {
    whoStarts = 1;
    whoPlays = whoStarts;
    whoStartsEl.style.display = 'block';
    whoStartsEl.innerHTML = "Computador inicia!";

    cpuMoves();
  }
  clearStyle();
}

function clearStyle() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j].children[0].style.background = 'none';
    }
  }

}

function playBackAudio() {
  if (audioOnOff) {
    playMusic.currentTime = 0;
    playMusic.loop = true;
    playMusic.autoplay = true;
    playMusic.preload = 'none';
    var playPromise = playMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
      })
        .catch(error => {
        });
    }
  }
}