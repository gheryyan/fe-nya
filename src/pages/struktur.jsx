import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, CircularProgress, Alert } from '@mui/material';
import StrukturDesaImage from '../assets/img/struktur gandoang.jpg';

const StrukturDesa = () => {
    const [strukturDesa, setStrukturDesa] = useState([]);
    const [perangkatDesa, setPerangkatDesa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data for Struktur Desa
                const strukturResponse = await axios.get('https://www.web-gws.my.id/api/struktur');
                setStrukturDesa(strukturResponse.data);

                // Fetch data for Perangkat Desa
                const perangkatResponse = await axios.get('https://www.web-gws.my.id/api/perangkat-desa');
                setPerangkatDesa(perangkatResponse.data);
                
            } catch (err) {
                setError('Gagal memuat data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
        <Container sx={{ py: 8 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                Struktur Desa
            </Typography>

            {/* Bagian 1: Gambar Statis Struktur Desa */}
            <Box sx={{ py: 4 }}>
                <img
                    src={StrukturDesaImage}
                    alt="Struktur Organisasi Desa Gandoang"
                    style={{ width: '100%', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
                />
            </Box>
            
            <hr style={{ margin: '40px auto', width: '80%' }} />

            {/* Bagian 2: Data Dinamis Struktur Desa (dari API) */}
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
                Struktur Organisasi Desa
            </Typography>
            <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
                {strukturDesa.length > 0 ? (
                    strukturDesa.map((struktur) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={struktur.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                                <CardMedia
                                    component="img"
                                    image={`https://www.web-gws.my.id${struktur.gambar}`}
                                    alt={struktur.nama}
                                    sx={{ 
                                        height: 250, 
                                        objectFit: 'cover'
                                    }}
                                />
                                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {struktur.nama}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {struktur.jabatan}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" color="text.secondary" align="center">
                        Belum ada data struktur desa yang tersedia.
                    </Typography>
                )}
            </Grid>
            
            <hr style={{ margin: '40px auto', width: '80%' }} />

            {/* Bagian 3: Data Dinamis Perangkat Desa (dari API) */}
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
                Daftar Lembaga Desa
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {perangkatDesa.length > 0 ? (
                    perangkatDesa.map((perangkat) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={perangkat.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                                <CardMedia
                                    component="img"
                                    image={`https://www.web-gws.my.id${perangkat.foto}`}
                                    alt={perangkat.nama}
                                    sx={{ 
                                        height: 250, 
                                        objectFit: 'cover'
                                    }}
                                />
                                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {perangkat.nama}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {perangkat.jabatan}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" color="text.secondary" align="center">
                        Belum ada data perangkat desa yang tersedia.
                    </Typography>
                )}
            </Grid>
        </Container>
    );
};

export default StrukturDesa;
