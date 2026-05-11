import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const C = {
  cream:  '#F7F5F0',
  blue:   '#1F4591',
  yellow: '#F2CF4A',
  sage:   '#A8D5A2',
  green:  '#7FB36B',
  orange: '#E85D3F',
}

const LeafDecor = () => (
  <svg width="80" height="150" viewBox="0 0 80 150" fill="none">
    <path d="M40 145 C38 115 34 90 36 65 C38 40 38 22 40 8" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    {[35, 65, 95, 120].map((y, i) => (
      <path key={i} d={`M40 ${y} C${i%2===0?8:72} ${y-14} ${i%2===0?4:76} ${y-30} ${i%2===0?16:64} ${y-38}`} stroke={C.blue} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    ))}
    <circle cx="40" cy="8" r="2.5" fill={C.blue}/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const sections = [
  {
    emoji: '🍜',
    title: 'OUR STORY',
    text: 'Annapurna Kitchen was born from a passion for bold, comforting Indo-Chinese flavors. What started as a neighborhood favorite quickly grew into a community staple — one bowl at a time, cooked fresh every day.',
    bg: '#FFF8E8',
  },
  {
    emoji: '🌿',
    title: 'OUR MISSION',
    text: 'We believe great food should be accessible, honest, and packed with flavor. Every dish at Annapurna Kitchen is freshly prepared using quality ingredients and time-tested recipes with no shortcuts.',
    bg: '#EBF6E9',
  },
  {
    emoji: '🏆',
    title: "WHAT WE'RE KNOWN FOR",
    text: 'Our Schezwan Noodles, Hakka Noodles, Chilli Paneer, and Momos have earned us loyal regulars who keep coming back. Fresh, fast, and full of flavor — that\'s the Annapurna promise.',
    bg: '#F0F5FF',
  },
]

const socials = [
  { label: 'Instagram', handle: '@velqein', href: 'https://instagram.com/velqein', color: '#E1306C', Icon: InstagramIcon },
  { label: 'Facebook',  handle: '@velqein', href: 'https://facebook.com/velqein',  color: '#1877F2', Icon: FacebookIcon  },
  { label: 'WhatsApp',  handle: '+91 98340 18455', href: 'https://wa.me/919834018455', color: '#25D366', Icon: WhatsAppIcon },
]

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: C.cream, position: 'relative', overflowX: 'hidden' }}>

      {/* background decorations */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -20, opacity: 0.14 }}><LeafDecor/></div>
        <div style={{ position: 'absolute', bottom: 60, left: -15, opacity: 0.10, transform: 'scaleX(-1)' }}><LeafDecor/></div>
        <div style={{ position: 'absolute', top: -40, right: -30, width: 200, height: 200, borderRadius: '60% 40% 50% 70%', background: C.yellow, opacity: 0.15, filter: 'blur(40px)' }}/>
        <div style={{ position: 'absolute', bottom: 100, left: -40, width: 180, height: 220, borderRadius: '50% 70% 40% 60%', background: C.sage, opacity: 0.18, filter: 'blur(36px)' }}/>
      </div>

      {/* sticky header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'rgba(247,245,240,0.96)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(31,69,145,0.07)',
        padding: '14px 20px 12px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <motion.button
          onClick={() => navigate('/')}
          whileTap={{ scale: 0.92 }}
          style={{
            width: 38, height: 38, borderRadius: 19,
            background: 'white', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(31,69,145,0.12)', flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9L11 14" stroke={C.blue} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
        <div>
          <div style={{ fontFamily: "'Bungee',sans-serif", fontSize: 18, color: C.blue, letterSpacing: '0.05em', lineHeight: 1 }}>ABOUT US</div>
          <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 9, color: C.blue, opacity: 0.5, letterSpacing: '0.2em', marginTop: 2 }}>ANNAPURNA KITCHEN</div>
        </div>
      </div>

      {/* hero */}
      <div style={{ position: 'relative', zIndex: 1, padding: '36px 24px 8px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ fontFamily: "'Bungee',sans-serif", fontSize: 44, color: C.blue, letterSpacing: '0.04em', lineHeight: 1 }}>ANNAPURNA</div>
          <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600, color: C.blue, opacity: 0.5, letterSpacing: '0.38em', marginTop: 4 }}>KITCHEN</div>
          <div style={{ fontFamily: "'Caveat',cursive", fontSize: 28, fontWeight: 700, color: C.green, marginTop: 10, transform: 'rotate(-1.5deg)' }}>
            Feel the Flavor!
          </div>
        </motion.div>
      </div>

      {/* info cards */}
      <div style={{ position: 'relative', zIndex: 1, padding: '24px 20px 8px' }}>
        {sections.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
            style={{
              background: 'white', borderRadius: 20,
              padding: '18px 20px', marginBottom: 14,
              boxShadow: '0 4px 18px rgba(31,69,145,0.07)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 46, height: 46, borderRadius: 14, background: s.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
              }}>
                {s.emoji}
              </div>
              <div>
                <div style={{ fontFamily: "'Bungee',sans-serif", fontSize: 12, color: C.blue, letterSpacing: '0.06em', marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: '#555', lineHeight: 1.65 }}>{s.text}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* connect section */}
      <div style={{ position: 'relative', zIndex: 1, padding: '8px 20px 56px' }}>
        <div style={{ fontFamily: "'Bungee',sans-serif", fontSize: 13, color: C.blue, letterSpacing: '0.06em', marginBottom: 14 }}>CONNECT WITH US</div>
        {socials.map((s, i) => (
          <motion.a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              background: 'white', borderRadius: 16, padding: '14px 18px',
              marginBottom: 10, textDecoration: 'none',
              boxShadow: '0 3px 14px rgba(31,69,145,0.07)',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 13,
              background: `${s.color}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: s.color, flexShrink: 0,
            }}>
              <s.Icon/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 600, color: '#333' }}>{s.label}</div>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: '#999' }}>{s.handle}</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M7 3L11 7L7 11" stroke="#ccc" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingBottom: 36 }}>
        <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: 'rgba(31,69,145,0.3)' }}>© 2025 Annapurna Kitchen</div>
      </div>
    </div>
  )
}
