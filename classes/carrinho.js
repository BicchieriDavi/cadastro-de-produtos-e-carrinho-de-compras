export class Carrinho {
    constructor() {
        this.itens = [];
    }

    addItens(itens) {
        this.itens.push({
            codigo: itens.codigo,
            descricao: itens.descricao,
            preco: itens.preco,
            qtde: itens.qtde,
        });
    }
}
