class LivroDAO {
    constructor() {
        this._livros = [];
        this.autoIncremet = (function () {
            let number = 0;
            return function () {
                number++;
                return number;
            }
        })();
    }

    listar() {
        return this._livros;
    }

    adicionar(livro) {
        livro.id = this.autoIncremet();
        this._livros.push(livro);
    }

    remover(livroId) {
        livroId = Number.parseInt(livroId);
        const result = this._livros.filter((item) => item.id != livroId)
        if (result.length != this._livros.length) {
            this._livros = result;
            return true
        }
        return false;
    }

    buscarPorId(livroId) {
        livroId = Number.parseInt(livroId);
        if (this._livros == null || this._livros.length == 0) {
            return null;
        }
        const result = this._livros.filter((item) => item.id == livroId);
        if (result) {
            return result[0];
        }
        return null;
    }
}

module.exports = {
    LivroDAO
}