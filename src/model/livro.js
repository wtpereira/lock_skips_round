const { Categoria } = require('./categoria')
const { Editora } = require('./editora')
const { Autor } = require('./autor')

class Livro {
    constructor(id, titulo, resumo, ano, paginas, isbn, categoria, editora, autor) {
        this._id = id;
        this._titulo = titulo;
        this._resumo = resumo;
        this._ano = ano;
        this._paginas = paginas;
        this._isbn = isbn;
        this._categoria = categoria;
        this._editora = editora;
        this._autor = autor;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get titulo() {
        return this._titulo;
    }

    set titulo(titulo) {
        this._titulo = titulo;
    }

    get resumo() {
        return this._resumo;
    }

    set resumo(resumo) {
        this._resumo = resumo;
    }

    get ano() {
        return this._ano;
    }

    set ano(ano) {
        this._ano = ano;
    }

    get paginas() {
        return this._paginas;
    }

    set paginas(paginas) {
        this._paginas = paginas;
    }

    get isbn() {
        return this._isbn;
    }

    set isbn(isbn) {
        this._isbn = isbn;
    }
}

module.exports = {
    Livro
}

