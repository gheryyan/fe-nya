import React, { useState, useEffect } from 'react';
import api from '../api';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function PpidList({ jenis }) {
  const [ppids, setPpids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchPpids = async () => {
      try {
        const response = await api.get('https://www.web-gws.my.id/api/ppid');
        const data = response.data;
        setPpids(data);

        const availableYears = [...new Set(data.map(item => new Date(item.created_at).getFullYear()))].sort((a, b) => b - a);
        setYears(availableYears);
        if (availableYears.length > 0) {
          setSelectedYear(availableYears[0]);
        }
      } catch (err) {
        setError('Gagal memuat data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPpids();
  }, []);

  const filteredPpids = ppids.filter(item => {
    const itemYear = new Date(item.created_at).getFullYear();
    return item.jenis === jenis && (selectedYear === '' || itemYear === selectedYear);
  });

  const handleDownload = (filePath) => {
    window.open(`https://www.web-gws.my.id${filePath}`, '_blank');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '30vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '30vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" component="h3" sx={{ flexGrow: 1 }}>
          {jenis === 'informasi_umum' ? 'Daftar Informasi Umum' : 'Daftar Laporan Desa'}
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Tahun</InputLabel>
          <Select
            value={selectedYear}
            label="Tahun"
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <MenuItem value="">Semua</MenuItem>
            {years.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {filteredPpids.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Judul</TableCell>
                <TableCell>Deskripsi</TableCell>
                <TableCell>Tanggal Unggah</TableCell>
                <TableCell align="center">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPpids.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.judul}</TableCell>
                  <TableCell>{item.deskripsi_singkat}</TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                      href={`https://www.web-gws.my.id${item.file_path}`}
                      target="_blank"
                    >
                      <VisibilityIcon />
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleDownload(item.file_path)}
                    >
                      <FileDownloadIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" color="text.secondary" sx={{ mt: 3 }}>
          Tidak ada data untuk tahun ini.
        </Typography>
      )}
    </Box>
  );
}