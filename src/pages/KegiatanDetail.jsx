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

export default function KegiatanDetail() {
  const { id } = useParams();
  const [kegiatan, setKegiatan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://www.web-gws.my.id/api/kegiatan/${id}`)
      .then((res) => {
        setKegiatan(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Gagal memuat detail kegiatan.');
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

  if (!kegiatan) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '50vh' }}>
        <Alert severity="warning">Data kegiatan tidak ditemukan.</Alert>
      </Box>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
        {kegiatan.judul} {/* <--- Menggunakan 'judul' */}
      </Typography>
      <Box sx={{ my: 4 }}>
        <CardMedia
          component="img"
          image={`http://www.web-gws.my.id${kegiatan.image}`}
          alt={kegiatan.judul}
          sx={{ maxHeight: 400, maxWidth:900, objectFit: 'cover', borderRadius: '8px' }}
        />
      </Box>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
        {kegiatan.deskripsi} {/* <--- Menggunakan 'deskripsi' */}
      </Typography>
    </Container>
  );
}