import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import CampingProducts from './components/CampingProducts';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import './App.css';
import './Header.css';

const App = () => {
  // Set dark theme permanently
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <div className="app dark-theme">
      <Header />
      <Hero />
      <Features />
      <CampingProducts />
      <Testimonials />
      <Footer />
      <ToastContainer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default App;
