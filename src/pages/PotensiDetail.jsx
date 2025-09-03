import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  CardMedia,
} from '@mui/material';

export default function PotensiDetail() {
  const { id } = useParams(); // Ambil ID dari URL
  const [potensi, setPotensi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.web-gws.my.id/api/potensi/${id}`) // Ambil data berdasarkan ID
      .then((res) => {
        setPotensi(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Gagal memuat detail potensi.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '50vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!potensi) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '50vh' }}>
        <Alert severity="warning">Data potensi tidak ditemukan.</Alert>
      </Box>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
        {potensi.title}
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Kategori: {potensi.category}
      </Typography>
      <Box sx={{ my: 1 }}>
        <CardMedia
          component="img"
          image={`https://www.web-gws.my.id${potensi.image}`}
          alt={potensi.title}
          sx={{ maxHeight: 400, maxWidth:900, objectFit: 'cover', borderRadius: '8px' }}
        />
      </Box>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
        {potensi.description}
      </Typography>
    </Container>
  );
}