class Libro {
    constructor(id, titulo, autorId, anioPublicacion, disponibilidad = true) {
        this.id = id;
        this.titulo = titulo;
        this.autorId = autorId;
        this.anioPublicacion = anioPublicacion;
        this.disponibilidad = disponibilidad;
    }
}

module.exports = Libro;
