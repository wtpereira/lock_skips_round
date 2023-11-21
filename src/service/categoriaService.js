const { CategoriaDAO } = require('../dao/categoriaDao');
const { Categoria } = require('../model/categoria');

const prompt = require('prompt-sync')();

class CategoriaService {
    constructor() {
        this._categoriaDao = new CategoriaDAO();
    }

    get categoriaDao() {
        return this._categoriaDao;
    }

    menu() {
        console.log("[Categorias] Escolha uma das seguintes opções:\n1 - Listar todas as categorias\n2 - Adicionar nova categoria\n3 - Excluir categoria\n4 - Ver categoria por Id\n0 - Voltar ao menu anterior\n");
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
        console.log("\nListando categorias...");
        try {
            let categorias = this._categoriaDao.listar();

            if (categorias.length === 0) {
                console.log("Nenhuma categoria encontrada!");
            }

            for (let categoria of categorias) {
                console.log(`${categoria.id} | ${categoria.nome}`);
            }
        } catch (e) {
            console.log(`Erro ao exibir as categorias! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

    adicionar() {
        console.log("\nAdicionando categoria...");
        try {
            let nome = prompt("Digite o nome da categoria: ");
            let categoria = new Categoria();
            categoria.nome = nome;

            this._categoriaDao.adicionar(categoria);

            console.log("Categoria adicionada com sucesso!");
        } catch (e) {
            console.log(`Erro ao inserir categoria! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

    remover() {
        console.log("\nRemovendo categoria...");
        try {
            let categoriaid = prompt("Digite o ID da categoria para excluir: ");

            if (this._categoriaDao.remover(categoriaid)) {
                console.log("Categoria excluída com sucesso!");
            } else {
                console.log("Categoria não encontrada!");
            }
        } catch (e) {
            console.log(`Erro ao excluir categoria! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

    mostrarPorId() {
        console.log("\nCategoria por Id...");
        try {
            let id = prompt("Digite o Id da categoria para buscar: ");
            let categoria = this._categoriaDao.buscarPorId(id);

            if (categoria == null || categoria.length == 0) {
                console.log("Categoria não encontrada!");
            } else {
                console.log(`Id: ${categoria.id} | Categoria: ${categoria.nome}`);
            }
        } catch (e) {
            console.log(`Erro ao exibir categoria! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

}


module.exports = {
    CategoriaService
}