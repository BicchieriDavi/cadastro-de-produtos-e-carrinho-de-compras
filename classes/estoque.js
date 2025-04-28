export class Estoque {
    constructor() {
        this.produtos = [];
    }
    addProduto(produto, qtdProduto) {
        this.produtos.push({
            codigo: produto.codigo,
            descricao: produto.descricao,
            valorPF: produto.valorPF,
            valorPJ: produto.valorPJ,
            qtdeMinima: produto.qtdeMinima,
            qtde: qtdProduto,
        });
    }
}
