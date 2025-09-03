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
} from '@mui/material';

export default function AdminProduk() {
  const [produks, setProduks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({
    id: null,
    nama_produk: '',
    deskripsi_singkat: '',
    harga: '',
    kontak_penjual: '',
    image: null,
  });

  const fetchProduks = async () => {
    try {
      const response = await api.get('/produk');
      setProduks(response.data);
    } catch (err) {
      setError('Gagal memuat data produk.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduks();
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

    // Selalu tambahkan semua data teks
    formData.append('nama_produk', form.nama_produk);
    formData.append('deskripsi_singkat', form.deskripsi_singkat || '');
    formData.append('harga', form.harga);
    formData.append('kontak_penjual', form.kontak_penjual);

    
    if (form.image) {
      formData.append('image', form.image);
    } else if (!form.id) {
      // Ini akan mencegah request tidak memilih gambar saat menambah baru
      setError('Gambar produk wajib diisi.');
      setLoading(false);
      return;
    }

    try {
      if (form.id) {
        formData.append('_method', 'PUT');
        await api.post(`/produk/${form.id}`, formData);
      } else {
        await api.post('/produk', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setForm({ id: null, nama_produk: '', deskripsi_singkat: '', harga: '', kontak_penjual: '', image: null });
      fetchProduks();
    } catch (err) {
      setError('Gagal menyimpan data produk.');
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/produk/${deleteId}`);
      fetchProduks();
      setOpen(false);
    } catch (err) {
      setError('Gagal menghapus produk.');
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

  const handleEdit = (produk) => {
    setForm({
      id: produk.id,
      nama_produk: produk.nama_produk,
      deskripsi_singkat: produk.deskripsi_singkat,
      harga: produk.harga,
      kontak_penjual: produk.kontak_penjual,
      image: null,
    });
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
        Admin Produk
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nama Produk"
          name="nama_produk"
          value={form.nama_produk}
          onChange={handleChange}
          required
        />
        <TextField
          label="Deskripsi Singkat"
          name="deskripsi_singkat"
          value={form.deskripsi_singkat}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <TextField
          label="Harga"
          name="harga"
          type="number"
          value={form.harga}
          onChange={handleChange}
          required
        />
        <TextField
          label="Kontak Penjual (WhatsApp)"
          name="kontak_penjual"
          value={form.kontak_penjual}
          onChange={handleChange}
          required
        />
        <Button variant="contained" component="label">
          {form.id ? 'Ubah Gambar' : 'Pilih Gambar'}
          <input
            type="file"
            hidden
            name="image"
            onChange={handleChange}
            // PERBAIKAN: Tambahkan atribut 'required' jika mode tambah baru
            required={!form.id}
          />
        </Button>
        <Button variant="contained" color="primary" type="submit">
          {form.id ? 'Ubah Produk' : 'Tambah Produk'}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Produk</TableCell>
              <TableCell>Deskripsi</TableCell>
              <TableCell>Harga</TableCell>
              <TableCell>Gambar</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produks.map((produk) => (
              <TableRow key={produk.id}>
                <TableCell>{produk.nama_produk}</TableCell>
                <TableCell>{produk.deskripsi_singkat}</TableCell>
                <TableCell>{produk.harga}</TableCell>
                <TableCell>
                  <img src={`https://www.web-gws.my.id${produk.image}`} alt={produk.nama_produk} style={{ width: '100px', height: 'auto' }} />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(produk)} variant="outlined" color="primary" size="small">
                    Edit
                  </Button>
                  <Button onClick={() => handleClickOpen(produk.id)} variant="outlined" color="secondary" size="small" sx={{ ml: 1 }}>
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Hapus Produk</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus produk ini?
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