import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './modules/Home';
import { Routes, Route } from 'react-router-dom';
import Products from './modules/Products';
import Product from './modules/Product';
import Cart from './components/Cart';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<Products />} />
        <Route path = '/product' element ={<Product />} />
        <Route path = 'cart' element ={<Cart/>} />
        <Route path = "*" element = {<div>404</div>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
