class AutorDAO {
    constructor() {
        this._autores = [];
        this.autoIncremet = (function () {
            let number = 0;
            return function () {
                number++;
                return number;
            }
        })();
    }

    listar() {
        return this._autores;
    }

    adicionar(autor) {
        autor.id = this.autoIncremet();
        this._autores.push(autor);
    }

    remover(autorid) {
        autorid = Number.parseInt(autorid);
        const result = this._autores.filter((item) => item.id != autorid)
        if (result.length != this._autores.length) {
            this._autores = result;
            return true
        }
        return false;
    }

    buscarPorId(autorid) {
        autorid = Number.parseInt(autorid);
        if (this._autores == null || this._autores.length == 0) {
            return null;
        }
        const result = this._autores.filter((item) => item.id == autorid);
        if (result) {
            return result[0];
        }
        return null;
    }
}

module.exports = {
    AutorDAO
}