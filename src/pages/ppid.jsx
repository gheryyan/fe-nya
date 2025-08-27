import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import PpidList from '../components/PpidList'; 
import PpidForm from '../components/PpidForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Ppid() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ bgcolor: 'green', color: 'white', py: 8, textAlign: 'left' }}>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            PPID
          </Typography>
          <Typography variant="h5" component="p">
            Pejabat Pengelola Informasi dan Dokumentasi
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 5 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Informasi Umum" {...a11yProps(0)} />
            <Tab label="Laporan Desa" {...a11yProps(1)} />
            <Tab label="Permohonan & Pengaduan" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <PpidList jenis="informasi_umum" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PpidList jenis="laporan_desa" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PpidForm />
        </TabPanel>
      </Container>
    </>
  );
}