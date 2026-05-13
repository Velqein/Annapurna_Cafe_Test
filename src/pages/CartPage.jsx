import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { menuImages } from '../assets/images/menuImages'

const C = {
  cream:  '#F7F5F0',
  blue:   '#1F4591',
  yellow: '#F2CF4A',
  sage:   '#A8D5A2',
  green:  '#7FB36B',
  orange: '#E85D3F',
  card:   '#FFFFFF',
}

const FoodImg = ({ type = 'noodles', size = 52 }) => {
  const imgs = {
    noodles: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="56" rx="30" ry="10" fill="#E8956D" opacity="0.3"/>
        <path d="M10 42 C10 42 14 68 40 68 C66 68 70 42 70 42Z" fill="#D4742A"/>
        <ellipse cx="40" cy="42" rx="30" ry="10" fill="#E8956D"/>
        <path d="M15 40 C20 36 25 40 30 37 C35 34 40 38 45 35 C50 32 55 36 60 33" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <circle cx="28" cy="38" r="5" fill="#C0392B"/>
        <circle cx="52" cy="36" r="4" fill="#27AE60"/>
        <circle cx="40" cy="34" r="3.5" fill="#F39C12"/>
      </svg>
    ),
    rice: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="58" rx="28" ry="9" fill="#B8860B" opacity="0.3"/>
        <path d="M12 44 C12 44 16 66 40 66 C64 66 68 44 68 44Z" fill="#DAA520"/>
        <ellipse cx="40" cy="44" rx="28" ry="9" fill="#F0C040"/>
        {Array.from({length:18}).map((_,i)=>(
          <ellipse key={i} cx={20+Math.sin(i*1.8)*16} cy={38+Math.cos(i*2.2)*5} rx="2" ry="1.2" fill="#fff" opacity="0.7" transform={`rotate(${i*20} ${20+Math.sin(i*1.8)*16} ${38+Math.cos(i*2.2)*5})`}/>
        ))}
        <circle cx="30" cy="40" r="5" fill="#E74C3C"/>
        <circle cx="50" cy="38" r="4" fill="#2ECC71"/>
      </svg>
    ),
    momo: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="60" rx="26" ry="8" fill="#BDC3C7" opacity="0.4"/>
        {[[24,40],[34,34],[44,33],[54,40],[28,50],[40,52],[52,49]].map(([cx,cy],i)=>(
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx="9" ry="7" fill="#ECF0F1" stroke="#BDC3C7" strokeWidth="1"/>
            <path d={`M${cx-4} ${cy} Q${cx} ${cy-4} ${cx+4} ${cy}`} stroke="#BDC3C7" strokeWidth="0.8" fill="none"/>
          </g>
        ))}
        <circle cx="40" cy="68" r="3" fill="#E74C3C" opacity="0.8"/>
      </svg>
    ),
    side: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <rect x="15" y="35" width="50" height="30" rx="8" fill="#F39C12"/>
        <rect x="15" y="32" width="50" height="12" rx="6" fill="#E67E22"/>
        <circle cx="30" cy="50" r="4" fill="#E74C3C"/>
        <circle cx="42" cy="52" r="3.5" fill="#27AE60"/>
        <circle cx="54" cy="49" r="4" fill="#F1C40F"/>
        <rect x="36" y="18" width="8" height="18" rx="2" fill="#8B4513"/>
        <rect x="44" y="20" width="7" height="16" rx="2" fill="#8B4513"/>
      </svg>
    ),
  }
  return imgs[type] || imgs.noodles
}

function CartItemRow({ item, qty }) {
  const { addItem, removeItem } = useCart()
  const isNonVeg = item.tag === 'NON-VEG'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.22 }}
      style={{
        background: C.card, borderRadius: 18,
        padding: '12px 14px', marginBottom: 10,
        boxShadow: '0 3px 14px rgba(31,69,145,0.07)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: 14,
        background: 'linear-gradient(135deg,#FFF8F0,#FFF0E8)',
        overflow: 'hidden', flexShrink: 0,
      }}>
        {menuImages[item.imgKey]
          ? <img src={menuImages[item.imgKey]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FoodImg type={item.type} size={52}/></div>
        }
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 2 }}>
          <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600, color: C.blue, lineHeight: 1.3, flex: 1, paddingRight: 8 }}>
            {item.name}
          </div>
          <div style={{ width: 10, height: 10, borderRadius: 2, border: `1.5px solid ${isNonVeg ? '#C0392B' : '#27AE60'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: isNonVeg ? '#C0392B' : '#27AE60' }}/>
          </div>
        </div>
        <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: '#999', marginBottom: 8 }}>
          ₹{item.price} each
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F0F4FF', borderRadius: 10, overflow: 'hidden' }}>
            <motion.button
              whileTap={{ scale: 0.82 }}
              onClick={() => removeItem(item)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.blue, fontSize: 18, fontWeight: 700, lineHeight: 1, padding: '4px 10px' }}
            >−</motion.button>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 700, color: C.blue, minWidth: 20, textAlign: 'center' }}>{qty}</span>
            <motion.button
              whileTap={{ scale: 0.82 }}
              onClick={() => addItem(item)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.blue, fontSize: 18, fontWeight: 700, lineHeight: 1, padding: '4px 10px' }}
            >+</motion.button>
          </div>
          <span style={{ fontFamily: "'Bungee',sans-serif", fontSize: 15, color: C.green }}>₹{item.price * qty}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function CartPage() {
  const navigate = useNavigate()
  const { cartItems, totalItems, totalPrice } = useCart()
  const isEmpty = cartItems.length === 0

  return (
    <div style={{ minHeight: '100vh', background: C.cream, position: 'relative' }}>

      {/* background blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -30, width: 200, height: 200, borderRadius: '60% 40% 50% 70%', background: C.yellow, opacity: 0.15, filter: 'blur(40px)' }}/>
        <div style={{ position: 'absolute', bottom: 100, left: -40, width: 180, height: 220, borderRadius: '50% 70% 40% 60%', background: C.sage, opacity: 0.18, filter: 'blur(36px)' }}/>
      </div>

      {/* sticky header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'rgba(247,245,240,0.96)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(31,69,145,0.07)',
        padding: '14px 20px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <motion.button
          onClick={() => navigate('/menu')}
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

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bungee',sans-serif", fontSize: 18, color: C.blue, letterSpacing: '0.05em', lineHeight: 1 }}>YOUR CART</div>
          {totalItems > 0 && (
            <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 9, color: C.blue, opacity: 0.5, letterSpacing: '0.2em', marginTop: 2 }}>
              {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'}
            </div>
          )}
        </div>

        <div style={{ width: 38 }}/>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '20px 20px 48px' }}>

        {/* EMPTY STATE */}
        {isEmpty && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: '64px 20px' }}
          >
            <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
            <div style={{ fontFamily: "'Bungee',sans-serif", fontSize: 22, color: C.blue, marginBottom: 8 }}>CART IS EMPTY</div>
            <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: '#999', marginBottom: 28, lineHeight: 1.6 }}>
              Add some delicious dishes from the menu!
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/menu')}
              style={{
                background: C.blue, border: 'none', cursor: 'pointer',
                borderRadius: 50, padding: '13px 32px',
                fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 14, color: 'white',
                letterSpacing: '0.06em',
                boxShadow: '0 8px 24px rgba(31,69,145,0.28)',
              }}
            >
              BROWSE MENU
            </motion.button>
          </motion.div>
        )}

        {/* CART ITEMS + SUMMARY */}
        {!isEmpty && (
          <>
            <AnimatePresence>
              {cartItems.map(({ item, qty }) => (
                <CartItemRow key={item.name} item={item} qty={qty}/>
              ))}
            </AnimatePresence>

            {/* BILL SUMMARY */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              style={{
                background: C.card, borderRadius: 20, padding: '16px 18px',
                boxShadow: '0 4px 18px rgba(31,69,145,0.07)', marginBottom: 12,
              }}
            >
              <div style={{ fontFamily: "'Bungee',sans-serif", fontSize: 12, color: C.blue, letterSpacing: '0.06em', marginBottom: 12 }}>
                BILL SUMMARY
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1.5px dashed rgba(31,69,145,0.12)' }}>
                <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 15, color: C.blue }}>TOTAL</span>
                <span style={{ fontFamily: "'Bungee',sans-serif", fontSize: 22, color: C.green }}>₹{totalPrice}</span>
              </div>
            </motion.div>

            {/* ORDER NOTE */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
              style={{
                background: '#FFF8E8', borderRadius: 20, padding: '14px 18px', marginBottom: 20,
                border: '1.5px dashed rgba(242,207,74,0.6)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <div style={{ fontSize: 26, flexShrink: 0 }}>🏷️</div>
              <div>
                <div style={{ fontFamily: "'Bungee',sans-serif", fontSize: 11, color: C.blue, letterSpacing: '0.05em', marginBottom: 3 }}>
                  HOW TO ORDER
                </div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: '#666', lineHeight: 1.5 }}>
                  Place the order on counter
                </div>
              </div>
            </motion.div>

            {/* PLAY GAME */}
            <motion.button
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/game')}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                background: C.blue, border: 'none', cursor: 'pointer',
                borderRadius: 50, padding: '14px 0',
                boxShadow: '0 8px 24px rgba(31,69,145,0.28)',
              }}
            >
              <svg width="22" height="16" viewBox="0 0 24 18" fill="none">
                <rect x="1" y="3" width="22" height="12" rx="6" stroke="white" strokeWidth="1.8" fill="none"/>
                <path d="M6 9H10M8 7V11" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="15" cy="8" r="1.5" fill="white"/>
                <circle cx="18" cy="10" r="1.5" fill="white"/>
              </svg>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 15, color: 'white', letterSpacing: '0.06em' }}>
                PLAY GAME
              </span>
            </motion.button>
          </>
        )}
      </div>
    </div>
  )
}
