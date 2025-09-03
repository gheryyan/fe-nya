// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import gandoang from '../assets/img/gandoang2.jpg';
import { Box, Container, Typography, Grid, Button, Card, CardContent, CardMedia, CardActions, CircularProgress, Alert } from '@mui/material';
import ExploreCard from '../components/ExploreCard'; 
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DescriptionIcon from '@mui/icons-material/Description';


function Home() {
  const [kegiatans, setKegiatans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKegiatans = async () => {
      try {
        const response = await axios.get('https://www.web-gws.my.id/api/kegiatan');
        setKegiatans(response.data.slice(0, 3)); 
      } catch (err) {
        setError('Gagal memuat data kegiatan.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchKegiatans();
  }, []);
const DataCard = ({ count, label }) => (
    <Card className="data-card">
      <CardContent>
        <Typography variant="h4" component="p" className="count">
          {count}
        </Typography>
        <Typography variant="subtitle1" component="p" className="label">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${gandoang})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container>
          <Grid container spacing={4}>
            {/* Bagian Teks */}
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Website Resmi <br />Desa Gandoang
              </Typography>
              <Typography variant="h5" component="p" sx={{ mb: 4 }}>
                Kecamatan Cileungsi Kabupaten Bogor Jawa Barat
              </Typography>
            </Grid>
            {/* Bagian Gambar */}
            <Grid item xs={12} md={6}>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- Bagian Gabungan: Tentang Desa dan Kartu Ikon --- */}
      <Box id="tentang" sx={{ py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            {/* Kolom Kiri - Teks */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Tentang Desa Gandoang
              </Typography>
              <Typography variant="body1" paragraph>
                Desa Gandoang merupakan salah satu desa di Kecamatan Cileungsi, Kabupaten Bogor.
                Dengan luas wilayah sekitar 550 hektar, desa ini memiliki lingkungan dinamis serta keberagaman penduduk
                yang aktif dalam berbagai bidang seperti pertanian, perdagangan, industri, dan jasa.
              </Typography>
              <Typography variant="body1">
                Secara administratif, Desa Gandoang terbagi menjadi 3 dusun, 15 RW, dan 60 RT.
                Jumlah penduduk mencapai sekitar 20.000 jiwa.
              </Typography>
            </Grid>
            {/* Kolom Kanan - Kartu Ikon */}
            <Grid>
              <Grid container spacing={17}>
                <Grid item xs={6}>
                  <Link to="/profil" style={{textDecoration:'none'}}>
                    <ExploreCard title="PROFIL DESA" icon={AccountBalanceIcon} />
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <a href="#administrasi" style={{textDecoration:'none'}}>
                    <ExploreCard title="INFOGRAFIS" icon={EqualizerIcon} />
                  </a>
                </Grid>
                <Grid item xs={6}>
                  <Link to="/produk" style={{textDecoration:'none'}}>
                    <ExploreCard title="UMKM DESA" icon={ThumbUpIcon} />
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Link to="/potensi" style={{textDecoration:'none'}}>
                    <ExploreCard title="POTENSI DESA" icon={DescriptionIcon} />
                  </Link>
                </Grid>
                
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      
      {/* Bagian Daftar Kegiatan */}
      <Box sx={{ py: 5 }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Daftar Kegiatan
          </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '20vh' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '20vh' }}>
              <Alert severity="error">{error}</Alert>
            </Box>
          ) : (
            <Grid container spacing={3} alignItems="stretch">
              {kegiatans.map((kegiatan) => (
                <Grid item size={{xs:12, sm:6, md:4}}  key={kegiatan.id}>
                  <Card raised className="kegiatan-card">
                    <CardMedia
                      component="img"
                      className="card-image"
                      image={`https://www.web-gws.my.id${kegiatan.image}`}
                      alt={kegiatan.judul}
                    />
                    <CardContent className="card-content">
                      <Typography variant="h6" component="h3" gutterBottom>
                        {kegiatan.judul}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="card-description"
                      >
                        {kegiatan.deskripsi}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2 }}>
                     <Link to={`/kegiatan/${kegiatan.id}`} style={{ textDecoration: 'none' }}>
                      <Button 
                        fullWidth 
                        variant="contained" 
                        color="success"
                      >
                        Lihat Berita
                      </Button>
                    </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              href="/kegiatan"
              sx={{
                px: 4,
                py: 1.5,
              }}
            >
              Lihat Kegiatan Lainnya
            </Button>
          </Box>
        </Container>
      </Box>
       <Box id="administrasi" sx={{ py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Data Penduduk
          </Typography>
          <Typography variant="body1" paragraph>
            Informasi Data digital yang berfungsi mempermudah pengelolaan data dan informasi terkait dengan kependudukan dan
            pendayagunaannya untuk pelayanan publik yang efektif dan efisien
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={4}>
              <DataCard count="20.539 " label="Total Penduduk" color="error.main" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DataCard count="10.458" label="Laki-Laki" color="error.main" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DataCard count="6.972" label="Kepala Keluarga" color="error.main" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DataCard count="10.081" label="Perempuan" color="error.main" />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="lokasi" sx={{ py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            Lokasi Desa Gandoang
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: '400px',
              border: 0,
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <iframe
              title="Google Maps Desa Gandoang"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.212042730107!2d106.96347187424694!3d-6.49503466352934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6992d9e6e84d41%3A0x67341e967a118833!2sDesa%20Gandoang!5e0!3m2!1sen!2sid!4v1700200000000!5m2!1sen!2sid"
            ></iframe>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Home;