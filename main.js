const express = require("express");
const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Clase Autor
class Autor {
    constructor(nombre, nacionalidad) {
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
    }
}

// Clase Libro
class Libro {
    constructor(titulo, autor, anio, disponible = true) {
        this.titulo = titulo;
        this.autor = autor; // Instancia de la clase Autor
        this.anio = anio;
        this.disponible = disponible;
    }
}

// Clase Biblioteca
class Biblioteca {
    constructor() {
        this.libros = [];
    }

    agregarLibro(libro) {
        this.libros.push(libro);
    }

    listarLibros() {
        return this.libros;
    }
}

// Crear instancia de la biblioteca
const biblioteca = new Biblioteca();

// Endpoint para agregar un libro
app.post("/api/libros", (req, res) => {
    const { titulo, autor, nacionalidad, anio } = req.body;
    if (!titulo || !autor || !nacionalidad || !anio) {
        return res.status(400).send("Todos los campos son obligatorios: titulo, autor, nacionalidad, anio");
    }

    const nuevoAutor = new Autor(autor, nacionalidad);
    const nuevoLibro = new Libro(titulo, nuevoAutor, anio);
    biblioteca.agregarLibro(nuevoLibro);

    res.status(201).send(`Libro "${titulo}" agregado correctamente.`);
});

// Endpoint para listar todos los libros
app.get("/api/libros", (req, res) => {
    const libros = biblioteca.listarLibros();
    res.json(libros);
});

// Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

