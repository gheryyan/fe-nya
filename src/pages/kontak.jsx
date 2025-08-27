// src/pages/Kontak.jsx
import React from 'react';
import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemText, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function Kontak() {
  return (
    <>
      <Box className="hero" sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', color: 'white', py: 10, bgcolor: 'primary.main' }}>
        <Container>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
            Kontak Desa Gandoang
          </Typography>
          <Typography variant="h6" component="p" sx={{ mt: 2 }}>
            Mengetahui lebih dekat dengan Desa Gandoang
          </Typography>
        </Container>
      </Box>

      {/* Main content container with consistent layout */}
      <Box sx={{ py: 10 }}>
        <Container>
          <Grid container spacing={4}>
            {/* Informasi Kontak */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center', width:'115%'}}>
                <Typography color='green' variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Informasi Kontak
                </Typography>
                <Stack spacing={2} sx={{ mt: 2, alignItems: 'left' }}>
                  <Typography variant="body1" component="p" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon color="action" />
                    Kantor Desa - Jalan Raya Cileungsi - Jonggol Km 6 Kp. Gandoang RT 003 RW 003 Kecamatan Cileungsi Kabupaten Bogor 16820
                  </Typography>
                  <Typography variant="body1" component="p" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon color="action" />
                    081818106060
                  </Typography>
                  <Typography variant="body1" component="p" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon color="action" />
                    gandoangdesa@gmail.com
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Kontak;