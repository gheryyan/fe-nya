// src/components/Header.jsx
import logo from '../assets/img/Bogor.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top shadow-sm">
      <div className="container">
        {/* Mengganti navbar-brand dengan logo dan teks */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo Desa Gandoang" width="40" height="30" className="me-2" />
          <div>
            <span className="fw-bold fs-5 d-block">DESA GANDOANG</span>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Beranda
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="profilDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Profil
              </Link>
              <ul className="dropdown-menu" aria-labelledby="profilDropdown">
                <li>
                  <Link className="dropdown-item" to="/profil">
                    Profil Desa
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/struktur">
                    Struktur Desa
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/kontak">
                    Kontak
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/potensi">
                Potensi
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/kegiatan">
                Kegiatan
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/produk">
                Produk
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/galeri">
                Galeri
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ppid">
                PPID
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;