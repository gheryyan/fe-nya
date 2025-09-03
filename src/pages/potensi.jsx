import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Button
} from "@mui/material";

// Fungsi untuk memotong deskripsi
const truncateDescription = (text, limit) => {
  if (text.length <= limit) {
    return text;
  }
  return text.substring(0, limit) + "...";
};

export default function Potensi() {
  const [potensi, setPotensi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://www.web-gws.my.id/api/potensi")
      .then((res) => {
        setPotensi(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat data potensi.");
        setLoading(false);
      });
  }, []);

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

  const potensiAlam = potensi.filter(item => item.category === "Potensi Alam");
  const potensiEkonomi = potensi.filter(item => item.category === "Potensi Ekonomi");

  return (
    <>
      <Box sx={{ bgcolor: 'green', color: 'white', py: 8, textAlign: 'left' }}>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Potensi Desa Gandoang
          </Typography>
          <Typography variant="h5" component="p">
            Menampilkan Potensi istimewa Desa Gandoang
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }}>
        {/* Bagian Potensi Alam */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom sx={{fontWeight: 'bold' }}>
            Potensi Alam
          </Typography>
          <Grid container spacing={4}>
            {potensiAlam.length > 0 ? (
              potensiAlam.map((item) => (
                <Grid item key={item.id} size={{xs:12, sm:6, md:4}}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                    {item.image && (
                      <CardMedia
                        component="img"
                        image={`https://www.web-gws.my.id${item.image}`}
                        alt={item.title}
                        sx={{ height: 250, objectFit: 'cover' }}
                      />
                    )}
                    <CardContent sx={{ textAlign: 'left', flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {truncateDescription(item.description, 100)}
                      </Typography>
                      <Button
                        variant="contained"
                        component={Link}
                        to={`/potensi/${item.id}`}
                      >
                        Lihat Selengkapnya
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography align="center" color="text.secondary">
                  Belum ada data potensi alam yang terdaftar.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Bagian Potensi Ekonomi */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
            Potensi Ekonomi
          </Typography>
          <Grid container spacing={4}>
            {potensiEkonomi.length > 0 ? (
              potensiEkonomi.map((item) => (
                <Grid item key={item.id} size={{xs:12, sm:6, md:4}}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                    {item.image && (
                      <CardMedia
                        component="img"
                        image={`https://www.web-gws.my.id${item.image}`}
                        alt={item.title}
                        sx={{ height: 250, objectFit: 'cover' }}
                      />
                    )}
                    <CardContent sx={{ textAlign: 'left', flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {truncateDescription(item.description, 100)}
                      </Typography>
                      <Button
                        variant="contained"
                        component={Link}
                        to={`/potensi/${item.id}`}
                      >
                        Lihat Selengkapnya
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography align="center" color="text.secondary">
                  Belum ada data potensi ekonomi yang terdaftar.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
}