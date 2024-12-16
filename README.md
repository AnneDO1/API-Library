# API REST para Biblioteca

## Endpoints

### Autores
- `GET /autores`: Lista todos los autores.
- `POST /autores`: Agrega un autor (requiere `id`, `nombre`, `nacionalidad`).

### Libros
- `GET /libros`: Lista todos los libros.
- `GET /libros/disponibles`: Lista los libros disponibles.
- `GET /libros/nodisponibles`: Lista los libros no disponibles.
- `POST /libros`: Agrega un libro (requiere `id`, `titulo`, `autorId`, `anioPublicacion`).

## Instrucciones
1. Instala las dependencias:
   ```bash
   npm install express
