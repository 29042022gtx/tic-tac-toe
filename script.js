function createUser(name) {
  return {name}
}

const player1 = createUser('Owen')
const player2 = createUser('Drake')
const gameBoard = (function() {
  const board = [
    null, true, false,
    null, false, false,
    false, false, null,
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

for (let i = 0; i < gameBoard.board.length; i += 3) {
  let s = ''
  for (let j = i; j < i + 3; j++)
    s += gameBoard.board[j] + ', '
  s += i
  console.log(s); 
}
console.warn('Results: ' + gameBoard.getWinner());


