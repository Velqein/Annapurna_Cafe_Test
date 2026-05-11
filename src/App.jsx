import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import GamePage from './pages/GamePage'
import AboutPage from './pages/AboutPage'

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"      element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/menu"  element={<PageWrapper><MenuPage /></PageWrapper>} />
        <Route path="/game"  element={<PageWrapper><GamePage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}
