// src/pages/Kegiatan.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import KegiatanCard from '../components/KegiatanCard';

function Kegiatan() {
  const [kegiatans, setKegiatans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKegiatans = async () => {
      try {
        const response = await axios.get('https://www.web-gws.my.id/api/kegiatan');
        setKegiatans(response.data);
      } catch (err) {
        setError('Gagal memuat data kegiatan.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchKegiatans();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '50vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'green', color: 'white', py: 8, textAlign: 'left' }}>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Kegiatan Desa Gandoang
          </Typography>
          <Typography variant="h5" component="p">
            Kegiatan rutin dan acara istimewa di desa kami
          </Typography>
        </Container>
      </Box>

      {/* Konten Daftar Kegiatan */}
      <Box sx={{ py: 5 }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Daftar Kegiatan
          </Typography>

          <Grid container spacing={3} alignItems="stretch">
            {kegiatans.map((kegiatan) => (
              <Grid item size={{xs:12, sm:6, md:4}} key={kegiatan.id}>
                <KegiatanCard kegiatan={kegiatan} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Kegiatan;