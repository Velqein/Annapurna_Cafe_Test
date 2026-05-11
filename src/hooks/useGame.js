import { useState, useEffect, useCallback, useRef } from 'react'
import { checkWinner, getBestMove } from '../utils/gameLogic'

export function useGame() {
  const [board, setBoard]               = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [scores, setScores]             = useState({ x: 0, ties: 0, o: 0 })
  const [gameResult, setGameResult]     = useState(null)   // { winner, line } | null
  const [isAIThinking, setIsAIThinking] = useState(false)
  const [gameMode, setGameMode]         = useState('single')

  // Always-fresh board reference for the AI setTimeout closure
  const boardRef = useRef(board)
  boardRef.current = board

  /* ── score helper ── */
  const addScore = useCallback((winner) => {
    setScores(s => ({
      x:    winner === 'X'     ? s.x    + 1 : s.x,
      o:    winner === 'O'     ? s.o    + 1 : s.o,
      ties: winner === 'draw'  ? s.ties + 1 : s.ties,
    }))
  }, [])

  /* ── player cell click ── */
  const handleCellClick = useCallback((index) => {
    if (board[index] || gameResult || isAIThinking) return
    if (gameMode === 'single' && currentPlayer === 'O') return   // AI's turn

    const next = [...board]
    next[index] = currentPlayer
    setBoard(next)

    const result = checkWinner(next)
    if (result) {
      setGameResult(result)
      addScore(result.winner)
    } else {
      setCurrentPlayer(p => (p === 'X' ? 'O' : 'X'))
    }
  }, [board, currentPlayer, gameResult, isAIThinking, gameMode, addScore])

  /* ── AI move ── */
  useEffect(() => {
    if (gameMode !== 'single' || currentPlayer !== 'O' || gameResult) return

    setIsAIThinking(true)
    const timer = setTimeout(() => {
      const b    = boardRef.current
      const move = getBestMove(b, 'X', 'O')

      if (move !== null) {
        const next = [...b]
        next[move] = 'O'
        setBoard(next)

        const result = checkWinner(next)
        if (result) {
          setGameResult(result)
          addScore(result.winner)
        } else {
          setCurrentPlayer('X')
        }
      }
      setIsAIThinking(false)
    }, 700)

    return () => { clearTimeout(timer); setIsAIThinking(false) }
  // board intentionally excluded – accessed via ref
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, gameMode, gameResult, addScore])

  /* ── reset board only ── */
  const resetBoard = useCallback(() => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setGameResult(null)
    setIsAIThinking(false)
  }, [])

  /* ── reset board + scores ── */
  const resetAll = useCallback(() => {
    resetBoard()
    setScores({ x: 0, ties: 0, o: 0 })
  }, [resetBoard])

  /* ── switch game mode ── */
  const switchMode = useCallback((mode) => {
    setGameMode(mode)
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setGameResult(null)
    setIsAIThinking(false)
  }, [])

  return {
    board, currentPlayer, scores, gameResult,
    isAIThinking, gameMode,
    handleCellClick, resetBoard, resetAll, switchMode,
  }
}
