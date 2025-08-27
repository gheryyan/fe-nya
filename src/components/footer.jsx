// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="bg-success text-white py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} Desa Gandoang. Semua Hak Dilindungi.</p>
        <small>
          KKN Gandoang
        </small>
      </div>
    </footer>
  );
}

export default Footer;
