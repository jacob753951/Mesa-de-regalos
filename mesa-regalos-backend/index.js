// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mesa_regalos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const TareaSchema = new mongoose.Schema({
  texto: String
});

const Tarea = mongoose.model('Tarea', TareaSchema);

// Obtener todas las tareas
app.get('/tareas', async (req, res) => {
  const tareas = await Tarea.find();
  res.json(tareas);
});

// Añadir tarea
app.post('/tareas', async (req, res) => {
  const nueva = new Tarea({ texto: req.body.texto });
  await nueva.save();
  res.json(nueva);
});

// Eliminar tarea con contraseña
app.delete('/tareas/:id', async (req, res) => {
  const { clave } = req.body;
  if (clave !== '1234') return res.status(403).json({ error: 'Contraseña incorrecta' });

  await Tarea.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Tarea eliminada' });
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
