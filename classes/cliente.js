import { Carrinho } from './carrinho.js';

export class Cliente {
    constructor(tipo) {
        this.tipo = tipo;
        this.carrinho = new Carrinho();
    }

    catalogoProdutos(estoque) {
        const catalogo = [];
        estoque.produtos.forEach(element => {
            if (this.tipo === 'PJ') {
                catalogo.push({
                    codigo: element.codigo,
                    descricao: element.descricao,
                    preco: element.valorPJ,
                });
            } else {
                catalogo.push({
                    codigo: element.codigo,
                    descricao: element.descricao,
                    preco: element.valorPF,
                });
            }
        });
        return console.table(catalogo);
    }

    modificarCarrinho(estoque, codigoProduto, quantidade = false) {
        const produtoNumcodigo = estoque.produtos.find(item => item.codigo === codigoProduto);

        if (!produtoNumcodigo) {
            console.log(`Produto com índice ${codigoProduto} não encontrado.`);
            return;
        }

        const produtoNoCarrinho = this.carrinho.itens.find(item => item.codigo === produtoNumcodigo.codigo);

        if (quantidade === false) {
            if (!produtoNoCarrinho) {
                const novoItem = {
                    codigo: produtoNumcodigo.codigo,
                    descricao: produtoNumcodigo.descricao,
                    preco:
                        this.tipo === 'PJ'
                            ? produtoNumcodigo.valorPJ
                            : produtoNumcodigo.valorPF,
                    qtde: produtoNumcodigo.qtdeMinima,
                };
                this.carrinho.addItens(novoItem);
            } else {
                produtoNoCarrinho.qtde += 1;
            }
            return;
        }

        if (quantidade <= 0 && produtoNoCarrinho) {
            this.removerDoCarrinho(codigoProduto);
        } else if (quantidade >= produtoNumcodigo.qtdeMinima) {
            if (produtoNoCarrinho) {
                produtoNoCarrinho.qtde = quantidade;
            } else {
                const novoItem = {
                    codigo: produtoNumcodigo.codigo,
                    descricao: produtoNumcodigo.descricao,
                    preco:
                        this.tipo === 'PJ'
                            ? produtoNumcodigo.valorPJ
                            : produtoNumcodigo.valorPF,
                    qtde: quantidade,
                };

                this.carrinho.addItens(novoItem);
            }
        } else if (quantidade < produtoNumcodigo.qtdeMinima) {
            console.log('Quantidade informada é menor que a quantidade mínima permitida');
        }
    }

    removerDoCarrinho(cod) {
        const codigoCarrinho = this.carrinho.itens.findIndex(item => item.codigo === cod);
        if (codigoCarrinho !== -1) {
            this.carrinho.itens.splice(codigoCarrinho, 1);
        } else {
            console.log(`Produto com índice ${cod} não encontrado.`);
        }
    }

    fecharCarrinho() {
        const newArr = [];
        let valorTotal = 0;
        if (this.carrinho.itens.length !== 0) {
            this.carrinho.itens.forEach(element => {
                newArr.push({
                    Descrição: element.descricao,
                    Quantidade: element.qtde,
                    'Valor Unitário': element.preco,
                    'Valor Total': element.qtde * element.preco,
                });
            });
            console.table(newArr);
            newArr.forEach((element, index) => {
                valorTotal += newArr[index]['Valor Total'];
            });
            this.aplicarDesconto(valorTotal);
        } else {
            console.log(`Carrinho do Cliente ${this.tipo} está vazio.`);
        }
    }

    aplicarDesconto(valorTotal) {
        if (this.tipo === 'PJ' && valorTotal > 500) {
            console.log(`Total do carrinho com desconto: R$${(
                valorTotal - (valorTotal * 0.1)
            ).toFixed(2)}`);
        } else {
            console.log(`Total do carrinho: R$${valorTotal.toFixed(2)}`);
        }
    }
}
