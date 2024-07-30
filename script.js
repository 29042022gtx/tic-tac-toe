function createUser(name) {
  return {name}
}

const player1 = createUser('Owen')
const player2 = createUser('Drake')
const gameBoard = (function() {
  const board = [
    // true, true, false,
    // false, true, true,
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
    if (gameBoard.board[idx] != null)
      return false
    gameBoard.board[idx] = turn
    turn = !turn
    winner = gameBoard.getWinner()
    // logGameBoard()
    return true
  }
  // while (winner == null && round < 9) {
  //   play()
  // }
  return {turn, play}
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
  const playerwrp1 = document.querySelector('.player1')
  const playerwrp2 = document.querySelector('.player2')
  const nameDialog = document.querySelector('dialog.player-name-dialog')
  const nameForm = nameDialog.querySelector('form')
  const formSubmit = nameForm.querySelector('#submit')
  const formCancel = nameForm.querySelector('#cancel')

  formSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    nameDialog.close()
    player1.name = nameForm.player1Name.value
    player2.name = nameForm.player2Name.value
    pushPlayerName()
  })

  formCancel.addEventListener('click', () => {
    // nameDialog.close()
    // pushPlayerName()
  })

  board.addEventListener('click', function clickArea(e) {
    let idx = +e.target.getAttribute('data-idx')
    if (isNaN(idx))
      return
    if (!markArea(idx))
      return
    if (gameBoard.getWinner() != null) {
      inertBoard(clickArea)
      return
    }
    switchTurn()
  })
  playerwrp1.addEventListener('click', function() {
    nameDialog.showModal()
  })
  playerwrp2.addEventListener('click', function() {
    nameDialog.showModal()
  })
  pushPlayerName()
  pushBoard()
  nameDialog.showModal()
  
  function inertBoard(clickArea) {
    board.removeEventListener('click', clickArea)
    for(let i = 0; i < board.children.length; i++)
      board.children[i].classList.remove('area')
  }

  function markArea(idx) {
    if (!controller.play(idx))
      return false
    let area = board.querySelector('[data-idx ="' + idx + '"]')
    let mark = null
    if (gameBoard.board[idx])
      mark = 'o'
    else if (gameBoard.board[idx] == false)
      mark = 'x'
    area.textContent = mark
    if (mark)
      area.classList.add(mark)
    return true
  }

  function switchTurn() {
    playerwrp1.classList.toggle('active')
    playerwrp2.classList.toggle('active')
  }

  function pushPlayerName() {
    playerwrp1.textContent = player1.name
    playerwrp2.textContent = player2.name
    nameForm.player1Name.value = player1.name
    nameForm.player2Name.value = player2.name

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
      btn.classList.add('area')
      board.append(btn)
    }
  }
  
})()
