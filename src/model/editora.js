class Editora {
    constructor(id, nome, endereco, telefone) {
        this._id = id;
        this._nome = nome;
        this._endereco = endereco;
        this._telefone = telefone;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get nome() {
        return this._nome;
    }

    set nome(nome) {
        this._nome = nome;
    }

    get endereco() {
        return this._endereco;
    }

    set endereco(endereco) {
        this._endereco = endereco;
    }

    get telefone() {
        return this._telefone;
    }

    set telefone(telefone) {
        this._telefone = telefone;
    }
}

module.exports = {
    Editora
}