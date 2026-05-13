import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState({})

  const addItem = (item) => {
    const key = item.name
    setCart(prev => ({
      ...prev,
      [key]: { item, qty: (prev[key]?.qty || 0) + 1 },
    }))
  }

  const removeItem = (item) => {
    const key = item.name
    setCart(prev => {
      const cur = prev[key]?.qty || 0
      if (cur <= 1) {
        const next = { ...prev }
        delete next[key]
        return next
      }
      return { ...prev, [key]: { item, qty: cur - 1 } }
    })
  }

  const getQty = (item) => cart[item.name]?.qty || 0

  const cartItems = Object.values(cart)
  const totalItems = cartItems.reduce((s, { qty }) => s + qty, 0)
  const totalPrice = cartItems.reduce((s, { item, qty }) => s + item.price * qty, 0)

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, getQty, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
