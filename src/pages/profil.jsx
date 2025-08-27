// src/pages/Profil.jsx
import React from 'react';
import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';

function Profil() {
  return (
    <>
      {/* Visi & Misi */}
      <Box sx={{ py: 10, bgcolor: 'grey.100' }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
            Tentang Desa
          </Typography>
          {/* This is the main Grid container for all profile info */}
          <Grid container spacing={4}>
            {/* Identitas Desa Gandoang */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography color='green' variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Identitas Desa Gandoang
                </Typography>
                <Typography variant="body1">
                  Desa Gandoang terletak di Kecamatan Cileungsi, Kabupaten Bogor, Provinsi Jawa Barat, dengan kode pos 16820. Desa ini memiliki luas wilayah sekitar 640 hektar dan terdiri dari 16 Rukun Warga (RW) serta 64 Rukun Tetangga (RT).
                </Typography>
              </Paper>
            </Grid>

            {/* Sejarah Desa Gandoang */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography color='green' variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Sejarah Desa Gandoang
                </Typography>
                <Typography variant="body1">
                  Desa Gandoang merupakan salah satu desa yang berada di wilayah timur Kabupaten Bogor. Nama "Gandoang" dipercaya berasal dari istilah lokal yang berkaitan dengan sejarah dan budaya masyarakat setempat. Seiring berjalannya waktu, Gandoang berkembang menjadi kawasan yang memiliki perpaduan antara nilai tradisional dan perkembangan modern.
                </Typography>
              </Paper>
            </Grid>

            {/* Visi and Misi */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography color='green' variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Visi
                </Typography>
                <Typography variant="body1" paragraph>
                  Visi merupakan gambaran yang penuh tantangan tentang keadaan masa depan yang ingin dicapai. Visi ini berisi cita dan citra yang ingin diwujudkan, yang dibangun melalui proses refleksi dan proyeksi berdasarkan nilai-nilai luhur yang dipegang oleh seluruh stakeholder. Cita-cita inilah yang kemudian mengerucut menjadi Visi Desa, yaitu “Mewujudkan Desa yang Mandiri, Sejahtera, dan Berkelanjutan dengan mengedepankan Partisipasi Masyarakat serta Pelestarian Lingkungan untuk Kesejahteraan Bersama.”
                </Typography>
                <Typography color='green' variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Misi
                </Typography>
                <Typography variant="body1" paragraph>
                  Misi adalah rumusan umum mengenai upaya-upaya yang akan dilaksanakan untuk mewujudkan visi. Untuk meraih Visi Desa seperti yang sudah dijabarkan di atas, dengan mempertimbangan potensi dan hambatan baik internal maupun eksternal, maka tersusun Misi Desa sebagai berikut:
                </Typography>
                <List dense>
                  <ListItem disablePadding>
                    <ListItemText primary="Meningkatkan kualitas pelayanan publik melalui sistem pemerintahan yang transparan dan akuntabel." />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="Mengembangkan potensi ekonomi lokal dengan memberdayakan masyarakat melalui pelatihan dan akses terhadap sumber daya." />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="Mendorong pelestarian lingkungan dengan menerapkan praktik pembangunan yang berkelanjutan dan ramah lingkungan." />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="Memfasilitasi partisipasi masyarakat dalam proses pengambilan keputusan untuk menciptakan kebijakan yang responsif dan relevan dengan kebutuhan masyarakat." />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="Meningkatkan kualitas pendidikan dan keterampilan masyarakat agar dapat bersaing dan beradaptasi dengan perkembangan zaman." />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="Menggali dan mengembangkan potensi budaya lokal sebagai aset dalam memperkuat identitas dan nilai-nilai masyarakat." />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="Meningkatkan aksesibilitas infrastruktur dasar seperti jalan, sanitasi, dan listrik untuk menunjang kesejahteraan masyarakat." />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Batas-Batas & Peta Desa */}
      <Box sx={{ py: 10 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography color='green' variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Batas-Batas
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                  <ListItem sx={{ display: 'list-item' }}>
                    <ListItemText primary="Kode Desa: 3201072005." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <ListItemText primary="Klasifikasi: SWAKARYA" />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <ListItemText primary="Utara: Berbatasan dengan Desa Ragamanunggal Kabupaten Bekasi." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <ListItemText primary="Timur: Berbatasan dengan Desa Desa Cipeucang dan Desa Jatisari." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <ListItemText primary="Selatan: Berbatasan dengan Desa Mampir dan Desa Situsari." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <ListItemText primary="Barat: Berbatasan dengan Desa Mekarsari." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <ListItemText primary="Luas Wilayah: 640" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            {/* Bagian Peta */}
            <Grid item xs={12} md={6}>
              <Paper elevation={9} sx={{ p: 3, height: '100%', width:'160%'}}>
                <Typography color='green' variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Peta Desa
                </Typography>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.212042730107!2d106.96347187424694!3d-6.49503466352934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6992d9e6e84d41%3A0x67341e967a118833!2sDesa%20Gandoang!5e0!3m2!1sen!2sid!4v1700200000000!5m2!1sen!2sid"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Profil;