import React, { useState, useEffect } from 'react';
import api from "../api"; 
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  CardMedia,
} from '@mui/material';

export default function AdminGaleri() {
  const [galeris, setGaleris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({
    judul: '',
    image: null,
  });

  const fetchGaleris = async () => {
    try {
      const response = await api.get('/galeri');
      setGaleris(response.data);
    } catch (err) {
      setError('Gagal memuat data galeri.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGaleris();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('judul', form.judul);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      await api.post('/galeri', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm({ judul: '', image: null });
      fetchGaleris();
    } catch (err) {
      setError('Gagal menyimpan foto galeri.');
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/galeri/${deleteId}`);
      fetchGaleris();
      setOpen(false);
    } catch (err) {
      setError('Gagal menghapus foto galeri.');
      console.error(err);
    }
  };

  const handleClickOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        Admin Galeri
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Judul/Caption Foto (Opsional)"
          name="judul"
          value={form.judul}
          onChange={handleChange}
        />
        <Button variant="contained" component="label">
          Pilih Gambar
          <input type="file" hidden name="image" onChange={handleChange} required />
        </Button>
        <Typography variant="body2" color="text.secondary">
          {form.image ? form.image.name : 'Belum ada file terpilih'}
        </Typography>
        <Button variant="contained" color="primary" type="submit">
          Tambah Foto
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Judul</TableCell>
              <TableCell>Gambar</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {galeris.map((galeri) => (
              <TableRow key={galeri.id}>
                <TableCell>{galeri.judul}</TableCell>
                <TableCell>
                  <CardMedia
                    component="img"
                    image={`http://www.web-gws.my.id${galeri.image}`}
                    alt={galeri.judul}
                    sx={{ width: 100, height: 100, objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleClickOpen(galeri.id)} variant="outlined" color="secondary" size="small">
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Hapus Foto Galeri</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus foto ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Batal
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}