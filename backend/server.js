require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de la Base de Datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('¡Conexión exitosa a MySQL (pokestore_db)!');
});

// Configuración para subir imágenes de productos
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// --- ENDPOINTS ---

// 1. Obtener todos los productos
app.get('/api/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al consultar productos' });
        res.json(results);
    });
});

// 2. Crear un nuevo producto
app.post('/api/productos', upload.single('imagen'), (req, res) => {
    const { codigo, nombre, descripcion, precio, stock, stock_critico, categoria } = req.body;
    const imagenUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const query = `INSERT INTO productos 
        (codigo, nombre, descripcion, precio, stock, stock_critico, categoria, imagen) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [codigo, nombre, descripcion, precio, stock, stock_critico, categoria, imagenUrl];

    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al guardar el producto', detalle: err });
        res.status(201).json({ mensaje: 'Producto creado exitosamente', id: result.insertId });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor de la PokeStore corriendo en http://localhost:${PORT}`);
});