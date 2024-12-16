const data = require('../data/database.json');
const Autor = require('../models/Autor');

exports.getAutores = (req, res) => {
    res.json(data.autores);
};

exports.addAutor = (req, res) => {
    const { id, nombre, nacionalidad } = req.body;
    const nuevoAutor = new Autor(id, nombre, nacionalidad);
    data.autores.push(nuevoAutor);
    res.status(201).json({ message: "Autor agregado", autor: nuevoAutor });
};
