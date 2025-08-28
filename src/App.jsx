// src/App.js
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Profil from './pages/profil';
import Struktur from './pages/struktur';
import Kegiatan from './pages/kegiatan';
import KegiatanDetail from './pages/KegiatanDetail';
import Kontak from './pages/kontak';
import Produk from './pages/produk';
import ProdukDetail from './pages/ProdukDetail';
import Galeri from './pages/galeri';
import Ppid from './pages/ppid';
import AdminPage from './pages/admin';

// Halaman & Komponen Baru
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './pages/ProtectedRoute'; // Import ProtectedRoute yang baru dibuat
import AdminKegiatan from './pages/AdminKegiatan';
import AdminPerangkat from './pages/AdminPerangkat';
import AdminStruktur from './pages/AdminStruktur';
import AdminPotensi from './pages/AdminPotensi';
import AdminProduk from './pages/AdminProduk';
import AdminGaleri from './pages/AdminGaleri';
import AdminPpid from './pages/AdminPpid';

import Potensi from './pages/potensi';
import PotensiDetail from './pages/PotensiDetail';
import './style.css'; 



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/struktur" element={<Struktur />} />
        <Route path="/kegiatan" element={<Kegiatan />} />
        <Route path="/kegiatan/:id" element={<KegiatanDetail />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/potensi" element={<Potensi />} />
        <Route path="/potensi/:id" element={<PotensiDetail />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/produk/:id" element={<ProdukDetail />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/ppid" element={<Ppid />} />
        
        {/* Rute Login */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Akses Admin yang Terlindungi */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        >
          
          <Route path="kegiatan" element={<AdminKegiatan />} />
          <Route path="perangkat" element={<AdminPerangkat />} />
          <Route path="struktur" element={<AdminStruktur />} />
          <Route path="potensi" element={<AdminPotensi />} />
          <Route path="produk" element={<AdminProduk />} />
          <Route path="galeri" element={<AdminGaleri />} />
          <Route path="ppid" element={<AdminPpid />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;