const { AutorDAO } = require('../dao/autorDao');
const { Autor } = require('../model/autor');

const prompt = require('prompt-sync')();

class AutorService {
    constructor() {
        this._autorDao = new AutorDAO();
    }

    get autorDao() {
        return this._autorDao;
    }

    menu() {
        console.log("[Autors] Escolha uma das seguintes opções:\n1 - Listar todos os autores\n2 - Adicionar novo autor\n3 - Excluir autor\n4 - Ver autor por Id\n0 - Voltar ao menu anterior\n");
        let escolha = prompt("Digite a opção: ");

        if (escolha === "0") {
            return;
        }
        switch (escolha) {
            case "1":
                this.listar();
                break;
            case "2":
                this.adicionar();
                break;
            case "3":
                this.remover();
                break;
            case "4":
                this.mostrarPorId();
                break;
            default:
                console.log("Opção inválida! Por favor, tente novamente!");
        }
        this.menu();
    }

    listar() {
        console.log("\nListando autors...");
        try {
            let autors = this._autorDao.listar();

            if (autors.length === 0) {
                console.log("Nenhum autor encontrado!");
            }

            for (let autor of autors) {
                console.log(`${autor.id} | ${autor.nome}`);
            }
        } catch (e) {
            console.log(`Erro ao exibir os autores! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

    adicionar() {
        console.log("\nAdicionando autor...");
        try {
            let nome = prompt("Digite o nome do autor: ");
            let autor = new Autor();
            autor.nome = nome;

            this._autorDao.adicionar(autor);

            console.log("Autor adicionado com sucesso!");
        } catch (e) {
            console.log(`Erro ao inserir autor! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

    remover() {
        console.log("\nRemovendo autor...");
        try {
            let autorid = prompt("Digite o ID do autor para excluir: ");

            if (this._autorDao.remover(autorid)) {
                console.log("Autor excluído com sucesso!");
            } else {
                console.log("Autor não encontrado!");
            }
        } catch (e) {
            console.log(`Erro ao excluir autor! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

    mostrarPorId() {
        console.log("\nAutor por Id...");
        try {
            let id = prompt("Digite o Id do autor para buscar: ");
            let autor = this._autorDao.buscarPorId(id);

            if (autor == null || autor.length == 0) {
                console.log("Autor não encontrado!");
            } else {
                console.log(`Id: ${autor.id} | Autor: ${autor.nome}`);
            }
        } catch (e) {
            console.log(`Erro ao exibir autor! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

}


module.exports = {
    AutorService
}