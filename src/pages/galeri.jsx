import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';

export default function Galeri() {
  const [galeris, setGaleris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGaleris = async () => {
      try {
        const response = await axios.get('https://www.web-gws.my.id/api/galeri');
        setGaleris(response.data);
      } catch (err) {
        setError('Gagal memuat data galeri.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGaleris();
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
            Galeri Desa
          </Typography>
          <Typography variant="h5" component="p">
            Dokumentasi kegiatan Desa Gandoang
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: 5 }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Foto Terbaru
          </Typography>
          <Grid container spacing={3} alignItems="stretch">
            {galeris.length > 0 ? (
              galeris.map((item) => (
                <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                  <Card raised sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      image={`https://www.web-gws.my.id${item.image}`}
                      alt={item.judul}
                      sx={{ height: 200, objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3">
                        {item.judul}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography align="center" color="text.secondary">
                  Belum ada foto galeri.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
}