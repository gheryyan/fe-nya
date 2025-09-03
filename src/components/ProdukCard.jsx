import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const truncateText = (text, limit) => {
  if (!text || text.length <= limit) {
    return text || '';
  }
  return text.substring(0, limit) + '...';
};

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

export default function ProdukCard({ produk }) {
  return (
    <Card raised sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={`https://www.web-gws.my.id${produk.image}`}
        alt={produk.nama_produk}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
          {produk.nama_produk}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {truncateText(produk.deskripsi_singkat, 50)}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
          {formatRupiah(produk.harga)}
        </Typography>
      </CardContent>
      <Box sx={{ p: 1 }}>
        <Button 
          fullWidth 
          variant="contained" 
          component={Link} 
          to={`/produk/${produk.id}`}
        >
          Lihat Produk
        </Button>
      </Box>
    </Card>
  );
}