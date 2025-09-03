// src/pages/AdminPpidData.jsx
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export default function AdminPpidData() {
  const [ppids, setPpids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({
    jenis: 'informasi_umum',
    judul: '',
    deskripsi_singkat: '',
    file: null,
  });

  const fetchPpids = async () => {
    try {
      const response = await api.get('/ppid');
      setPpids(response.data);
    } catch (err) {
      setError('Gagal memuat data PPID.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPpids();
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
    formData.append('jenis', form.jenis);
    formData.append('judul', form.judul);
    formData.append('deskripsi_singkat', form.deskripsi_singkat);
    if (form.file) {
      formData.append('file', form.file);
    }

    try {
      await api.post('/ppid', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm({ jenis: 'informasi_umum', judul: '', deskripsi_singkat: '', file: null });
      fetchPpids();
    } catch (err) {
      setError('Gagal menyimpan data PPID.');
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/ppid/${deleteId}`);
      fetchPpids();
      setOpen(false);
    } catch (err) {
      setError('Gagal menghapus data PPID.');
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
        Kelola Informasi & Laporan
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Jenis Informasi</InputLabel>
          <Select
            label="Jenis Informasi"
            name="jenis"
            value={form.jenis}
            onChange={handleChange}
            required
          >
            <MenuItem value="informasi_umum">Informasi Umum</MenuItem>
            <MenuItem value="laporan_desa">Laporan Desa</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Judul"
          name="judul"
          value={form.judul}
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
          required
        />
        <Button variant="contained" component="label">
          Pilih File
          <input type="file" hidden name="file" onChange={handleChange} required />
        </Button>
        <Typography variant="body2" color="text.secondary">
          {form.file ? form.file.name : 'Belum ada file terpilih'}
        </Typography>
        <Button variant="contained" color="primary" type="submit">
          Tambah Data
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Jenis</TableCell>
              <TableCell>Judul</TableCell>
              <TableCell>Deskripsi</TableCell>
              <TableCell>Tanggal Unggah</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ppids.map((ppid) => (
              <TableRow key={ppid.id}>
                <TableCell>{ppid.jenis === 'informasi_umum' ? 'Informasi Umum' : 'Laporan Desa'}</TableCell>
                <TableCell>{ppid.judul}</TableCell>
                <TableCell>{ppid.deskripsi_singkat}</TableCell>
                <TableCell>{new Date(ppid.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button onClick={() => handleClickOpen(ppid.id)} variant="outlined" color="secondary" size="small">
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Hapus Data PPID</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus data ini?
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