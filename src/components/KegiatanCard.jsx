// src/components/KegiatanCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActions, Typography, Button } from '@mui/material';


import './KegiatanCard.css'; 

function KegiatanCard({ kegiatan }) {
  return (
    <Card raised className="kegiatan-card">
      <CardMedia
        component="img"
        className="card-image"
        image={`http://127.0.0.1:8000${kegiatan.image}`}
        alt={kegiatan.judul}
      />
      <CardContent className="card-content">
        <Typography variant="h6" component="h3" gutterBottom>
          {kegiatan.judul}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="card-description"
        >
          {kegiatan.deskripsi}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 1 }}>
         <Button
          fullWidth
          variant="contained"
          color="success"
          component={Link} // Menggunakan Link sebagai komponen tombol
          to={`/kegiatan/${kegiatan.id}`} // Mengarahkan ke URL detail dengan ID unik
        >
          Lihat Berita
        </Button>
      </CardActions>
    </Card>
  );
}

export default KegiatanCard;