const { EditoraDAO } = require('../dao/editoraDao');
const { Editora } = require('../model/editora');

const prompt = require('prompt-sync')();

class EditoraService {
    constructor() {
        this._editoraDao = new EditoraDAO();
    }

    get editoraDao() {
        return this._editoraDao;
    }

    menu() {
        console.log("[Editoras] Escolha uma das seguintes opções:\n1 - Listar todas as editoras\n2 - Adicionar nova editora\n3 - Excluir editora\n4 - Ver editora por Id\n0 - Voltar ao menu anterior\n");
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
        console.log("\nListando editoras...");
        try {
            let editoras = this._editoraDao.listar();

            if (editoras.length === 0) {
                console.log("Nenhuma editora encontrada!");
            }

            for (let editora of editoras) {
                console.log(`${editora.id} | ${editora.nome}`);
            }
        } catch (e) {
            console.log(`Erro ao exibir as editoras! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

    adicionar() {
        console.log("\nAdicionando editora...");
        try {
            let nome = prompt("Digite o nome da editora: ");
            let editora = new Editora();
            editora.nome = nome;

            this._editoraDao.adicionar(editora);

            console.log("Editora adicionada com sucesso!");
        } catch (e) {
            console.log(`Erro ao inserir editora! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

    remover() {
        console.log("\nRemovendo editora...");
        try {
            let editoraId = prompt("Digite o ID da editora para excluir: ");

            if (this._editoraDao.remover(editoraId)) {
                console.log("Editora excluída com sucesso!");
            } else {
                console.log("Editora não encontrada!");
            }
        } catch (e) {
            console.log(`Erro ao excluir editora! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

    mostrarPorId() {
        console.log("\nEditora por Id...");
        try {
            let id = prompt("Digite o Id da editora para buscar: ");
            let editora = this._editoraDao.buscarPorId(id);

            if (editora == null || editora.length == 0) {
                console.log("Editora não encontrada!");
            } else {
                console.log(`Id: ${editora.id} | Editora: ${editora.nome}`);
            }
        } catch (e) {
            console.log(`Erro ao exibir editora! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

}


module.exports = {
    EditoraService
}