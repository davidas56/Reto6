// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Configurar middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexión a la base de datos MongoDB
const mongoURI = 'mongodb://localhost:27017/nombre_base_datos'; // Reemplaza 'nombre_base_datos' con el nombre de tu base de datos
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir el esquema del modelo
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Crear el modelo
const Item = mongoose.model('Item', ItemSchema);

// Rutas de la API
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();  
    // filtro de busqueda agregado
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los elementos' });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo elemento' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});