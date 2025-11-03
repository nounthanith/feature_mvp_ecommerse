import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Product from './features/products/Product'
import ProductDetail from './features/products/ProductDetail'
import Navbar from './layouts/Navbar'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} >
          <Route index element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App