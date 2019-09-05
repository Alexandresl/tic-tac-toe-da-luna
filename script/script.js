// Variáveis necessárias
let game; // situação do jogo
let board; // situação da view
let whoPlays = 0; // 0 = jogador 1 = cpu
let checkTheVictory; // verifica condição de vitória
let inProgress; // verifica se o jogo está em andamento
let level = 2; // Guarda o nível de dificuldade
let totalMove; // Contador do números de jogadas da CPU
let whoStarts = Math.floor(Math.random() * 2); // 0 = jogador 1 = cpu
let fullLine;

function play(position) {
  if (inProgress && whoPlays === 0) {
    switch (position) {
      case 'cel1':
        if (game[0][0] === "") {
          game[0][0] = 'x';
          whoPlays = 1;
        }
        break;
      case 'cel2':
        if (game[0][1] === "") {
          game[0][1] = 'x';
          whoPlays = 1;
        }
        break;
      case 'cel3':
        if (game[0][2] === "") {
          game[0][2] = 'x';
          whoPlays = 1;
        }
        break;
      case 'cel4':
        if (game[1][0] === "") {
          game[1][0] = 'x';
          whoPlays = 1;
        }
        break;
      case 'cel5':
        if (game[1][1] === "") {
          game[1][1] = 'x';
          whoPlays = 1;
        }
        break;
      case 'cel6':
        if (game[1][2] === "") {
          game[1][2] = 'x';
          whoPlays = 1;
        }
        break;
      case 'cel7':
        if (game[2][0] === "") {
          game[2][0] = 'x';
          whoPlays = 1;
        }
        break;
      case 'cel8':
        if (game[2][1] === "") {
          game[2][1] = 'x';
          whoPlays = 1;
        }
        break;
      case 'cel9':
        if (game[2][2] === "") {
          game[2][2] = 'x';
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
    }
  }

}

function cpuMoves() {
  if (inProgress === true) {
    var i, j;
    if (level === 1) {
      do {
        i = Math.round(Math.random() * 2);
        j = Math.round(Math.round(Math.random() * 2))
      } while (game[i][j]);
      game[i][j] = 'o';
    } else if (level === 2) {
      // Ataque
      // Linha 1
      if (game[0][0] === 'o' && game[0][1] === 'o' && game[0][2] === '') {
        game[0][2] = 'o';
      } else if (game[0][0] === 'o' && game[0][2] === 'o' && game[0][1] === '') {
        game[0][1] = 'o';
      } else if (game[0][1] === 'o' && game[0][2] === 'o' && game[0][0] === '') {
        game[0][0] = 'o';
      } else if (game[1][0] === 'o' && game[1][1] === 'o' && game[1][2] === '') {
        game[1][2] = 'o';
      } else if (game[1][0] === 'o' && game[1][2] === 'o' && game[1][1] === '') {
        game[1][1] = 'o';
      } else if (game[1][1] === 'o' && game[1][2] === 'o' && game[1][0] === '') {
        game[1][0] = 'o';
      } else if (game[2][0] === 'o' && game[2][1] === 'o' && game[2][2] === '') {
        game[2][2] = 'o';
      } else if (game[2][0] === 'o' && game[2][2] === 'o' && game[2][1] === '') {
        game[2][1] = 'o';
      } else if (game[2][1] === 'o' && game[2][2] === 'o' && game[2][0] === '') {
        game[2][0] = 'o';
      } else if (game[0][0] === 'o' && game[1][0] === 'o' && game[2][0] === '') {
        game[2][0] = 'o';
      } else if (game[0][0] === 'o' && game[2][0] === 'o' && game[1][0] === '') {
        game[1][0] = 'o';
      } else if (game[1][0] === 'o' && game[2][0] === 'o' && game[0][0] === '') {
        game[0][0] = 'o';
      } else if (game[1][1] === 'o' && game[1][1] === 'o' && game[1][1] === '') {
        game[1][1] = 'o';
      } else if (game[1][1] === 'o' && game[1][1] === 'o' && game[1][1] === '') {
        game[1][1] = 'o';
      } else if (game[1][1] === 'o' && game[1][1] === 'o' && game[1][1] === '') {
        game[1][1] = 'o';
      } else if (game[2][2] === 'o' && game[2][2] === 'o' && game[2][2] === '') {
        game[2][2] = 'o';
      } else if (game[2][2] === 'o' && game[2][2] === 'o' && game[2][2] === '') {
        game[2][2] = 'o';
      } else if (game[2][2] === 'o' && game[2][2] === 'o' && game[2][2] === '') {
        game[2][2] = 'o';
      } else if (game[0][0] === 'o' && game[1][1] === 'o' && game[2][2] === '') {
        game[2][2] = 'o';
      } else if (game[0][0] === 'o' && game[2][2] === 'o' && game[1][1] === '') {
        game[1][1] = 'o';
      } else if (game[1][1] === 'o' && game[2][2] === 'o' && game[0][0] === '') {
        game[0][0] = 'o';
      } else if (game[0][2] === 'o' && game[1][1] === 'o' && game[2][0] === '') {
        game[2][0] = 'o';
      } else if (game[0][2] === 'o' && game[2][0] === 'o' && game[1][1] === '') {
        game[1][1] = 'o';
      } else if (game[2][0] === 'o' && game[1][1] === 'o' && game[0][2] === '') {
        game[0][2] = 'o';
      } else if (game[0][0] === 'x' && game[0][1] === 'x' && game[0][2] === '') {
        game[0][2] = 'o';
      } else if (game[0][0] === 'x' && game[0][2] === 'x' && game[0][1] === '') {
        game[0][1] = 'o';
      } else if (game[0][1] === 'x' && game[0][2] === 'x' && game[0][0] === '') {
        game[0][0] = 'o';
      } else if (game[1][0] === 'x' && game[1][1] === 'x' && game[1][2] === '') {
        game[1][2] = 'o';
      } else if (game[1][0] === 'x' && game[1][2] === 'x' && game[1][1] === '') {
        game[1][1] = 'o';
      } else if (game[1][1] === 'x' && game[1][2] === 'x' && game[1][0] === '') {
        game[1][0] = 'o';
      } else if (game[2][0] === 'x' && game[2][1] === 'x' && game[2][2] === '') {
        game[2][2] = 'o';
      } else if (game[2][0] === 'x' && game[2][2] === 'x' && game[2][1] === '') {
        game[2][1] = 'o';
      } else if (game[2][1] === 'x' && game[2][2] === 'x' && game[2][0] === '') {
        game[2][0] = 'o';
      } else if (game[0][0] === 'x' && game[1][0] === 'x' && game[2][0] === '') {
        game[2][0] = 'o';
      } else if (game[0][0] === 'x' && game[2][0] === 'x' && game[1][0] === '') {
        game[1][0] = 'o';
      } else if (game[1][0] === 'x' && game[2][0] === 'x' && game[0][0] === '') {
        game[0][0] = 'o';
      } else if (game[1][1] === 'x' && game[1][1] === 'x' && game[1][1] === '') {
        game[1][1] = 'o';
      } else if (game[1][1] === 'x' && game[1][1] === 'x' && game[1][1] === '') {
        game[1][1] = 'o';
      } else if (game[1][1] === 'x' && game[1][1] === 'x' && game[1][1] === '') {
        game[1][1] = 'o';
      } else if (game[2][2] === 'x' && game[2][2] === 'x' && game[2][2] === '') {
        game[2][2] = 'o';
      } else if (game[2][2] === 'x' && game[2][2] === 'x' && game[2][2] === '') {
        game[2][2] = 'o';
      } else if (game[2][2] === 'x' && game[2][2] === 'x' && game[2][2] === '') {
        game[2][2] = 'o';
      } else if (game[0][0] === 'x' && game[1][1] === 'x' && game[2][2] === '') {
        game[2][2] = 'o';
      } else if (game[0][0] === 'x' && game[2][2] === 'x' && game[1][1] === '') {
        game[1][1] = 'o';
      } else if (game[1][1] === 'x' && game[2][2] === 'x' && game[0][0] === '') {
        game[0][0] = 'o';
      } else if (game[0][2] === 'x' && game[1][1] === 'x' && game[2][0] === '') {
        game[2][0] = 'o';
      } else if (game[0][2] === 'x' && game[2][0] === 'x' && game[1][1] === '') {
        game[1][1] = 'o';
      } else if (game[2][0] === 'x' && game[1][1] === 'x' && game[0][2] === '') {
        game[0][2] = 'o';
      } else {
        if (totalMove < 8) {
          do {
            i = Math.round(Math.random() * 2);
            j = Math.round(Math.round(Math.random() * 2))
          } while (game[i][j]);
          game[i][j] = 'o';
        } else {
          for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
              if (game[i][j] == '') {
                game[i][j] = 'o';
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
  }

}

function endGame() {
  if (checkTheVictory !== '') {
    win = (checkTheVictory === 'x') ? 'Luna' : 'Claudio';
    setTimeout(() => {
      alert(win + " Venceu!")
    }, 10);
    inProgress = false;
  }
  if (checkTheVictory === '' && totalMove === 9) {
    alert('O jogo empatou!');
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
        board[0][j].children[0].style.backgroundColor = 'white';
        board[1][j].children[0].style.backgroundColor = 'white';
        board[2][j].children[0].style.backgroundColor = 'white';
      }
      return game[0][j];
    }
  }
  if (game[0][0] === game[1][1] && game[1][1] === game[2][2]) {
    if (game[0][0] === 'x' || game[0][0] === 'o') {
      board[0][0].children[0].style.backgroundColor = 'white';
      board[1][1].children[0].style.backgroundColor = 'white';
      board[2][2].children[0].style.backgroundColor = 'white';
    }
    return game[0][0];
  }
  if (game[0][2] === game[1][1] && game[1][1] === game[2][0]) {
    if (game[0][2] === 'x' || game[0][2] === 'o') {
      board[0][2].children[0].style.backgroundColor = 'white';
      board[1][1].children[0].style.backgroundColor = 'white';
      board[2][0].children[0].style.backgroundColor = 'white';
    }
    return game[0][2];
  }
  return '';
}

function updateBoard() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (game[i][j] == 'x') {
        board[i][j].children[0].src = './img/jogador1luna.png';
        board[i][j].children[0].classList.add('animated', 'bounceIn', 'faster');
        board[i][j].style.cursor = 'default'
      } else if (game[i][j] === 'o') {
        board[i][j].children[0].src = './img/jogador2luna.png';
        board[i][j].children[0].classList.add('animated', 'bounceIn', 'faster');
        board[i][j].style.cursor = 'default'
      } else {
        board[i][j].children[0].src = './img/jogador0.png';
        board[i][j].style.cursor = 'pointer'
      }
    }
  }

}

function start() {
  inProgress = true;
  totalMove = 0;
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
  if (whoStarts === 1) {
    whoStarts = 0;
    whoPlays = whoStarts;
    document.getElementById("whoStarts").innerHTML = "Você inicia!";
  } else {
    whoStarts = 1;
    whoPlays = whoStarts;
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

window.addEventListener("load", start);
