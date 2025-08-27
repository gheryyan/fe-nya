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

const AdminPerangkat = () => {
  const [perangkatDesa, setPerangkatDesa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    nama: '',
    jabatan: '',
    foto: null,
  });

  const fetchPerangkatDesa = async () => {
    try {
      // PERBAIKAN: Ubah endpoint dari perangkat-desa menjadi perangkat
      const response = await axios.get('http://127.0.0.1:8000/api/perangkat-desa');
      setPerangkatDesa(response.data);
    } catch (err) {
      setError('Gagal mengambil data perangkat desa.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerangkatDesa();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e) => {
    setFormData({ ...formData, foto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nama', formData.nama);
    data.append('jabatan', formData.jabatan);
    
    if (formData.foto instanceof File) {
      data.append('foto', formData.foto);
    }

    try {
      if (formData.id) {
        data.append('_method', 'PUT');
        // PERBAIKAN: Ubah endpoint dari perangkat-desa menjadi perangkat
        await axios.post(`http://127.0.0.1:8000/api/perangkat-desa/${formData.id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
      } else {
        // PERBAIKAN: Ubah endpoint dari perangkat-desa menjadi perangkat
        await axios.post('http://127.0.0.1:8000/api/perangkat-desa', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
      }
      setFormData({ id: null, nama: '', jabatan: '', foto: null });
      fetchPerangkatDesa();
    } catch (err) {
      console.error('Gagal menyimpan data:', err);
      alert('Gagal menyimpan data perangkat desa.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus perangkat desa ini?')) {
      try {
        // PERBAIKAN: Ubah endpoint dari perangkat-desa menjadi perangkat
        await axios.delete(`http://127.0.0.1:8000/api/perangkat-desa/${id}`);
        fetchPerangkatDesa();
      } catch (err) {
        console.error('Gagal menghapus perangkat desa:', err);
        alert('Gagal menghapus data perangkat desa.');
      }
    }
  };

  const handleEdit = (perangkat) => {
    setFormData({ ...perangkat, foto: null });
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
        Halaman Admin Perangkat Desa
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {formData.id ? 'Edit Data Perangkat Desa' : 'Tambah Perangkat Desa Baru'}
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
            <Typography variant="body1" component="label" htmlFor="image-upload">
                Pilih Foto
            </Typography>
            <input
                type="file"
                name="foto"
                id="foto-upload"
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
                onClick={() => setFormData({ id: null, nama: '', jabatan: '', foto: null })}
              >
                Batal
              </Button>
            )}
          </Stack>
        </Box>
      </Paper>
      <Paper sx={{ p: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Daftar Perangkat Desa
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Foto</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Jabatan</TableCell>
                <TableCell align="right">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {perangkatDesa.map(perangkat => (
                <TableRow key={perangkat.id}>
                  <TableCell>
                    {perangkat.foto && (
                      <img
                        src={`http://127.0.0.1:8000${perangkat.foto}`}
                        alt={perangkat.nama}
                        style={{ width: '100px', height: 'auto', borderRadius: '4px' }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{perangkat.nama}</TableCell>
                  <TableCell>{perangkat.jabatan}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(perangkat)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(perangkat.id)}
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

export default AdminPerangkat;