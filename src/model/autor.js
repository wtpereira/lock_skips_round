class Autor {
    constructor(id, nome, email, telefone, bio) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._telefone = telefone;
        this._bio = bio;
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

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get telefone() {
        return this._telefone;
    }

    set telefone(telefone) {
        this._telefone = telefone;
    }

    get bio() {
        return this._bio;
    }

    set bio(bio) {
        this._bio = bio;
    }
}

module.exports = {
    Autor
}