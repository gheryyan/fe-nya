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
import ProdukCard from '../components/ProdukCard';

export default function Produk() {
  const [produks, setProduks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduks = async () => {
      try {
        const response = await axios.get('http://www.web-gws.my.id/api/produk');
        setProduks(response.data);
      } catch (err) {
        setError('Gagal memuat data produk.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduks();
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
      <Box sx={{ bgcolor: 'green', color: 'white', py: 8, textAlign: 'left' }}>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Belanja Produk Desa
          </Typography>
          <Typography variant="h5" component="p">
            Produk-produk unggulan dari masyarakat Desa Gandoang
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: 2 }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Daftar Produk
          </Typography>
          <Grid container spacing={3} alignItems="stretch">
            {produks.length > 0 ? (
              produks.map((produk) => (
                <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={produk.id}>
                  <ProdukCard produk={produk} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography align="center" color="text.secondary">
                  Belum ada data produk.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
}