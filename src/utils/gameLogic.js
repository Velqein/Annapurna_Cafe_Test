export const WINNING_LINES = [
  [0,1,2], [3,4,5], [6,7,8],   // rows
  [0,3,6], [1,4,7], [2,5,8],   // cols
  [0,4,8], [2,4,6],             // diagonals
]

export function checkWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line }
    }
  }
  if (board.every(Boolean)) return { winner: 'draw', line: [] }
  return null
}

export function getBestMove(board, playerSymbol, aiSymbol) {
  const available = board.map((v, i) => (v ? null : i)).filter(v => v !== null)
  if (!available.length) return null

  // Try to win
  for (const i of available) {
    const test = [...board]; test[i] = aiSymbol
    if (checkWinner(test)?.winner === aiSymbol) return i
  }

  // Try to block player
  for (const i of available) {
    const test = [...board]; test[i] = playerSymbol
    if (checkWinner(test)?.winner === playerSymbol) return i
  }

  // Take center
  if (available.includes(4)) return 4

  // Take a corner
  const corners = [0, 2, 6, 8].filter(c => available.includes(c))
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)]

  // Take any remaining cell
  return available[Math.floor(Math.random() * available.length)]
}
