import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Divider,
} from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorefrontIcon from '@mui/icons-material/Storefront';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import GavelIcon from '@mui/icons-material/Gavel';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
  try {
    // Langkah 1: Kirim permintaan logout ke server
    await axios.post('logout'); 
    
    // Langkah 2: Bersihkan token dari localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('auth_token');
    
    // Langkah 3: HAPUS header Authorization secara manual dari axios
    // Ini adalah langkah paling penting untuk mencegah masalah 401
    delete axios.defaults.headers.common['Authorization'];
    
    // Langkah 4: Arahkan pengguna ke halaman login
    navigate('/admin/login');
  } catch (err) {
    // Jika server merespons 401 (karena token sudah kedaluwarsa), 
    // kita tetap jalankan proses logout di front-end
    if (err.response && err.response.status === 401) {
      console.log("Token sudah kedaluwarsa. Melanjutkan proses logout.");
    } else {
      console.error('Logout failed:', err);
      alert('Logout failed. Silakan coba lagi.');
    }
    
    // Pastikan token dan header dihapus dalam kondisi apapun
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('auth_token');
    delete axios.defaults.headers.common['Authorization'];
    
    navigate('/admin/login');
  }
};

  const menuItems = [
    { text: 'Kegiatan', icon: <EventNoteIcon />, path: '/admin/kegiatan' },
    { text: 'Perangkat Desa', icon: <PeopleIcon />, path: '/admin/perangkat' },
    { text: 'Struktur Desa', icon: <AccountTreeIcon />, path: '/admin/struktur' },
    { text: 'Potensi Desa', icon: <StorefrontIcon />, path: '/admin/potensi' },
    { text: 'Produk', icon: <StorefrontIcon />, path: '/admin/produk' },
    { text: 'Galeri Desa', icon: <PhotoCameraIcon />, path: '/admin/galeri' },
    { text: 'PPID', icon: <GavelIcon />, path: '/admin/ppid' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Desa
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem disablePadding key={item.path}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, mt: 8 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminPage;