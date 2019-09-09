// Variáveis necessárias
let game; // situação do jogo
let board; // situação da view
let myCharacter;
let computerCharacter;
let whoPlays = 0; // 0 = jogador 1 = cpu
let checkTheVictory; // verifica condição de vitória
let inProgress; // verifica se o jogo está em andamento
let level = 2; // Guarda o nível de dificuldade
let totalMove; // Contador do números de jogadas da CPU
let whoStarts = 0; // 0 = jogador 1 = cpu
let fullLine; // mostra vistoria
let playEffect = audio = new Audio('./assets/audio/click.wav'); // Audio da jogada
let effectOnOff = true; // Silencia efeito

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
  if (effectOnOff) {
    playEffect.currentTime = 0;
    playEffect.play();
  }
}


function cpuMoves() {
  if (inProgress === true) {
    setTimeout(() => {
      var i, j;
      if (level === 1) {
        do {
          i = Math.round(Math.random() * 2);
          j = Math.round(Math.round(Math.random() * 2))
        } while (game[i][j]);
        game[i][j] = computerCharacter;
      } else if (level === 2) {
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
    document.getElementById('whoStarts').style.display = 'none';
    document.getElementById('whoWin').style.display = 'none';
    document.getElementById("whoPlay").style.display = 'block';
    if (whoPlays === 0 && myCharacter === 'x' || whoPlays === 1 && myCharacter === 'o') {
      document.getElementById("whoPlay").innerHTML = "Quem joga: Você";
    } else {
      document.getElementById("whoPlay").innerHTML = "Quem joga: Computador";
    }
  }
}

function endGame() {
  if (checkTheVictory !== '') {
    win = (checkTheVictory === 'x') ? 'Luna' : 'Claudio';
    setTimeout(() => {
      document.getElementById('whoStarts').style.display = 'none';
      document.getElementById('whoPlay').style.display = 'none';
      document.getElementById('whoWin').style.display = 'block';
      document.getElementById('whoWin').innerHTML = win + ' Ganhou!!!';
    }, 10);
    inProgress = false;
  }
  if (checkTheVictory === '' && totalMove === 10 && whoStarts === 0 ||
    checkTheVictory === '' && totalMove === 9 && whoStarts === 1) {
    setTimeout(() => {
      document.getElementById('whoStarts').style.display = 'none';
      document.getElementById('whoPlay').style.display = 'none';
      document.getElementById('whoWin').style.display = 'block';
      document.getElementById('whoWin').innerHTML = 'O jogo empatou!!!';
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
      console.log('entrou');
      
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

function start(jogador) {
  document.getElementById('selectCharacter').style.display = 'none';
  document.getElementById('board').style.display = 'block';
  document.getElementById('board').classList.add('animated', 'fadeIn', 'slower');
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
    [document.getElementById('cel1'), document.getElementById('cel2'), document.getElementById('cel3')],
    [document.getElementById('cel4'), document.getElementById('cel5'), document.getElementById('cel6')],
    [document.getElementById('cel7'), document.getElementById('cel8'), document.getElementById('cel9')]
  ];
  updateBoard();
  document.getElementById('whoPlay').style.display = 'none';
  document.getElementById('whoWin').style.display = 'none';
  if (whoStarts === 0 && myCharacter === 'x' || whoStarts === 1 && myCharacter === 'o') {
    whoStarts = 0;
    whoPlays = whoStarts;

    document.getElementById("whoStarts").style.display = 'block';
    document.getElementById("whoStarts").innerHTML = "Você inicia!";

  } else {
    whoStarts = 1;
    whoPlays = whoStarts;
    
    document.getElementById("whoStarts").style.display = 'block';
    document.getElementById("whoStarts").innerHTML = "Computador inicia!";

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

//window.addEventListener("load", start);
