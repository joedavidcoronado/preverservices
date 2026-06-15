import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage.jsx';
/*import UsPage from './pages/UsPage.jsx';
import Header from './components/Header.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import SystemPage from './pages/SystemPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ExperiencesPage from './pages/ExperiencesPage.jsx';
import Footer from './components/Footer.jsx';
import CommunityService from './pages/CommunityService.jsx';*/


AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    {/*<Header />*/}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/*<Route path="/quienes-somos" element={<UsPage />} />
        <Route path="/catalogo" element={<ServicesPage />} />
        <Route path="/sistema-de-gestion" element={<SystemPage />} />
        <Route path="/contactanos" element={<ContactPage />} />
        <Route path="/experiencias" element={<ExperiencesPage />} />
        <Route path="/community-service" element={<CommunityService />} />*/}
      </Routes>
      {/*<Footer />*/}
    </BrowserRouter>
  </StrictMode>
)
