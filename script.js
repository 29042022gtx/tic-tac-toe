function createUser(name) {
  return {name}
}

const player1 = createUser('Owen')
const player2 = createUser('Drake')
const gameBoard = (function() {
  const board = [
    // false, false, true,
    // true, true, false,
    // false, true, true,
    null, null, null,
    null, null, null,
    null, null, null,
  ]
  // for (let i = 0; i < 9; i++)
  //   board.push(null)

  const getWinner = () => {
    const boardSize = 3
    let winner = null

    function winRows() {
      for (let i = 0; i < boardSize**2; i += boardSize) {
        winner = board[i]
        for (let j = i; j < i + boardSize - 1; j++)
          if (board[j] != board[j + 1] || board[j] == null)
            winner = null
        if (winner != null)
          return winner
      }
      return null
    }

    function winCols() {
      for (let i = 0; i < boardSize; i++) {
      winner = board[i]
      for (let j = i; j < boardSize**2 - boardSize; j += boardSize)
        if (board[j] != board[j + boardSize] || board[j] == null)
          winner = null
      if (winner != null)
        return winner
      }
      return null
    }

    function winCross() {
      winner = board[0]
      for (let i = 0; i < boardSize**2 - boardSize - 1; i += boardSize + 1)
        if (board[i] != board[i + boardSize + 1] || board[i] == null)
          winner = null
      if (winner != null)
        return winner
      winner = board[boardSize - 1]
      for (let i = boardSize - 1; i < boardSize**2 - boardSize; i += boardSize - 1)
        if (board[i] != board[i + boardSize - 1] || board[i] == null)
          winner = null
      if (winner != null)
        return winner
      return null
    }

    winner = winRows()
    if (winner == null)
      winner = winCols()
    if (winner == null)
      winner = winCross()
    return winner
  }
  
  return {board, getWinner}
})()

const controller = (function() {
  let round = 0
  let turn = false
  let winner = null

  function play(idx) {
    round++
    turn = !turn
    let activePlayer
    if (turn)
      activePlayer = player1
    else
      activePlayer = player2
    // idx = getIDX()`
    gameBoard.board[idx] = turn
    winner = gameBoard.getWinner()
    logGameBoard()
    function getIDX() {
      let idx = prompt(activePlayer.name)
      idx = parseInt(idx)
      if (!idx)
        idx = 0
      while (gameBoard.board[idx] != null || idx < -1 || idx >= 9) {
        idx = prompt(activePlayer.name + ' choose a nother idx!')
        idx = parseInt(idx)
        if (!idx)
          idx = 0
      }
      console.log(idx);
      return idx
    }
  }
  while (winner == null && round < 9) {
    play()
  }
})()

function logGameBoard() {
  for (let i = 0; i < gameBoard.board.length; i += 3) {
    let s = ''
    for (let j = i; j < i + 3; j++)
      s += gameBoard.board[j] + ', '
    s += i
    console.log(s); 
  }
}
let winner = gameBoard.getWinner()
if (winner)
  console.warn('Winner: ' + player1.name);
else
  console.warn('Winner: ' + player2.name);

