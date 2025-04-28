export class Produto {
    constructor(descricao, valorPF, valorPJ, qtdeMinima) {
        this.codigo = String(Math.random().toFixed(3));
        this.descricao = descricao;
        this.valorPF = valorPF;
        this.valorPJ = valorPJ;
        this.qtdeMinima = qtdeMinima;
    }
}
