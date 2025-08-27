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
} from '@mui/material';

const AdminKegiatan = () => {
  const [kegiatans, setKegiatans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    judul: '',
    deskripsi: '',
    tanggal: '',
    image: null,
  });

  const fetchKegiatans = async () => {
    try {
      // PERBAIKAN: Gunakan URL relatif yang benar
      const response = await axios.get(`/kegiatan`);
      setKegiatans(response.data);
    } catch (err) {
      setError('Gagal mengambil data kegiatan.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKegiatans();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ID yang dikirim:", formData.id);

    const data = new FormData();
    data.append('judul', formData.judul);
    data.append('deskripsi', formData.deskripsi);
    data.append('tanggal', formData.tanggal);
    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    try {
      if (formData.id) {
        // PERBAIKAN KRUSIAL: Ubah URL menjadi `/kegiatan/${formData.id}`
        data.append('_method', 'PUT');
        await axios.post(`/kegiatan/${formData.id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Update berhasil');
      } else {
        // PERBAIKAN KRUSIAL: Ubah URL menjadi `/kegiatan`
        await axios.post('/kegiatan', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Tambah data berhasil');
      }

      await fetchKegiatans();
      setFormData({
        id: null,
        judul: '',
        deskripsi: '',
        tanggal: '',
        image: null,
      });
    } catch (err) {
      console.error('Gagal menyimpan data:', err);
      alert('Gagal menyimpan data kegiatan. Lihat konsol untuk detail.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus kegiatan ini?')) {
      try {
        // PERBAIKAN KRUSIAL: Ubah URL menjadi `/kegiatan/${id}`
        await axios.delete(`/kegiatan/${id}`);
        setKegiatans(kegiatans.filter((kegiatan) => kegiatan.id !== id));
      } catch (err) {
        console.error('Gagal menghapus kegiatan:', err);
        alert('Gagal menghapus data kegiatan.');
      }
    }
  };

  const handleEdit = (kegiatan) => {
    setFormData({
      id: kegiatan.id,
      judul: kegiatan.judul,
      deskripsi: kegiatan.deskripsi,
      tanggal: kegiatan.tanggal,
      image: null,
    });
    console.log("ID yang akan diedit:", kegiatan.id);
  };

  if (loading) return <Typography>Memuat data...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Halaman Admin Kegiatan
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {formData.id ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Judul"
            name="judul"
            value={formData.judul}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleInputChange}
            required
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Tanggal"
            type="date"
            name="tanggal"
            value={formData.tanggal}
            onChange={handleInputChange}
            required
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" component="label" htmlFor="image-upload">
              Pilih Gambar
            </Typography>
            <input
              type="file"
              name="image"
              id="image-upload"
              onChange={handleFileChange}
            />
          </Box>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              {formData.id ? 'Simpan Perubahan' : 'Tambah Kegiatan'}
            </Button>
            {formData.id && (
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() =>
                  setFormData({
                    id: null,
                    judul: '',
                    deskripsi: '',
                    tanggal: '',
                    image: null,
                  })
                }
              >
                Batal
              </Button>
            )}
          </Stack>
        </Box>
      </Paper>

      <Paper sx={{ p: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Daftar Kegiatan
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Gambar</TableCell>
                <TableCell>Judul</TableCell>
                <TableCell>Deskripsi</TableCell>
                <TableCell>Tanggal</TableCell>
                <TableCell align="right">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kegiatans.map((kegiatan) => (
                <TableRow key={kegiatan.id}>
                  <TableCell>
                    {kegiatan.image && (
                      <img
                        src={`http://127.0.0.1:8000${kegiatan.image}`}
                        alt={kegiatan.judul}
                        style={{
                          width: '100px',
                          height: 'auto',
                          borderRadius: '4px',
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{kegiatan.judul}</TableCell>
                  <TableCell>
                    {kegiatan.deskripsi && kegiatan.deskripsi.length > 50
                      ? kegiatan.deskripsi.substring(0, 50) + '...'
                      : kegiatan.deskripsi}
                  </TableCell>
                  <TableCell>{kegiatan.tanggal}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(kegiatan)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(kegiatan.id)}
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

export default AdminKegiatan;