function createUser(name) {
  return {name}
}

const player1 = createUser('Owen')
const player2 = createUser('Drake')
const gameBoard = (function() {
  const board = [
    // true, true, false,
    // false, false, true,
    // true, true, false,
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
  let turn = true
  let winner = null

  function play(idx) {
    round++
    let activePlayer
    if (turn)
      activePlayer = player1
    else
      activePlayer = player2
    // idx = getIDX()
    if (gameBoard.board[idx] != null)
      return false
    gameBoard.board[idx] = turn
    turn = !turn
    winner = gameBoard.getWinner()
    // logGameBoard()
    return true
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
  // while (winner == null && round < 9) {
  //   play()
  // }
  return {play}
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
const display = (function() {
  const board = document.querySelector('.board')
  board.addEventListener('click', function clickArea(e) {
    let idx = e.target.getAttribute('data-idx')
    if (!idx)
      return
    markArea(idx)
    if (gameBoard.getWinner())
      board.removeEventListener('click', clickArea)
  })
  pushBoard()

  function markArea(idx) {
    if (!controller.play(idx))
      return
    let area = board.querySelector('[data-idx ="' + idx + '"]')
    let mark = null
    if (gameBoard.board[idx])
      mark = 'o'
    else if (gameBoard.board[idx] == false)
      mark = 'x'
    area.textContent = mark
    if (mark)
      area.classList.add(mark)
  }

  function pushBoard() {
    for(let i = 0; i < gameBoard.board.length; i++) {
      let btn = document.createElement('button')
      btn.setAttribute('data-idx', i)
      let mark = null
      if (gameBoard.board[i])
        mark = 'o'
      else if (gameBoard.board[i] == false)
        mark = 'x'
      btn.textContent = '\u00A0'
      if (mark)
        btn.classList.add(mark)
      board.append(btn)
    }
  }
  
})()

