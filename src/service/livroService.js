const prompt = require('prompt-sync')();

const { LivroDAO } = require('../dao/livroDao');
const { Livro } = require('../model/livro');


class LivroService {
    constructor(categoriaService, editoraService, autorService) {
        this._livroDao = new LivroDAO();
        this._categoriaService = categoriaService;
        this._editoraService = editoraService;
        this._autorService = autorService;
    }

    get livrodao() {
        return this._livroDao;
    }

    menu() {
        console.log("[Livros] Escolha uma das seguintes opções:\n1 - Listar todos os livros\n2 - Adicionar novo livro\n3 - Excluir livro\n4 - Ver livro por Id\n0 - Voltar ao menu anterior\n");
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
        console.log("\nListando livros...");
        try {
            let livros = this._livroDao.listar();
            if (livros.length === 0) {
                console.log("Nenhum livro encontrado!");
            }
            for (let livro of livros) {
                console.log(`Id: ${livro.id} | Título: ${livro.titulo} | Resumo: ${livro.resumo} | Ano: ${livro.ano.toString()} | Páginas: ${livro.paginas.toString()} | Isbn: ${livro.isbn} | Categoria: ${livro.categoria.nome} | Editora: ${livro.editora.nome}  | Autor: ${livro.autor.nome}`);
            }
        } catch (e) {
            console.log(`Erro ao exibir os livros! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

    adicionar() {
        console.log("\nAdicionando livro...");
        try {
            let titulo = prompt("Digite o título do livro: ");
            let resumo = prompt("Digite o resumo do livro: ");
            let ano = Number.parseInt(prompt("Digite o ano do livro: "));
            let paginas = Number.parseInt(prompt("Digite a quantidade de páginas do livro: "));
            let isbn = prompt("Digite o isbn do livro: ");

            this._categoriaService.listar();
            let idCategoria = prompt("Digite o ID da categoria do livro: ");
            let categoria = this._categoriaService.categoriaDao.buscarPorId(idCategoria);

            while (categoria === null) {
                console.log("Categoria não existente!");
                idCategoria = prompt("Digite o ID da categoria do livro: ");
                categoria = this._categoriaService.categoriaDao.buscarPorId(idCategoria);
            }

            this._editoraService.listar();

            let idEditora = prompt("Digite o ID da editora do livro: ");
            let editora = this._editoraService.editoraDao.buscarPorId(idEditora);

            while (editora === null) {
                console.log("Editora não existente!");
                idEditora = prompt("Digite o ID da editora do livro: ");
                editora = this._editoraService.editoraDao.buscarPorId(idEditora);
            }

            this._autorService.listar();

            let idAutor = prompt("Digite o ID do autor do livro: ");
            let autor = this._autorService.autorDao.buscarPorId(idAutor);

            while (autor === null) {
                console.log("Autor não existente!");
                idAutor = prompt("Digite o ID do autor do livro: ");
                autor = this._autorService.autorDao.buscarPorId(idAutor);
            }

            let livro = new Livro();
            livro.titulo = titulo;
            livro.resumo = resumo;
            livro.ano = ano;
            livro.paginas = paginas;
            livro.isbn = isbn;
            livro.categoria = categoria;
            livro.editora = editora;
            livro.autor = autor;

            this._livroDao.adicionar(livro);
            console.log("Livro adicionado com sucesso!");
        } catch (e) {
            console.log(`Erro ao inserir livro! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

    remover() {
        console.log("\nRemovendo livro...");
        try {
            let livroId = prompt("Digite o ID do livro para excluir: ");
            if (this._livroDao.remover(livroId)) {
                console.log("Livro excluído com sucesso!");
            } else {
                console.log("Livro não encontrado!");
            }
        } catch (e) {
            console.log(`Erro ao excluir livro! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

    mostrarPorId() {
        console.log("\nLivro por Id...");
        try {
            let id = prompt("Digite o Id do livro para buscar: ");
            let livro = this._livroDao.buscarPorId(id);
            if (livro == null || livro.length == 0) {
                console.log("Livro não encontrado!");
            } else {
                console.log(`Id: ${livro.id} | Título: ${livro.titulo} | Resumo: ${livro.resumo} | Ano: ${livro.ano.toString()} | Páginas: ${livro.paginas.toString()} | Isbn: ${livro.isbn} | Categoria: ${livro.categoria.nome} | Editora: ${livro.editora.nome}  | Autor: ${livro.autor.nome}`);
            }
        } catch (e) {
            console.log(`Erro ao exibir livro! - ${e}`);
            return;
        }
        prompt("Pressione uma tecla para continuar...");
    }

}


module.exports = {
    LivroService
}