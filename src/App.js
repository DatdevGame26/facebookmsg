import React from 'react';
import './App.css'; 
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import ViewProduct from './pages/ViewProduct';
import SearchResult from './pages/SearchResult';
import AllProducts from './pages/AllProducts';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Personal from './pages/Personal';
import Payment from './pages/Payment';
import Policy from './pages/Policy';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FacebookMsg from './components/FacebookMsg';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/view-product/:id" element={<ViewProduct />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/policy" element={<Policy />} />
        </Routes>
      </main>
      <Footer />
      <FacebookMsg/>
    </Router>
  );
}

export default App;
