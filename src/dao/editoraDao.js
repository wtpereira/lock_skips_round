class EditoraDAO {
    constructor() {
        this._editoras = [];
        this.autoIncremet = (function () {
            let number = 0;
            return function () {
                number++;
                return number;
            }
        })();
    }

    listar() {
        return this._editoras;
    }

    adicionar(editora) {
        editora.id = this.autoIncremet();
        this._editoras.push(editora);
    }

    remover(editoraId) {
        editoraId = Number.parseInt(editoraId);
        const result = this._editoras.filter((item) => item.id != editoraId)
        if (result.length != this._editoras.length) {
            this._editoras = result;
            return true
        }
        return false;
    }

    buscarPorId(editoraId) {
        editoraId = Number.parseInt(editoraId);
        if (this._editoras == null || this._editoras.length == 0) {
            return null;
        }
        const result = this._editoras.filter((item) => item.id == editoraId);
        if (result) {
            return result[0];
        }
        return null;
    }
}

module.exports = {
    EditoraDAO
}