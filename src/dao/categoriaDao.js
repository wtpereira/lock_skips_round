class CategoriaDAO {
    constructor() {
        this._categorias = [];
        this.autoIncremet = (function () {
            let number = 0;
            return function () {
                number++;
                return number;
            }
        })();
    }

    listar() {
        return this._categorias;
    }

    adicionar(categoria) {
        categoria.id = this.autoIncremet();
        this._categorias.push(categoria);
    }

    remover(categoriaid) {
        categoriaid = Number.parseInt(categoriaid);
        const result = this._categorias.filter((item) => item.id != categoriaid);
        if (result.length != this._categorias.length) {
            this._categorias = result;
            return true
        }
        return false;
    }

    buscarPorId(categoriaid) {
        categoriaid = Number.parseInt(categoriaid);
        if (this._categorias == null || this._categorias.length == 0) {
            return null;
        }
        const result = this._categorias.filter((item) => item.id == categoriaid);
        if (result) {
            return result[0];
        }
        return null;
    }
}

module.exports = {
    CategoriaDAO
}
