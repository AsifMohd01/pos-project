import React, { createContext, useState, useContext, useEffect } from "react"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    servicesSold: 0,
  })

  useEffect(() => {
    const totalRevenue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const servicesSold = cart.reduce((sum, item) => sum + item.quantity, 0)
    setAnalytics({ totalRevenue, servicesSold })
  }, [cart])

  const addToCart = (service) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === service.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...service, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        analytics,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

