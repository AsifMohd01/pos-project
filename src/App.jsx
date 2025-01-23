import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { IntlProvider } from "react-intl"
import Navbar from "./components/Navbar"
import Services from "./pages/Services"
import Analytics from "./pages/Analytics"
import { CartProvider } from "./context/CartContext"
import { CountryProvider, useCountry } from "./context/CountryContext"
import messages from "./i18n/messages"
import { ToastContainer } from "react-toastify"
import Cart from "./Pages/Cart"
import Checkout from "./Pages/Checkout"
import Receipt from "./pages/Receipt"

function App() {
  const { selectedOption } = useCountry()

  return (
    <IntlProvider messages={messages[selectedOption.locale.split("-")[0]]} locale={selectedOption.locale}>
  
        <CartProvider>
          <Router>
            <ToastContainer/>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
              <Navbar />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Services />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/receipt" element={<Receipt />} />
                  <Route path="/analytics" element={<Analytics />} />
                </Routes>
              </AnimatePresence>
            </div>
          </Router>
        </CartProvider>
    
    </IntlProvider>
  )
}

export default function AppWrapper() {
  return (
    <CountryProvider>
      <App />
    </CountryProvider>
  )
}

