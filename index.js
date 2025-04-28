import { Estoque } from './classes/estoque.js';
import { Produto } from './classes/produto.js';
import { Cliente } from './classes/cliente.js';

const estoque = new Estoque();
const produto1 = new Produto('Dipirona', 50, 40, 2);
const produto2 = new Produto('Nimesulida', 30, 25, 1);
const produto3 = new Produto('Sumax Pro', 100, 90, 5);
estoque.addProduto(produto1, 100);
estoque.addProduto(produto2, 150);
estoque.addProduto(produto3, 50);

const clientePJ = new Cliente('PJ');
clientePJ.catalogoProdutos(estoque);
clientePJ.modificarCarrinho(estoque, produto1.codigo, 3);
clientePJ.modificarCarrinho(estoque, produto2.codigo, 0);
clientePJ.fecharCarrinho();

console.log('----------------------------------------------');

const clientePF = new Cliente('PF');
clientePF.catalogoProdutos(estoque);
clientePF.modificarCarrinho(estoque, produto1.codigo, 2);
clientePF.removerDoCarrinho(produto2.codigo);
clientePF.fecharCarrinho();
