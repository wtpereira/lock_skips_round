require('dotenv').config();

const { CategoriaService } = require('./src/service/categoriaService');
const { EditoraService } = require('./src/service/editoraService');
const { AutorService } = require('./src/service/autorService');
const { LivroService } = require('./src/service/livroService');

const categoriaService = new CategoriaService();
const editoraService = new EditoraService();
const autorService = new AutorService();
const livroService = new LivroService(categoriaService, editoraService, autorService);

const prompt = require('prompt-sync')();

function menuPrincipal() {
    console.log('[Menu Principal] Escolha uma das seguintes opções:\n' +
            '1 - Categorias\n' +
            '2 - Editoras\n' +
            '3 - Autores\n' +
            '4 - Livros\n' +
            '0 - Sair do programa\n');
    const escolha = prompt('Digite a opção: ');
    if (escolha === '0') {
        console.log('Obrigado, até logo!');
        process.exit();
    }
    switch (escolha) {
        case "1":
            categoriaService.menu();
            break;
        case "2":
            editoraService.menu();
            break;
        case "3":
            autorService.menu();
            break;
        case "4":
            livroService.menu();
            break;
        default:
            console.log("Opção inválida! Por favor, tente novamente!");
    }
    menuPrincipal();
}

console.log('Bem-vindo a Livraria SHIFT - Javascript Developer!');
menuPrincipal();