import React, { useState, useEffect } from 'react';
import api from '../api';
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
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';

export default function AdminPpidPengaduan() {
  const [pengaduans, setPengaduans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPengaduans = async () => {
    try {
      const response = await api.get('/pengaduan');
      setPengaduans(response.data);
    } catch (err) {
      setError('Gagal memuat data pengaduan.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPengaduans();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/pengaduan/${id}`, { status: newStatus });
      fetchPengaduans();
    } catch (err) {
      setError('Gagal memperbarui status.');
      console.error(err);
    }
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
        Daftar Permohonan & Pengaduan
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {pengaduans.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tanggal</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Subjek</TableCell>
                <TableCell>Pesan</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pengaduans.map((pengaduan) => (
                <TableRow key={pengaduan.id}>
                  <TableCell>{new Date(pengaduan.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{pengaduan.nama}</TableCell>
                  <TableCell>{pengaduan.email}</TableCell>
                  <TableCell>{pengaduan.subjek}</TableCell>
                  <TableCell>{pengaduan.pesan}</TableCell>
                  <TableCell>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        value={pengaduan.status}
                        onChange={(e) => handleStatusChange(pengaduan.id, e.target.value)}
                      >
                        <MenuItem value="Menunggu">Menunggu</MenuItem>
                        <MenuItem value="Selesai">Selesai</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" color="text.secondary" sx={{ mt: 3 }}>
          Tidak ada pengaduan yang masuk.
        </Typography>
      )}
    </Container>
  );
}