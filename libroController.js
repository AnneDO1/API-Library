const data = require('../data/database.json');
const Libro = require('../models/Libro');

exports.getLibros = (req, res) => {
    res.json(data.libros);
};

exports.getLibrosDisponibles = (req, res) => {
    const disponibles = data.libros.filter(libro => libro.disponibilidad);
    res.json(disponibles);
};

exports.getLibrosNoDisponibles = (req, res) => {
    const noDisponibles = data.libros.filter(libro => !libro.disponibilidad);
    res.json(noDisponibles);
};

exports.addLibro = (req, res) => {
    const { id, titulo, autorId, anioPublicacion } = req.body;
    const nuevoLibro = new Libro(id, titulo, autorId, anioPublicacion);
    data.libros.push(nuevoLibro);
    res.status(201).json({ message: "Libro agregado", libro: nuevoLibro });
};
