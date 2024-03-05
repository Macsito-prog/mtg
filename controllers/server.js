const express = require('express');
const bodyParser = require('body-parser');  
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

let usuarios = []

//agregar un usuario
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;

    // Generar un nuevo ID autoincrementable
    const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
    nuevoUsuario.id = nuevoId;

    usuarios.push(nuevoUsuario);
    res.status(201).json({ message: 'Usuario agregado correctamente', id: nuevoId });
});

//obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Ruta para eliminar un usuario por su ID
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // Filtra el array de usuarios para encontrar y eliminar el usuario con el ID especificado
    usuarios = usuarios.filter(usuario => usuario.id !== id);
    res.json({ message: 'Usuario eliminado correctamente' });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});