import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StarIcon from "@mui/icons-material/Star";
import { useTheme } from "@mui/material/styles";

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

export default function ProdukDetail() {
  const { id } = useParams();
  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await axios.get(`https://www.web-gws.my.id/api/produk/${id}`);
        setProduk(response.data);
      } catch (err) {
        setError("Gagal memuat detail produk.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduk();
  }, [id]);

  const handleWhatsAppClick = () => {
    if (!produk || !produk.kontak_penjual) return;
    const waNumber = produk.kontak_penjual.startsWith("0")
      ? "62" + produk.kontak_penjual.substring(1)
      : produk.kontak_penjual;
    const message = `Halo, saya tertarik dengan produk *${produk.nama_produk}* yang saya lihat di website desa. Apakah produk ini masih tersedia?`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link berhasil disalin!");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 9 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {!produk && !loading && <Alert severity="warning" sx={{ mb: 2 }}>Data produk tidak ditemukan.</Alert>}

      {produk && (
        <Card sx={{
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          boxShadow: 3,
          borderRadius: 2
        }}>
          {/* Kolom kiri: Gambar */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', md: '45%' },
              paddingTop: { xs: '100%', md: '45%' }, // Rasio 1:1 untuk gambar
              overflow: 'hidden',
              borderRadius: '8px',
            }}
          >
            <CardMedia
              component="img"
              image={`https://www.web-gws.my.id${produk.image}`}
              alt={produk.nama_produk}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Kunci untuk konsistensi ukuran
              }}
            />
          </Box>

          {/* Kolom kanan: Detail produk */}
          <CardContent sx={{ flexGrow: 1, p: 3, width: { xs: '100%', md: '55%' } }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {produk.nama_produk}
            </Typography>

            <Typography variant="h5" sx={{ color: theme.palette.error.main }} fontWeight="bold" gutterBottom>
              {formatRupiah(produk.harga)}
            </Typography>

            <Typography variant="body1" paragraph>
              {produk.deskripsi_singkat}
            </Typography>

            {/* Tombol WhatsApp */}
            <Button
              variant="contained"
              startIcon={<WhatsAppIcon />}
              onClick={handleWhatsAppClick}
              sx={{
                mt: 2,
                mb: 3,
                backgroundColor: theme.palette.error.main,
                "&:hover": { backgroundColor: theme.palette.error.dark },
                borderRadius: '50px',
              }}
            >
              Hubungi Penjual
            </Button>

            <Divider sx={{ my: 2 }} />

            {/* Bagikan */}
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Bagikan:
            </Typography>
            <Box display="flex" gap={1}>
              <IconButton color="primary" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}>
                <FacebookIcon />
              </IconButton>
              <IconButton color="success" onClick={handleWhatsAppClick}>
                <WhatsAppIcon />
              </IconButton>
              <IconButton color="default" onClick={handleCopyLink}>
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}