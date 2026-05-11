import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import IPhoneFrame from '../components/IPhoneFrame'
import { useGame } from '../hooks/useGame'

/* ─── Color tokens ─────────────────────────────────────────────────────────── */
const C = {
  cream:  '#F7F5F0',
  blue:   '#1F4591',
  yellow: '#F2CF4A',
  sage:   '#A8D5A2',
  green:  '#7FB36B',
  orange: '#E85D3F',
  card:   '#FFFFFF',
}

/* ─── Botanical SVG Illustrations ───────────────────────────────────────────── */
const HerbLeft = () => (
  <svg width="72" height="200" viewBox="0 0 72 200" fill="none">
    <path d="M36 195 C34 165 30 140 32 110 C34 80 33 55 35 30 C36 15 36 8 36 2" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    {[
      [36,170, 8,158,  2,145, 14,136],
      [36,145,60,133, 65,120, 52,112],
      [36,118, 6,106,  0, 92, 13, 85],
      [36, 92,62, 80, 66, 66, 52, 59],
      [36, 65, 5, 53, -1, 40, 12, 32],
      [36, 38,60, 27, 65, 13, 50,  6],
    ].map(([sx,sy,cx1,cy1,cx2,cy2,ex,ey],i)=>(
      <g key={i}>
        <path d={`M${sx} ${sy} C${cx1} ${cy1} ${cx2} ${cy2} ${ex} ${ey}`} stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d={`M${sx} ${sy} C${sx+(cx1-sx)*0.5} ${sy+(cy1-sy)*0.5} ${cx2} ${cy2} ${ex} ${ey}`} stroke={C.blue} strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.6"/>
      </g>
    ))}
    <circle cx="36" cy="2" r="2.5" fill={C.blue}/>
  </svg>
)

const MushroomRight = () => (
  <svg width="90" height="115" viewBox="0 0 90 115" fill="none">
    <path d="M10 55 C14 28 26 10 45 8 C64 10 76 28 80 55 C80 60 76 63 72 62 C62 59 52 57 45 57 C38 57 28 59 18 62 C14 63 10 60 10 55Z" stroke={C.blue} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M33 57 L34 95 C34 98 37 101 41 101 C45 101 47 98 47 95" stroke={C.blue} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M57 57 L56 95 C56 98 53 101 49 101 C45 101 43 98 43 95" stroke={C.blue} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M34 72 C38 70 52 70 56 72" stroke={C.blue} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    <circle cx="35" cy="30" r="3.5" stroke={C.blue} strokeWidth="1.3" fill="none"/>
    <circle cx="54" cy="24" r="3" stroke={C.blue} strokeWidth="1.3" fill="none"/>
    <circle cx="44" cy="40" r="2.5" stroke={C.blue} strokeWidth="1.2" fill="none"/>
    <path d="M22 48 C26 38 34 30 40 26" stroke={C.blue} strokeWidth="1.1" strokeLinecap="round" fill="none"/>
    <path d="M65 46 C61 36 54 29 48 25" stroke={C.blue} strokeWidth="1.1" strokeLinecap="round" fill="none"/>
  </svg>
)

const ChilliLeft = () => (
  <svg width="65" height="130" viewBox="0 0 65 130" fill="none">
    <path d="M28 12 C25 8 26 2 31 0 C33 5 31 10 28 12Z" stroke={C.blue} strokeWidth="1.5" fill="none"/>
    <path d="M42 10 C39 6 41 0 46 -1 C48 4 46 9 42 10Z" stroke={C.blue} strokeWidth="1.5" fill="none"/>
    <path d="M28 12 C23 22 20 34 22 48 C24 62 30 74 32 82 C34 88 37 92 39 88 C41 83 38 70 36 56 C34 42 33 30 30 20 C29 16 28 14 28 12Z" stroke={C.blue} strokeWidth="1.8" fill="none"/>
    <path d="M27 30 C23 30 20 34 22 38" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M42 10 C38 20 37 32 40 46 C43 60 48 72 46 80 C44 86 47 90 50 86 C53 80 50 66 47 52 C44 38 43 26 43 14 C43 12 42 10 42 10Z" stroke={C.blue} strokeWidth="1.8" fill="none"/>
    <path d="M44 28 C48 28 51 32 50 36" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M32 10 C36 7 40 8 44 10" stroke={C.blue} strokeWidth="1.1" strokeDasharray="3 2" strokeLinecap="round" fill="none"/>
  </svg>
)

const HerbRight = () => (
  <svg width="52" height="185" viewBox="0 0 52 185" fill="none">
    <path d="M26 180 C26 155 24 130 26 105 C28 80 26 55 26 30 C26 15 27 8 26 2" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    {[
      [26,160, 2,148, -2,136,10,128],
      [26,135,50,123, 54,110,42,102],
      [26,108, 0, 96, -4, 83, 8, 76],
      [26, 82,50, 70, 54, 57,40, 50],
      [26, 55, 0, 43, -4, 30, 9, 22],
      [26, 28,50, 17, 54,  4,40, -2],
    ].map(([sx,sy,cx1,cy1,cx2,cy2,ex,ey],i)=>(
      <g key={i}>
        <path d={`M${sx} ${sy} C${cx1} ${cy1} ${cx2} ${cy2} ${ex} ${ey}`} stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d={`M${sx} ${sy} C${sx+(cx1-sx)*0.6} ${sy+(cy1-sy)*0.6} ${ex} ${ey} ${ex} ${ey}`} stroke={C.blue} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.55"/>
      </g>
    ))}
    <circle cx="26" cy="2" r="2.5" fill={C.blue}/>
  </svg>
)

const SmallLeafTitle = ({ flip = false }) => (
  <svg width="20" height="26" viewBox="0 0 20 26" fill="none" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
    <path d="M10 24 C10 16 3 10 1 4 C6 1 12 7 10 13" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M10 13 L10 24" stroke={C.blue} strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M10 19 C13 17 17 14 19 9" stroke={C.blue} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
  </svg>
)

/* ─── Game symbols ───────────────────────────────────────────────────────────── */
const XSymbol = ({ size = 46 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <path d="M10 10 Q30 30 50 50" stroke={C.blue} strokeWidth="7" strokeLinecap="round"/>
    <path d="M50 10 Q30 30 10 50" stroke={C.blue} strokeWidth="7" strokeLinecap="round"/>
  </svg>
)

const OSymbol = ({ size = 46 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="19" stroke={C.orange} strokeWidth="6" strokeLinecap="round" strokeDasharray="8 3"/>
  </svg>
)

/* ─── Turn / Result Pill ─────────────────────────────────────────────────────── */
function StatusPill({ gameResult, currentPlayer, isAIThinking, gameMode }) {
  if (gameResult) {
    if (gameResult.winner === 'draw') {
      return (
        <motion.div
          key="draw"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 18, paddingRight: 18, paddingTop: 8, paddingBottom: 8, borderRadius: 50, background: C.green, boxShadow: '0 4px 14px rgba(127,179,107,0.4)' }}
        >
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.1em' }}>IT'S A DRAW!</span>
        </motion.div>
      )
    }
    const isX = gameResult.winner === 'X'
    return (
      <motion.div
        key="winner"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: [1, 1.08, 1], opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 14, paddingRight: 18, paddingTop: 8, paddingBottom: 8, borderRadius: 50, background: isX ? C.blue : C.orange, boxShadow: isX ? '0 4px 14px rgba(31,69,145,0.4)' : '0 4px 14px rgba(232,93,63,0.4)' }}
      >
        {isX ? <XSymbol size={14}/> : <OSymbol size={14}/>}
        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>
          {isX ? 'X WINS! 🎉' : 'O WINS! 🎉'}
        </span>
      </motion.div>
    )
  }

  if (isAIThinking) {
    return (
      <motion.div
        key="thinking"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 14, paddingRight: 18, paddingTop: 8, paddingBottom: 8, borderRadius: 50, background: C.orange, boxShadow: '0 4px 14px rgba(232,93,63,0.3)' }}
      >
        <OSymbol size={14}/>
        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.12em' }}>AI THINKING…</span>
      </motion.div>
    )
  }

  const isX = currentPlayer === 'X'
  const label = gameMode === 'single'
    ? (isX ? 'YOUR TURN' : 'AI TURN')
    : (isX ? 'X TURN' : 'O TURN')

  return (
    <motion.div
      key={`turn-${currentPlayer}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: [1, 1.04, 1], opacity: 1 }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ display: 'flex', alignItems: 'center', gap: 7, paddingLeft: 14, paddingRight: 18, paddingTop: 7, paddingBottom: 7, borderRadius: 50, background: isX ? C.blue : C.orange, boxShadow: isX ? '0 4px 14px rgba(31,69,145,0.30)' : '0 4px 14px rgba(232,93,63,0.30)' }}
    >
      {isX ? <XSymbol size={14}/> : <OSymbol size={14}/>}
      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.14em' }}>
        {label}
      </span>
    </motion.div>
  )
}

/* ─── GAME PAGE ──────────────────────────────────────────────────────────────── */
export default function GamePage() {
  const navigate = useNavigate()
  const {
    board, currentPlayer, scores, gameResult, isAIThinking, gameMode,
    handleCellClick, resetBoard, resetAll, switchMode,
  } = useGame()

  const isWinningCell = (i) => gameResult?.line?.includes(i)

  /* ── floating dots ── */
  const dots = [
    { size: 5,  top: 68,  right: 26, color: C.yellow },
    { size: 7,  top: 82,  right: 14, color: C.sage   },
    { size: 4,  top: 95,  right: 34, color: C.yellow },
    { size: 6,  top: 110, right: 20, color: C.sage   },
    { size: 4,  top: 125, right: 10, color: C.yellow },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#c8c4bc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
      <IPhoneFrame>

        {/* ── Background blobs ── */}
        <motion.div
          style={{ position: 'absolute', left: -50, top: 60, width: 220, height: 300, borderRadius: '60% 40% 50% 70%', background: C.sage, opacity: 0.28, filter: 'blur(44px)', pointerEvents: 'none' }}
          animate={{ x: [0,12,0], y: [0,-14,0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{ position: 'absolute', right: -60, top: 0, width: 200, height: 260, borderRadius: '50% 70% 40% 60%', background: C.yellow, opacity: 0.30, filter: 'blur(38px)', pointerEvents: 'none' }}
          animate={{ x: [0,-10,0], y: [0,16,0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Botanical illustrations ── */}
        <div style={{ position: 'absolute', left: -4, top: 130, opacity: 0.30, pointerEvents: 'none' }}><HerbLeft/></div>
        <div style={{ position: 'absolute', right: 0, top: 110, opacity: 0.28, pointerEvents: 'none' }}><MushroomRight/></div>
        <div style={{ position: 'absolute', left: 0, bottom: 90, opacity: 0.28, pointerEvents: 'none' }}><ChilliLeft/></div>
        <div style={{ position: 'absolute', right: 2, bottom: 60, opacity: 0.28, pointerEvents: 'none' }}><HerbRight/></div>

        {/* ── Floating dots ── */}
        {dots.map((d, i) => (
          <motion.div key={i}
            style={{ position: 'absolute', top: d.top, right: d.right, width: d.size, height: d.size, borderRadius: '50%', background: d.color, opacity: 0.75, pointerEvents: 'none' }}
            animate={{ y: [0,-6,0] }}
            transition={{ duration: 3+i*0.5, repeat: Infinity, ease: 'easeInOut', delay: i*0.4 }}
          />
        ))}

        {/* ══════════ SCROLLABLE CONTENT ══════════ */}
        <div style={{ position: 'relative', zIndex: 10, height: '100%', overflowY: 'auto', padding: '0 18px 24px', scrollbarWidth: 'none' }}>

          {/* Status bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 8px 6px', position: 'relative' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#111', fontFamily: "'Poppins',sans-serif" }}>9:41</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg width="16" height="11" viewBox="0 0 16 11" fill={C.blue}><rect x="0" y="5" width="3" height="6" rx="1"/><rect x="4.5" y="3" width="3" height="8" rx="1"/><rect x="9" y="1" width="3" height="10" rx="1"/><rect x="13.5" y="0" width="2.5" height="11" rx="1" opacity="0.35"/></svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 9.5a1 1 0 100 2 1 1 0 000-2z" fill={C.blue}/><path d="M4.5 7.5C5.4 6.6 6.4 6 7.5 6s2.1.6 3 1.5" stroke={C.blue} strokeWidth="1.4" strokeLinecap="round" fill="none"/><path d="M2 5C3.8 3.2 5.6 2.2 7.5 2.2S11.2 3.2 13 5" stroke={C.blue} strokeWidth="1.4" strokeLinecap="round" fill="none"/><path d="M0 2.5C2.2.8 4.7 0 7.5 0s5.3.8 7.5 2.5" stroke={C.blue} strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <div style={{ width: 22, height: 11, border: `1.5px solid ${C.blue}`, borderRadius: 3, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: '1.5px 4px 1.5px 1.5px', background: C.blue, borderRadius: 1 }}/>
                </div>
                <div style={{ width: 2, height: 5, background: C.blue, borderRadius: 1, marginLeft: 1 }}/>
              </div>
            </div>
          </div>

          {/* HEADER */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            {/* back */}
            <motion.button
              style={{ width: 36, height: 36, borderRadius: '50%', background: C.card, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.10)', flexShrink: 0 }}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
              onClick={() => navigate('/menu')}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            {/* title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <motion.div animate={{ rotate: [-4,4,-4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <SmallLeafTitle/>
              </motion.div>
              <h1 style={{ fontFamily: "'Bungee',sans-serif", fontSize: 17, color: C.blue, letterSpacing: '0.08em', lineHeight: 1 }}>
                TIC TAC TOE
              </h1>
              <motion.div animate={{ rotate: [4,-4,4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <SmallLeafTitle flip/>
              </motion.div>
            </div>

            {/* trophy / reset all */}
            <motion.button
              style={{ width: 36, height: 36, borderRadius: '50%', background: C.yellow, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(242,207,74,0.40)', flexShrink: 0 }}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
              onClick={resetAll}
              title="Reset all scores"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M8 21h8M12 17v4M5 3h14l-1 8c0 3.3-2.7 6-6 6s-6-2.7-6-6L5 3Z" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 3H3M19 3h2" stroke={C.blue} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </motion.button>
          </div>

          {/* SUBTITLE */}
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <motion.p
              style={{ fontFamily: "'Caveat',cursive", fontSize: 20, fontWeight: 700, color: C.green, lineHeight: 1.2 }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            >
              Play, Compete &amp; Win!
            </motion.p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 6 }}>
              <div style={{ width: 28, height: 2.5, borderRadius: 2, background: C.yellow }}/>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.yellow }}/>
              <div style={{ width: 28, height: 2.5, borderRadius: 2, background: C.yellow }}/>
            </div>
          </div>

          {/* GAME MODE CARDS */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            {/* Single Player */}
            <motion.div
              onClick={() => switchMode('single')}
              style={{
                flex: 1, borderRadius: 20, padding: '12px 12px 14px',
                background: gameMode === 'single' ? '#C8ECC5' : '#DFF3DC',
                cursor: 'pointer',
                border: gameMode === 'single' ? `2px solid ${C.green}` : '2px solid transparent',
                boxShadow: gameMode === 'single' ? '0 4px 16px rgba(127,179,107,0.22)' : 'none',
              }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#A8D5A2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="7" r="4" stroke={C.blue} strokeWidth="2"/>
                  <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" stroke={C.blue} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <p style={{ fontFamily: "'Bungee',sans-serif", fontSize: 9.5, color: C.blue, letterSpacing: '0.06em', marginBottom: 2 }}>SINGLE PLAYER</p>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 9, color: '#5a7a55', marginBottom: 8 }}>Play vs AI</p>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#A8D5A2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </motion.div>

            {/* Multiplayer */}
            <motion.div
              onClick={() => switchMode('multi')}
              style={{
                flex: 1, borderRadius: 20, padding: '12px 12px 14px',
                background: gameMode === 'multi' ? '#D6E8FF' : '#EBF3FF',
                cursor: 'pointer',
                border: gameMode === 'multi' ? `2px solid ${C.blue}` : '2px solid transparent',
                boxShadow: gameMode === 'multi' ? '0 4px 16px rgba(31,69,145,0.14)' : 'none',
              }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="7" r="3" stroke={C.blue} strokeWidth="2"/>
                  <circle cx="16" cy="7" r="3" stroke={C.blue} strokeWidth="2"/>
                  <path d="M2 21c0-3.3 3.1-6 7-6" stroke={C.blue} strokeWidth="2" strokeLinecap="round"/>
                  <path d="M22 21c0-3.3-3.1-6-7-6s-7 2.7-7 6" stroke={C.blue} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <p style={{ fontFamily: "'Bungee',sans-serif", fontSize: 9.5, color: C.blue, letterSpacing: '0.06em', marginBottom: 2 }}>MULTIPLAYER</p>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 9, color: '#4a6aa0', marginBottom: 8 }}>Play with a friend</p>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </motion.div>
          </div>

          {/* SCORE CARD */}
          <motion.div
            style={{ background: C.card, borderRadius: 22, padding: '14px 16px', boxShadow: '0 4px 20px rgba(31,69,145,0.07)', marginBottom: 10 }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
              {/* X */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span style={{ fontFamily: "'Bungee',sans-serif", fontSize: 26, color: C.blue, lineHeight: 1 }}>X</span>
                <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 8.5, fontWeight: 600, color: '#aaa', letterSpacing: '0.12em' }}>
                  {gameMode === 'single' ? 'YOU' : 'PLAYER 1'}
                </span>
                <motion.span
                  key={scores.x}
                  initial={{ scale: 1.4 }} animate={{ scale: 1 }}
                  style={{ fontFamily: "'Bungee',sans-serif", fontSize: 24, color: C.blue }}
                >
                  {String(scores.x).padStart(2, '0')}
                </motion.span>
              </div>

              <div style={{ width: 1, height: 52, background: '#EBEBEB' }}/>

              {/* TIES */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 8.5, fontWeight: 700, color: C.green, letterSpacing: '0.12em' }}>TIES</span>
                <motion.span
                  key={scores.ties}
                  initial={{ scale: 1.4 }} animate={{ scale: 1 }}
                  style={{ fontFamily: "'Bungee',sans-serif", fontSize: 24, color: '#333' }}
                >
                  {String(scores.ties).padStart(2, '0')}
                </motion.span>
              </div>

              <div style={{ width: 1, height: 52, background: '#EBEBEB' }}/>

              {/* O */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span style={{ fontFamily: "'Bungee',sans-serif", fontSize: 26, color: C.orange, lineHeight: 1 }}>O</span>
                <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 8.5, fontWeight: 600, color: '#aaa', letterSpacing: '0.12em' }}>
                  {gameMode === 'single' ? 'AI' : 'PLAYER 2'}
                </span>
                <motion.span
                  key={scores.o}
                  initial={{ scale: 1.4 }} animate={{ scale: 1 }}
                  style={{ fontFamily: "'Bungee',sans-serif", fontSize: 24, color: C.orange }}
                >
                  {String(scores.o).padStart(2, '0')}
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* TURN INDICATOR */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
            <AnimatePresence mode="wait">
              <StatusPill
                key={gameResult ? `result-${gameResult.winner}` : `turn-${currentPlayer}-${isAIThinking}`}
                gameResult={gameResult}
                currentPlayer={currentPlayer}
                isAIThinking={isAIThinking}
                gameMode={gameMode}
              />
            </AnimatePresence>
          </div>

          {/* GAME BOARD */}
          <motion.div
            style={{ background: C.card, borderRadius: 26, padding: 16, boxShadow: '0 8px 32px rgba(31,69,145,0.09)', marginBottom: 12 }}
            initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 220 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', position: 'relative' }}>
              {/* grid lines */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '33.33%', width: 1.5, background: C.blue, opacity: 0.13 }}/>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '66.66%', width: 1.5, background: C.blue, opacity: 0.13 }}/>
                <div style={{ position: 'absolute', left: 0, right: 0, top: '33.33%', height: 1.5, background: C.blue, opacity: 0.13 }}/>
                <div style={{ position: 'absolute', left: 0, right: 0, top: '66.66%', height: 1.5, background: C.blue, opacity: 0.13 }}/>
              </div>

              {board.map((cell, i) => (
                <motion.div
                  key={i}
                  onClick={() => handleCellClick(i)}
                  style={{
                    height: 76,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: cell || gameResult || isAIThinking ? 'default' : 'pointer',
                    background: isWinningCell(i) ? 'rgba(242,207,74,0.18)' : 'transparent',
                    borderRadius: 8,
                    transition: 'background 0.3s',
                  }}
                  whileHover={!cell && !gameResult && !isAIThinking ? { scale: 1.06, background: 'rgba(31,69,145,0.04)' } : {}}
                  whileTap={!cell && !gameResult && !isAIThinking ? { scale: 0.94 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {cell === 'X' && (
                      <motion.div key={`x-${i}`} initial={{ scale: 0, rotate: -25 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 340, damping: 18 }}>
                        <XSymbol size={46}/>
                      </motion.div>
                    )}
                    {cell === 'O' && (
                      <motion.div key={`o-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 340, damping: 18 }}>
                        <OSymbol size={46}/>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RESET BUTTON */}
          <motion.button
            onClick={resetBoard}
            style={{
              width: '100%', padding: '13px 0',
              borderRadius: 22, border: 'none', cursor: 'pointer',
              background: C.yellow,
              boxShadow: '0 5px 18px rgba(242,207,74,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              marginBottom: 12,
            }}
            whileHover={{ scale: 1.025, boxShadow: '0 8px 24px rgba(242,207,74,0.55)' }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M1 4v6h6" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 20v-6h-6" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontFamily: "'Bungee',sans-serif", fontSize: 14, color: C.blue, letterSpacing: '0.09em' }}>RESET GAME</span>
          </motion.button>

          {/* BOTTOM INFO CARD */}
          <motion.div
            style={{ background: C.card, borderRadius: 22, padding: '14px 16px', boxShadow: '0 4px 20px rgba(31,69,145,0.07)' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Win Rules */}
              <div style={{ flex: 1, display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#EBF6E9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2a7 7 0 00-7 7c0 2.6 1.4 4.9 3.5 6.2V17a.5.5 0 00.5.5h6a.5.5 0 00.5-.5v-1.8C17.6 13.9 19 11.6 19 9a7 7 0 00-7-7z" stroke={C.sage} strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M9 21h6M10 19h4" stroke={C.sage} strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'Bungee',sans-serif", fontSize: 10, color: C.blue, letterSpacing: '0.05em', marginBottom: 4 }}>Win Rules</p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 8.5, color: '#888', lineHeight: 1.55 }}>
                    Be the first to get 3 in a row (horizontal, vertical or diagonal).
                  </p>
                </div>
              </div>

              <div style={{ width: 1, alignSelf: 'stretch', background: '#F0F0F0' }}/>

              {/* Current Player */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 72 }}>
                <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 8.5, fontWeight: 600, color: '#aaa', letterSpacing: '0.08em' }}>
                  Current Player
                </span>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '5px 12px', borderRadius: 50,
                  background: currentPlayer === 'X' ? '#F0F4FF' : '#FFF4F0',
                  border: `1.5px solid ${currentPlayer === 'X' ? '#D8E4FF' : '#FFD8CC'}`,
                }}>
                  <span style={{ fontFamily: "'Bungee',sans-serif", fontSize: 13, color: currentPlayer === 'X' ? C.blue : C.orange }}>
                    {currentPlayer}
                  </span>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 9.5, fontWeight: 700, color: currentPlayer === 'X' ? C.blue : C.orange }}>
                    {gameMode === 'single' ? (currentPlayer === 'X' ? 'YOU' : 'AI') : (currentPlayer === 'X' ? 'P1' : 'P2')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>{/* end scroll */}
      </IPhoneFrame>
    </div>
  )
}
