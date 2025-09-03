import React, { useState, useEffect } from 'react';
import api from "../api"; 
import {
    Box,
    Typography,
    Button,
    Modal,
    TextField,
    CircularProgress,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const AdminPotensi = () => {
    const [potensi, setPotensi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        description: '',
        image: null,
        category: ''
    });

    const fetchData = async () => {
        try {
            const response = await api.get('/potensi');
            setPotensi(response.data);
            setLoading(false);
        } catch (err) {
            setError('Gagal memuat data potensi.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddOpen = () => {
        setFormData({ id: null, title: '', description: '', image: null, category: '' });
        setModalOpen(true);
    };

    const handleEditOpen = (item) => {
        setFormData({
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.image,
            category: item.category
        });
        setModalOpen(true);
    };

    const handleDeleteOpen = (id) => {
        setCurrentId(id);
        setDeleteDialogOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setDeleteDialogOpen(false);
        setCurrentId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);

        if (formData.image instanceof File) {
            data.append('image', formData.image);
        }

        try {
            if (formData.id) {
                // Update existing
                data.append('_method', 'PUT');
                await api.post(`/potensi/${formData.id}`, data);
            } else {
                // Add new
                await api.post('/potensi', data);
            }
            fetchData();
            handleClose();
        } catch (err) {
            console.error('Submission error:', err);
            alert('Gagal menyimpan data.');
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/potensi/${currentId}`);
            fetchData();
            handleClose();
        } catch (err) {
            console.error('Deletion error:', err);
            alert('Gagal menghapus data.');
        }
    };

    if (loading) {
        return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
    }

    if (error) {
        return <Box display="flex" justifyContent="center"><Alert severity="error">{error}</Alert></Box>;
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Potensi
            </Typography>
            <Box mb={2}>
                <Button variant="contained" color="primary" onClick={handleAddOpen} startIcon={<AddIcon />}>
                    Tambah Potensi
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Gambar</TableCell>
                            <TableCell>Kategori</TableCell>
                            <TableCell>Judul</TableCell>
                            <TableCell>Deskripsi</TableCell>
                            <TableCell>Aksi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {potensi.length > 0 ? (
                            potensi.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <img src={`https://www.web-gws.my.id${item.image}`} alt={item.title} style={{ width: '100px', height: 'auto' }} />
                                    </TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditOpen(item)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteOpen(item.id)} color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">Belum ada data potensi.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal Tambah/Edit */}
            <Modal open={modalOpen} onClose={handleClose}>
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6" component="h2" mb={2}>
                        {formData.id ? 'Edit Potensi' : 'Tambah Potensi Baru'}
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Kategori</InputLabel>
                        <Select
                            label="Kategori"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="">Pilih Kategori</MenuItem>
                            <MenuItem value="Potensi Alam">Potensi Alam</MenuItem>
                            <MenuItem value="Potensi Ekonomi">Potensi Ekonomi</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Judul"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Deskripsi"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        required
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        Pilih Gambar
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {formData.image && (
                        <Box mt={1} mb={2}>
                            <Typography variant="caption">
                                {formData.image instanceof File ? formData.image.name : "Gambar saat ini"}
                            </Typography>
                        </Box>
                    )}
                    <Button type="submit" variant="contained" fullWidth>
                        Simpan
                    </Button>
                </Box>
            </Modal>

            {/* Dialog Konfirmasi Hapus */}
            <Dialog open={deleteDialogOpen} onClose={handleClose}>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Apakah Anda yakin ingin menghapus data ini?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Batal</Button>
                    <Button onClick={handleDelete} color="error">Hapus</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminPotensi;