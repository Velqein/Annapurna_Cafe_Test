import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import IPhoneFrame from '../components/IPhoneFrame'

/* ─── Color tokens ─────────────────────────────────────────────────────────── */
const C = {
  cream:  '#F7F5F0',
  blue:   '#1F4591',
  yellow: '#F2CF4A',
  sage:   '#A8D5A2',
  green:  '#7FB36B',
  orange: '#E85D3F',
}

/* ─── SVG Illustrations ─────────────────────────────────────────────────────── */
const HerbLeaves = () => (
  <svg width="130" height="160" viewBox="0 0 130 160" fill="none">
    <path d="M30 140 C25 110 10 80 20 50 C30 20 55 10 65 5" stroke={C.blue} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M30 140 C35 120 50 100 45 75 C40 55 25 45 15 30" stroke={C.blue} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M20 50 C35 45 55 50 65 40 C75 30 72 15 65 5" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M30 80 C45 72 62 75 70 60 C78 48 74 32 65 22" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M15 30 C28 28 40 35 48 25 C56 15 52 2 44 -5" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M26 100 C38 95 52 98 58 86 C64 74 60 60 52 52" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M30 120 C42 115 55 118 60 106 C65 95 60 82 52 74" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="65" cy="5" r="2" fill={C.blue}/>
    <circle cx="15" cy="30" r="1.5" fill={C.blue}/>
  </svg>
)

const MushroomIllustration = () => (
  <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
    <path d="M28 60 C28 55 30 45 40 45 C50 45 52 55 52 60" stroke={C.blue} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M28 60 L30 85 C30 87 32 90 35 90 C38 90 40 88 40 85" stroke={C.blue} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M52 60 L50 85 C50 87 48 90 45 90 C42 90 40 88 40 85" stroke={C.blue} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M40 45 C40 35 42 25 40 15" stroke={C.blue} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M8 48 C12 25 25 10 40 8 C55 10 68 25 72 48 C72 52 68 55 64 54 C55 52 45 50 40 50 C35 50 25 52 16 54 C12 55 8 52 8 48 Z" stroke={C.blue} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M20 42 C22 35 28 28 35 24" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M58 40 C56 33 50 27 44 23" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <circle cx="32" cy="22" r="3" stroke={C.blue} strokeWidth="1.2" fill="none"/>
    <circle cx="50" cy="18" r="2.5" stroke={C.blue} strokeWidth="1.2" fill="none"/>
    <circle cx="40" cy="30" r="2" stroke={C.blue} strokeWidth="1.2" fill="none"/>
  </svg>
)

const LeafBranch = () => (
  <svg width="55" height="180" viewBox="0 0 55 180" fill="none">
    <path d="M27 175 C27 155 25 135 27 115 C29 95 27 75 27 55 C27 35 28 15 27 5" stroke={C.blue} strokeWidth="2" strokeLinecap="round" fill="none"/>
    {[20,45,70,95,120,145].map((y, i) => (
      <g key={i}>
        <path d={`M27 ${y} C${i%2===0?5:49} ${y-15} ${i%2===0?2:52} ${y-30} ${i%2===0?12:42} ${y-38}`} stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d={`M27 ${y} C${i%2===0?10:44} ${y-8} ${i%2===0?8:46} ${y-20} ${i%2===0?12:42} ${y-38}`} stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      </g>
    ))}
  </svg>
)

const ChilliPair = () => (
  <svg width="110" height="90" viewBox="0 0 110 90" fill="none">
    <path d="M25 20 C22 15 25 8 30 5 C32 10 30 16 25 20 Z" stroke={C.blue} strokeWidth="1.5" fill="none"/>
    <path d="M25 20 C20 28 18 38 20 50 C22 62 28 72 30 80 C32 85 35 88 37 85 C40 80 38 70 36 58 C34 46 32 36 30 28 C28 22 26 20 25 20 Z" stroke={C.blue} strokeWidth="2" fill="none"/>
    <path d="M25 35 C22 35 20 38 21 42" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M27 50 C24 50 22 53 23 57" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M75 15 C72 10 75 3 80 0 C82 5 80 11 75 15 Z" stroke={C.blue} strokeWidth="1.5" fill="none"/>
    <path d="M75 15 C72 23 72 33 76 45 C80 57 85 68 84 76 C83 82 80 85 78 83 C75 78 74 68 72 56 C70 44 70 34 72 26 C74 18 75 15 75 15 Z" stroke={C.blue} strokeWidth="2" fill="none"/>
    <path d="M78 30 C81 30 83 33 82 37" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M32 12 C50 8 60 12 68 18" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 3" fill="none"/>
  </svg>
)

const NoodleBowl = () => (
  <svg width="110" height="100" viewBox="0 0 110 100" fill="none">
    <path d="M28 5 L42 42" stroke={C.blue} strokeWidth="2" strokeLinecap="round"/>
    <path d="M38 2 L50 40" stroke={C.blue} strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 48 C10 48 15 88 55 88 C95 88 100 48 100 48 Z" stroke={C.blue} strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
    <path d="M8 46 C8 42 30 38 55 38 C80 38 102 42 102 46 C102 50 80 52 55 52 C30 52 8 50 8 46 Z" stroke={C.blue} strokeWidth="2" fill="none"/>
    <path d="M22 46 C28 44 32 48 38 46 C44 44 48 48 54 46 C60 44 64 48 70 46 C76 44 80 47 86 46" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M18 49 C24 47 30 51 36 49 C42 47 46 51 52 49 C58 47 64 51 70 49 C76 47 82 50 88 49" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <circle cx="42" cy="44" r="4" stroke={C.blue} strokeWidth="1.5" fill="none"/>
    <circle cx="42" cy="44" r="1.5" fill={C.blue}/>
    <path d="M60 40 C62 38 66 38 68 40 C70 42 70 46 68 48 C66 50 62 50 60 48 C58 46 58 42 60 40 Z" stroke={C.blue} strokeWidth="1.2" fill="none"/>
    <path d="M38 34 C36 28 38 22 36 16" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M55 32 C53 26 55 20 53 14" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M72 34 C70 28 72 22 70 16" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M30 87 C30 92 40 95 55 95 C70 95 80 92 80 87" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4"/>
  </svg>
)

const Particles = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    {[
      [10,10],[25,5],[40,12],[55,6],[70,15],
      [5,28],[20,22],[38,30],[58,25],[72,32],
      [15,45],[35,48],[52,42],[68,50],
      [8,62],[28,65],[48,60],[65,68],
    ].map(([cx,cy],i)=>(
      <circle key={i} cx={cx} cy={cy} r={i%3===0?2.5:i%3===1?1.8:1.2} fill={C.blue} opacity={0.35}/>
    ))}
  </svg>
)

const YellowBlob = () => (
  <svg viewBox="0 0 320 320" style={{width:'100%',height:'100%'}}>
    <path d="M160,20 C210,10 280,40 305,90 C330,140 310,210 275,255 C240,300 180,320 130,310 C80,300 30,265 15,215 C0,165 20,105 55,65 C90,25 110,30 160,20 Z" fill={C.yellow}/>
  </svg>
)

const GreenBlob = () => (
  <svg viewBox="0 0 260 300" style={{width:'100%',height:'100%'}}>
    <path d="M130,15 C175,5 225,35 245,80 C265,125 250,185 220,225 C190,265 140,285 95,275 C50,265 10,230 2,185 C-6,140 15,90 45,55 C75,20 85,25 130,15 Z" fill={C.sage}/>
  </svg>
)

/* ─── Hamburger Drawer ───────────────────────────────────────────────────────── */
const menuLinks = [
  { label: 'About Us' },
  { label: 'Brand Information' },
  { label: 'Instagram' },
  { label: 'Facebook' },
  { label: 'WhatsApp / Contact' },
]

function HamburgerDrawer({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(10,20,60,0.45)',
              zIndex: 40,
            }}
          />

          {/* drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 310, damping: 32 }}
            style={{
              position: 'absolute', top: 0, right: 0, bottom: 0,
              width: '72%',
              background: C.blue,
              zIndex: 50,
              padding: '56px 28px 40px',
              display: 'flex', flexDirection: 'column',
              borderRadius: '0 0 0 32px',
            }}
          >
            {/* close */}
            <motion.button
              onClick={onClose}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute', top: 16, right: 18,
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.14)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 1L12 12M12 1L1 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </motion.button>

            {/* brand */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: "'Bungee',sans-serif", fontSize: 22, color: 'white', letterSpacing: '0.04em' }}>ANNAPURNA</div>
              <div style={{ fontFamily: "'Caveat',cursive", fontSize: 16, color: C.sage, marginTop: 3 }}>Feel the Flavor!</div>
            </div>

            {/* links */}
            {menuLinks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.055 }}
                style={{
                  padding: '13px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.10)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, fontWeight: 500, color: 'white' }}>
                  {item.label}
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M7 3L11 7L7 11" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            ))}

            {/* footer */}
            <div style={{ marginTop: 'auto', paddingTop: 24 }}>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
                © 2025 Annapurna Kitchen
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─── HOME PAGE ─────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 28 },
    animate:    mounted ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <div style={{ minHeight: '100vh', background: '#d9d5cc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
      <IPhoneFrame>

        {/* ── Yellow blob top-right ── */}
        <motion.div
          style={{ position: 'absolute', top: -60, right: -55, width: 260, height: 260, zIndex: 1, opacity: 0.92 }}
          animate={{ y: [0,-16,0], rotate: [0,3,-2,0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <YellowBlob/>
        </motion.div>

        {/* ── Green blob left-middle ── */}
        <motion.div
          style={{ position: 'absolute', top: 200, left: -80, width: 220, height: 250, zIndex: 1, opacity: 0.75 }}
          animate={{ y: [0,-10,5,0], rotate: [0,-2,1,0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <GreenBlob/>
        </motion.div>

        {/* ── Herb leaves top-left ── */}
        <motion.div
          style={{ position: 'absolute', top: 55, left: 8, zIndex: 3 }}
          animate={{ y: [0,-10,0], rotate: [0,2,-1,0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HerbLeaves/>
        </motion.div>

        {/* ── Particles top-right ── */}
        <motion.div
          style={{ position: 'absolute', top: 55, right: 30, zIndex: 3, opacity: 0.7 }}
          animate={{ y: [0,-6,0], opacity: [0.5,0.8,0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Particles/>
        </motion.div>

        {/* ── Mushroom left-middle ── */}
        <motion.div
          style={{ position: 'absolute', top: 310, left: 10, zIndex: 3 }}
          animate={{ y: [0,-8,0], rotate: [0,1.5,-1,0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          <MushroomIllustration/>
        </motion.div>

        {/* ── Leaf branch bottom-left ── */}
        <motion.div
          style={{ position: 'absolute', bottom: 90, left: 14, zIndex: 3 }}
          animate={{ y: [0,-8,0], rotate: [0,1.5,-1,0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <LeafBranch/>
        </motion.div>

        {/* ── Chilli pair bottom-right ── */}
        <motion.div
          style={{ position: 'absolute', bottom: 105, right: 18, zIndex: 3 }}
          animate={{ y: [0,-7,0], rotate: [0,-2,1,0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <ChilliPair/>
        </motion.div>

        {/* ── Status bar ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 54, zIndex: 10,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          padding: '0 28px 8px',
          fontSize: 12, fontWeight: 600, color: C.blue, fontFamily: "'Poppins',sans-serif",
        }}>
          <span>9:41</span>
          <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><rect x="0" y="4" width="3" height="8" rx="1" fill={C.blue}/><rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill={C.blue}/><rect x="9" y="1" width="3" height="11" rx="1" fill={C.blue}/><rect x="13.5" y="0" width="2.5" height="12" rx="1" fill={C.blue} opacity="0.4"/></svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 2C10.8 2 13.3 3.2 15 5.2L13.6 6.6C12.3 5 10.3 4 8 4C5.7 4 3.7 5 2.4 6.6L1 5.2C2.7 3.2 5.2 2 8 2Z" fill={C.blue}/><path d="M8 6C9.7 6 11.2 6.7 12.3 7.8L10.9 9.2C10.1 8.4 9.1 8 8 8C6.9 8 5.9 8.4 5.1 9.2L3.7 7.8C4.8 6.7 6.3 6 8 6Z" fill={C.blue}/><circle cx="8" cy="11" r="1.5" fill={C.blue}/></svg>
            <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={C.blue} strokeOpacity="0.35"/><rect x="2" y="2" width="18" height="9" rx="2" fill={C.blue}/><path d="M24 4.5V8.5C24.8 8.2 25.5 7.5 25.5 6.5C25.5 5.5 24.8 4.8 24 4.5Z" fill={C.blue} opacity="0.4"/></svg>
          </span>
        </div>

        {/* ── Hamburger button ── */}
        <motion.div
          {...fadeUp(0.2)}
          style={{
            position: 'absolute', top: 62, right: 22, zIndex: 20,
            width: 46, height: 46, borderRadius: 23,
            background: C.blue,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(31,69,145,0.35)',
            cursor: 'pointer',
          }}
          whileTap={{ scale: 0.93 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setDrawerOpen(true)}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <path d="M1 2 H21" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M1 8 H21" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M1 14 H21" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </motion.div>

        {/* ── Center content ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          zIndex: 10, paddingTop: 20,
        }}>
          {/* Noodle bowl illustration */}
          <motion.div
            style={{ marginBottom: 4 }}
            animate={{ y: [0,-8,0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            {...fadeUp(0.3)}
          >
            <NoodleBowl/>
          </motion.div>

          {/* ANNAPURNA */}
          <motion.div {...fadeUp(0.45)} style={{ textAlign: 'center', lineHeight: 1 }}>
            <div style={{
              fontFamily: "'Bungee',cursive",
              fontSize: 46,
              color: C.blue,
              letterSpacing: '0.04em',
              textShadow: '2px 3px 0px rgba(31,69,145,0.12)',
            }}>
              ANNAPURNA
            </div>
          </motion.div>

          {/* divider */}
          <motion.div {...fadeUp(0.52)} style={{ display: 'flex', alignItems: 'center', gap: 8, width: 240, margin: '6px 0' }}>
            <div style={{ flex: 1, height: 1.5, background: C.blue, opacity: 0.3, borderRadius: 2 }}/>
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
              {[0,4,8,12,16].map((x,i)=>(
                <circle key={i} cx={x+1} cy="5" r={i===2?2.5:1.5} fill={C.blue} opacity={i===2?0.8:0.4}/>
              ))}
            </svg>
            <div style={{ flex: 1, height: 1.5, background: C.blue, opacity: 0.3, borderRadius: 2 }}/>
          </motion.div>

          {/* KITCHEN */}
          <motion.div {...fadeUp(0.55)} style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: 15, fontWeight: 600,
            color: C.blue, letterSpacing: '0.38em', opacity: 0.85,
          }}>
            KITCHEN
          </motion.div>

          {/* tagline */}
          <motion.div {...fadeUp(0.65)} style={{
            fontFamily: "'Caveat',cursive",
            fontSize: 28, fontWeight: 700,
            color: '#3a8a35',
            marginTop: 14, letterSpacing: '0.02em',
            transform: 'rotate(-1.5deg)',
          }}>
            Feel the Flavor!
          </motion.div>
        </div>

        {/* ── Explore Menu CTA ── */}
        <motion.div
          {...fadeUp(0.85)}
          style={{ position: 'absolute', bottom: 52, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 20 }}
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03, boxShadow: '0 12px 32px rgba(232,93,63,0.45)' }}
            onClick={() => navigate('/menu')}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              background: C.orange,
              border: 'none', cursor: 'pointer',
              borderRadius: 50,
              padding: '16px 32px',
              boxShadow: '0 8px 24px rgba(232,93,63,0.38)',
            }}
          >
            <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 16, color: 'white', letterSpacing: '0.04em' }}>
              EXPLORE MENU
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 17, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10 H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M11 5 L16 10 L11 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.button>
        </motion.div>

        {/* ── Home indicator ── */}
        <div style={{
          position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
          width: 130, height: 5, background: C.blue, opacity: 0.25, borderRadius: 3, zIndex: 30,
        }}/>

        {/* ── Hamburger Drawer (inside screen) ── */}
        <HamburgerDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      </IPhoneFrame>
    </div>
  )
}
