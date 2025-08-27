// src/pages/AdminStruktur.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';

const AdminStruktur = () => {
  const [strukturDesa, setStrukturDesa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    nama: '',
    jabatan: '',
    gambar: null,
  });

  const fetchStrukturDesa = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/struktur?timestamp=${new Date().getTime()}`);
      setStrukturDesa(response.data);
    } catch (err) {
      setError('Gagal mengambil data struktur desa.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStrukturDesa();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, gambar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nama', formData.nama);
    data.append('jabatan', formData.jabatan);

    // Jika ada file gambar baru, tambahkan ke FormData
    if (formData.gambar instanceof File) {
      data.append('gambar', formData.gambar);
    }

    try {
      if (formData.id) {
        // Menggunakan axios.post dengan _method: 'PUT' untuk edit
        // karena FormData tidak mendukung method PUT/PATCH
        data.append('_method', 'PUT');
        await axios.post(`http://127.0.0.1:8000/api/struktur/${formData.id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Data berhasil diubah!');
      } else {
        // Menggunakan axios.post untuk tambah data baru
        await axios.post('http://127.0.0.1:8000/api/struktur', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Data berhasil ditambahkan!');
      }
      setFormData({ id: null, nama: '', jabatan: '', gambar: null });
      fetchStrukturDesa();
    } catch (err) {
      console.error('Gagal menyimpan data:', err.response || err);
      alert('Gagal menyimpan data struktur desa.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data struktur desa ini?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/struktur/${id}`);
        // Perbarui state secara langsung setelah berhasil dihapus
        setStrukturDesa(strukturDesa.filter(item => item.id !== id));
        console.log('Data berhasil dihapus');
      } catch (err) {
        console.error('Gagal menghapus data struktur desa:', err.response || err);
        alert('Gagal menghapus data struktur desa.');
      }
    }
  };

  const handleEdit = (struktur) => {
    setFormData({ ...struktur, gambar: null });
  };

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
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Halaman Admin Struktur Desa
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {formData.id ? 'Edit Data Struktur Desa' : 'Tambah Data Struktur Desa Baru'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Nama"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Jabatan"
            name="jabatan"
            value={formData.jabatan}
            onChange={handleInputChange}
            required
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" component="label" htmlFor="gambar-upload">
              Pilih Gambar
            </Typography>
            <input
              type="file"
              name="gambar"
              id="gambar-upload"
              onChange={handleFileChange}
              required={!formData.id}
            />
          </Box>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              {formData.id ? 'Simpan Perubahan' : 'Tambah Data'}
            </Button>
            {formData.id && (
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => setFormData({ id: null, nama: '', jabatan: '', gambar: null })}
              >
                Batal
              </Button>
            )}
          </Stack>
        </Box>
      </Paper>
      <Paper sx={{ p: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Daftar Struktur Desa
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Gambar</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Jabatan</TableCell>
                <TableCell align="right">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {strukturDesa.map(struktur => (
                <TableRow key={struktur.id}>
                  <TableCell>
                    {struktur.gambar && (
                      <img
                        src={`http://127.0.0.1:8000${struktur.gambar}`}
                        alt={struktur.nama}
                        style={{ width: '100px', height: 'auto', borderRadius: '4px' }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{struktur.nama}</TableCell>
                  <TableCell>{struktur.jabatan}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(struktur)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(struktur.id)}
                    >
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminStruktur;