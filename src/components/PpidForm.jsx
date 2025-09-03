import React, { useState } from 'react';
import api from '../api';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';

export default function PpidForm() {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: '',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ show: false, message: '', severity: '' });

    try {
      const response = await api.post('http://www.web-gws.my.id/api/pengaduan', form);
      console.log('Pengaduan berhasil dikirim:', response.data);
      setAlert({ show: true, message: 'Permohonan/pengaduan Anda berhasil dikirim!', severity: 'success' });
      setForm({
        nama: '',
        email: '',
        subjek: '',
        pesan: '',
      });
    } catch (error) {
      console.error('Gagal mengirim pengaduan:', error);
      setAlert({ show: true, message: 'Gagal mengirim permohonan/pengaduan. Silakan coba lagi.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Formulir Permohonan & Pengaduan
      </Typography>
      {alert.show && <Alert severity={alert.severity} sx={{ mb: 2 }}>{alert.message}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nama"
            name="nama"
            label="Nama Lengkap"
            fullWidth
            variant="outlined"
            value={form.nama}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            value={form.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="subjek"
            name="subjek"
            label="Subjek Permohonan/Pengaduan"
            fullWidth
            variant="outlined"
            value={form.subjek}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="pesan"
            name="pesan"
            label="Isi Pesan"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={form.pesan}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Kirim Permohonan'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}