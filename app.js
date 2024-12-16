const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// --- Clases ---
class Autor {
    constructor(id, nombre, nacionalidad) {
        this.id = id;
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
    }
}

class Libro {
    constructor(id, titulo, autorId, anioPublicacion) {
        this.id = id;
        this.titulo = titulo;
        this.autorId = autorId;
        this.anioPublicacion = anioPublicacion;
    }
}

class Biblioteca {
    constructor() {
        this.autores = [];
        this.libros = [];
    }

    agregarAutor(autor) {
        this.autores.push(autor);
    }

    agregarLibro(libro) {
        this.libros.push(libro);
    }

    obtenerLibrosPorAutor(autorId) {
        return this.libros.filter(libro => libro.autorId === autorId);
    }
}

// --- Instancia de la biblioteca ---
const biblioteca = new Biblioteca();
let autorIdCounter = 1;
let libroIdCounter = 1;

// --- Datos de ejemplo ---
const autor1 = new Autor(autorIdCounter++, "Gabriel García Márquez", "Colombiana");
const autor2 = new Autor(autorIdCounter++, "Miguel de Cervantes", "Española");
biblioteca.agregarAutor(autor1);
biblioteca.agregarAutor(autor2);

biblioteca.agregarLibro(new Libro(libroIdCounter++, "Cien años de soledad", autor1.id, 1967));
biblioteca.agregarLibro(new Libro(libroIdCounter++, "Don Quijote de la Mancha", autor2.id, 1605));

// --- Rutas ---
app.get('/', (req, res) => {
    res.send(`
        <h1>Bienvenido a la Biblioteca</h1>
        <ul>
            <li><a href="/autores">Ver todos los autores</a></li>
            <li><a href="/libros">Ver todos los libros</a></li>
        </ul>
    `);
});

// --- Ruta: Ver todos los autores ---
app.get('/autores', (req, res) => {
    let html = '<h1>Lista de Autores</h1><ul>';
    biblioteca.autores.forEach(autor => {
        html += `<li><a href="/autores/${autor.id}">${autor.nombre}</a></li>`;
    });
    html += '</ul><a href="/">Volver al inicio</a>';
    res.send(html);
});

// --- Ruta: Ver detalles de un autor y sus libros ---
app.get('/autores/:id', (req, res) => {
    const autorId = parseInt(req.params.id);
    const autor = biblioteca.autores.find(a => a.id === autorId);

    if (!autor) {
        return res.status(404).send('<h1>Autor no encontrado</h1><a href="/autores">Volver</a>');
    }

    const libros = biblioteca.obtenerLibrosPorAutor(autorId);
    let html = `<h1>Detalles del Autor</h1>
                <p><strong>Nombre:</strong> ${autor.nombre}</p>
                <p><strong>Nacionalidad:</strong> ${autor.nacionalidad}</p>
                <h2>Libros:</h2><ul>`;

    libros.forEach(libro => {
        html += `<li>${libro.titulo} (${libro.anioPublicacion})</li>`;
    });

    html += `</ul><a href="/autores">Volver a la lista de autores</a>`;
    res.send(html);
});

// --- Ruta: Ver todos los libros ---
app.get('/libros', (req, res) => {
    let html = '<h1>Lista de Libros</h1><ul>';
    biblioteca.libros.forEach(libro => {
        const autor = biblioteca.autores.find(a => a.id === libro.autorId);
        html += `<li>${libro.titulo} - <strong>${autor ? autor.nombre : "Autor desconocido"}</strong> (${libro.anioPublicacion})</li>`;
    });
    html += '</ul><a href="/">Volver al inicio</a>';
    res.send(html);
});

// --- Ruta: Agregar un nuevo autor ---
app.post('/autores', (req, res) => {
    const { nombre, nacionalidad } = req.body;
    if (!nombre || !nacionalidad) {
        return res.status(400).send("Faltan datos del autor");
    }
    const nuevoAutor = new Autor(autorIdCounter++, nombre, nacionalidad);
    biblioteca.agregarAutor(nuevoAutor);
    res.status(201).send(`Autor "${nombre}" agregado correctamente`);
});

// --- Ruta: Agregar un nuevo libro ---
app.post('/libros', (req, res) => {
    const { titulo, autorId, anioPublicacion } = req.body;
    if (!titulo || !autorId || !anioPublicacion) {
        return res.status(400).send("Faltan datos del libro");
    }
    const autor = biblioteca.autores.find(a => a.id === parseInt(autorId));
    if (!autor) {
        return res.status(404).send("El autor no existe");
    }
    const nuevoLibro = new Libro(libroIdCounter++, titulo, autor.id, anioPublicacion);
    biblioteca.agregarLibro(nuevoLibro);
    res.status(201).send(`Libro "${titulo}" agregado correctamente`);
});

// --- Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

